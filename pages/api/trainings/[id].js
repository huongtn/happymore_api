import dbConnect from '../../../utils/db_connect';
import dbContext from '../../../models/db_context';

import withProtect from '../../../middleware/with_protect';
try {
  dbConnect();
} catch (error) {
  console.log(error);
}


const handler = async (req, res) => {
  const { method } = req;
  const { id } = req.query
  const training = await dbContext.Training.findById(id);

  switch (method) {
    case "GET":
      return res
        .status(200)
        .json(training);
    case "PUT":
      training.title = req.body.title;
      training.description = req.body.description;
      training.gender = req.body.gender;
      training.videos = req.body.videos; 
      await training.save({ validateBeforeSave: false }); 
      return res.status(200).json({
        success: true,
        message: 'Saving successful!',
      });;
    case "DELETE":
      await dbContext.Training.deleteOne({ _id: id });
      return res.status(200).json({
        success: true,
        message: 'Delete successful!',
      });

    default:
      return res
        .status(400)
        .json({ success: false, message: 'POST requests are not allowed.' });
  }
};

//export default handler;
export default withProtect(handler);
