import dbConnect from '../../../utils/db_connect';
import dbContext from '../../../models/db_context';  
dbConnect();

const handler = async (req, res) => {
    const { method } = req;

    if (method !== 'POST') {
        return res
            .status(400)
            .json({ success: false, message: 'Only POST requests are allowed.' });
    }
    // Get user based on POSTed phoneNumber
    let user = await dbContext.User.findOne({ email: req.body.email });

    if (!user) {
        res.status(400).json({
            message: "email not existed!"
        });
    }
    else { 
        makeSalt(function (saltErr, salt) {
            if (saltErr) {
                next(saltErr);
            }
            encryptPassword(req.body.password, async function (encryptErr, hashedPassword) {
                if (encryptErr) {
                    next(encryptErr);
                } 
                user.password=hashedPassword;
                await user.save({ validateBeforeSave: false });
                res.json({
                    message: "Change password successful!"
                });
            });
        }) 
    }
};
export default handler;
