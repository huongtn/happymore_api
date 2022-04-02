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
        incomes = await dbContext.Income.find(condition).populate('user').populate('fromUser');
      }
      return res
        .status(200)
        .json(incomes);

    default:
      return res
        .status(400)
        .json({ success: false, message: 'Only GET requests are allowed.' });
  }
};
//export default handler;
export default withProtect(handler);
