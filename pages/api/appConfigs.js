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
      await dbContext.AppConfig.deleteMany({});
      await dbContext.AppConfig.create(req.body);
      return res.status(200).json({
        success: true,
        message: 'Saving successful!',
      });
    case "GET":
      const appConfigs = await dbContext.AppConfig.findOne({});
      return res
        .status(200)
        .json(appConfigs);

    default:
      return res
        .status(400)
        .json({ success: false, message: 'Only POST/GET requests are allowed.' });
  }
};

//export default handler;
export default withProtect(handler);
