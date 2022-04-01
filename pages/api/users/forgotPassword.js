import dbConnect from '../../../utils/db_connect';
import dbContext from '../../../models/db_context'; 
import { sendSMS } from '../../../utils/twilio_client';
dbConnect();

const handler = async (req, res) => {
    const { method } = req;

    if (method !== 'POST') {
        return res
            .status(400)
            .json({ success: false, message: 'Only POST requests are allowed.' });
    }
    // Get user based on POSTed phoneNumber
    let user = await dbContext.User.findOne({ phoneNumber: req.body.phoneNumber });

    if (!user) {
        res.status(400).json({
            message: "phoneNumber not existed!"
        });
    }
    else { 
        const code = Math.floor(100000 + Math.random() * 900000);
        sendSMS(req.body.phoneNumber, code);
        user.code = code;
        user.codeExpires= new Date((new Date()).getTime() + (1000 * process.env.CODE_VERIFY_EXPIRED_SECONDS))
        await user.save({ validateBeforeSave: false });
        res.json({
            message: "please check your otp"
        });
    }
};
export default handler;
