import dbConnect from '../../../utils/db_connect';
import dbContext from '../../../models/db_context'; 
var constants = require('../../../models/constants');
 
import withProtect from '../../../middleware/with_protect';
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
      await dbContext.Training.create(req.body);
      return res.status(200).json({
        success: true,
        message: 'Saving successful!',
      });
    case "GET":
      if (!id) { 
        try {  
          const condition = (req.user.role === constants.RoleAgent && req.user.gender) ? {gender:req.user.gender}:{};
        
          const trainings = await dbContext.Training.find(condition);
          return res
            .status(200)
            .json(trainings);
        } catch (error) {
          return res
            .status(500)
            .json(error);
          // expected output: ReferenceError: nonExistentFunction is not defined
          // Note - error messages will vary depending on browser
        }


      }
      else {
        const training = await dbContext.Training.findById(id);
        return res
          .status(200)
          .json(training);
      }
    case "DELETE":
      await dbContext.Training.deleteOne({ _id: id });
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
