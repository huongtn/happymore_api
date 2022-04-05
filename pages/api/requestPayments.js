import dbConnect from '../../utils/db_connect';
import dbContext from '../../models/db_context';

import withProtect from '../../middleware/with_protect';
try {
  dbConnect();
} catch (error) {
  console.log(error);
}


const handler = async (req, res) => {
  const { method } = req;
  const { id } = req.query;
  switch (method) {
    case "POST":
      req.body.user = req.user.id;
      const orders = await dbContext.RequestPayment.find({ $and: [{ user: req.user.id }, { status: "Delivered" }] });
      if (orders.length > 0) {
        await dbContext.RequestPayment.create(req.body);
        return res.status(200).json({
          success: true,
          message: 'Saving successful!',
        });
      }
      else {
        return res
          .status(400)
          .json({ message: 'Vui lòng đặt đơn hàng để được nhận hoa hồng' });

      }
    case "GET":
      const requestPayments = await dbContext.RequestPayment.find({ user: req.user.id });
      return res
        .status(200)
        .json(requestPayments);

    default:
      return res
        .status(400)
        .json({ success: false, message: 'Only POST/GET requests are allowed.' });
  }
};

//export default handler;
export default withProtect(handler);
