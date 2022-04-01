import dbConnect from '../../../utils/db_connect'
import dbContext from '../../../models/db_context'

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
      await dbContext.Product.create(req.body);
      return res.status(200).json({
        success: true,
        message: 'Saving successful!',
      });
    case "GET":
      if (!id) {

        try {

          const products = await dbContext.Product.find({});
          return res
            .status(200)
            .json(products);
        } catch (error) {
          return res
            .status(500)
            .json(error);
          // expected output: ReferenceError: nonExistentFunction is not defined
          // Note - error messages will vary depending on browser
        }


      }
      else {
        const product = await dbContext.Product.findById(id);
        return res
          .status(200)
          .json(product);
      }
    case "DELETE":
      await dbContext.Product.deleteOne({ _id: id });
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
