import dbConnect from '../../../utils/db_connect';
import dbContext from '../../../models/db_context'; 

import jwt from 'jsonwebtoken'
import { sendSMS } from '../../../utils/twilio_client';
dbConnect();

const handler = async (req, res) => {
    const { method } = req;

    if (method !== 'POST') {
        return res
            .status(400)
            .json({ success: false, message: 'Only POST requests are allowed.' });
    }
    let user = await dbContext.User.findOne({ code: req.body.code });
    if (user) {
        if (user.codeExpires < new Date()) {
            return res
                .status(400)
                .json({message: 'The code already expired!' });
        }
        else {
            let token = jwt.sign(
                {
                    user: user,
                }, process.env.JWT_SECRET
            );
            user.authLoginToken = token;
            user.code = '';
            user.active=true;
            await user.save({ validateBeforeSave: false });
            res.json({ token });
        }
    }
    else {
        res.status(400).json({
            message: "Otp incorrect"
        });
    }
};
export default handler;
