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
    const notifications = await dbContext.Notification.find({$or:[{user: req.user.id },{type:"News"}]}); 
    return res
      .status(200)
      .json(notifications);

    case "POST": 
      await dbContext.Notification.create(req.body);
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
