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
    case "PUT":
      const updateOrder = await dbContext.Order.findById(req.body.id);
      if (updateOrder) {
        updateOrder.status = req.body.status;
        await updateOrder.save({ validateBeforeSave: false });
        if (updateOrder.status === "Delivered") {
          // do income process 
          const user = await dbContext.User.findById(updateOrder.user);
          const appConfig = await dbContext.AppConfig.findOne({});
          const f1 = await dbContext.User.findOne({ agentCode: user.parentAgentCode });
          const note = `Chiết khấu hoa hồng đơn hàng ${updateOrder.orderId} từ đại lý ${user.email}`;
          if (f1) {
            await dbContext.Income.create(
              {
                user: f1.id,
                fromUser: updateOrder.user,
                orderAmount: updateOrder.amount,
                percentage: appConfig.FIncome[0],
                order: req.body.id,
                note
              }
            );
            const f2 = await dbContext.User.findOne({ agentCode: f1.parentAgentCode });
            if (f2) {
              await dbContext.Income.create(
                {
                  user: f2.id,
                  fromUser: updateOrder.user,
                  orderAmount: updateOrder.amount,
                  percentage: appConfig.FIncome[1],
                  order: req.body.id,
                  note
                }
              );
              const f3 = await dbContext.User.findOne({ agentCode: f2.parentAgentCode });
              if (f3) {
                await dbContext.Income.create(
                  {
                    user: f3.id,
                    fromUser: updateOrder.user,
                    orderAmount: updateOrder.amount,
                    percentage: appConfig.FIncome[2],
                    order: req.body.id,
                    note
                  }
                );
                const f4 = await dbContext.User.findOne({ agentCode: f3.parentAgentCode });
                if (f4) {
                  await dbContext.Income.create(
                    {
                      user: f4.id,
                      fromUser: updateOrder.user,
                      orderAmount: updateOrder.amount,
                      percentage: appConfig.FIncome[3],
                      order: req.body.id,
                      note
                    }
                  );
                  const f5 = await dbContext.User.findOne({ agentCode: f4.parentAgentCode });
                  if (f5) {
                    await dbContext.Income.create(
                      {
                        user: f5.id,
                        fromUser: updateOrder.user,
                        orderAmount: updateOrder.amount,
                        percentage: appConfig.FIncome[4],
                        order: req.body.id,
                        note
                      }
                    );
                  }
                }
              }
            }
          }
        }
        return res.status(200).json({
          success: true,
          message: 'Saving successful!',
        });
      }
      else {
        return res.status(400).json({
          message: 'Order do not existed!',
        });
      }
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
