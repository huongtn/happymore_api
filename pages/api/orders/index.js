import dbConnect from '../../../utils/db_connect'
import dbContext from '../../../models/db_context'
import { generate } from '../../../utils/generate_code';

var constants = require('../../../models/constants');
import withProtect from '../../../middleware/with_protect';
dbConnect();

const handler = async (req, res) => {
  const { method } = req;
  const { id } = req.query;
  switch (method) {
    case "POST":
      if (!req.body.user)
        req.body.user = req.user._id;
      req.body.orderId = `HM_${generate(6)}`
      await dbContext.Order.create(req.body);
      return res.status(200).json({
        success: true,
        message: 'Saving successful!',
      });
    case "GET":
      if (!id) {
        const condition = (req.user.role === constants.RoleAgent) ? { user: req.user.id } : {};
        const orders = await dbContext.Order.find(condition).populate('user');
        for (let order of orders) {
          for (let orderDetail of order.orderDetails) {
            orderDetail.product = await dbContext.Product.findById(orderDetail.product);
          }
        }
        return res
          .status(200)
          .json(orders);
      }
      else {

        const order = await dbContext.Order.findById(id).populate('user');
        for (let orderDetail of order.orderDetails) {
          orderDetail.product = await dbContext.Product.findById(orderDetail.product);
        }
        return res
          .status(200)
          .json(order);
      }
    case "DELETE":
      await dbContext.Order.deleteOne({ _id: id });
      return res.status(200).json({
        success: true,
        message: 'Delete successful!',
      });

    default:
      return res
        .status(400)
        .json({ success: false, message: 'Only POST requests are allowed.' });
  }
};
//export default handler;
export default withProtect(handler);
