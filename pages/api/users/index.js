import dbConnect from '../../../utils/db_connect'
import dbContext from '../../../models/db_context'
dbConnect();

const handler = async (req, res) => {
  const { method } = req;
  const { id } = req.query;
  switch (method) {
    case "POST":
      await dbContext.User.create(req.body);
      return res.status(200).json({
        success: true,
        message: 'Saving successful!',
      });
    case "GET": 
      if (!id) {
        const users = await dbContext.User.find({}).sort({role:-1});
        return res
          .status(200)
          .json(users);
      }
      else
      {
        const user = await dbContext.User.findById(id);
        return res
          .status(200)
          .json(user);
      }
    case "DELETE":
      await dbContext.User.deleteOne({ _id: id });
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

export default handler;
//export default withProtect(withRoles(handler, 'admin'));
