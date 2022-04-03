import dbConnect from '../../../utils/db_connect'
import dbContext from '../../../models/db_context'
import { generate } from '../../../utils/generate_code';

var constants = require('../../../models/constants');
import withProtect from '../../../middleware/with_protect';
dbConnect();

const handler = async (req, res) => {
  const { method } = req;
  switch (method) {
    case "GET":
      let incomes = [];
      if (req.user.role === constants.RoleAgent) {
        incomes = await dbContext.Income.find({ user: req.user.id }).populate('fromUser');
      }
      else {
        const { userId } = req.query;
        if (!userId)
          incomes = await dbContext.Income.find({ user: userId }).populate('user').populate('fromUser');
        else
          incomes = await dbContext.Income.find().populate('user').populate('fromUser');
      }
      return res
        .status(200)
        .json(incomes);

    case "POST":
      req.body.fromUser = req.user.id;
      await dbContext.Income.create(req.body);
      await dbContext.Notification.create(
        {
          title: 'Bạn vừa được thanh toán tiền hoa hồng',
          description: `Số tiền ${req.body.amount}`,
          url: '',
          user: req.body.user,
          type: "SettlePayment",
          images:[]
      }
      );
      return res.status(200).json({
        success: true,
        message: 'Saving successful!',
      });
    default:
      return res
        .status(400)
        .json({ success: false, message: 'Only GET/POST requests are allowed.' });
  }
};
//export default handler;
export default withProtect(handler);
