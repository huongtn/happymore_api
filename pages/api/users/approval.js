import dbConnect from '../../../utils/db_connect';
import dbContext from '../../../models/db_context';

import jwt from 'jsonwebtoken'
dbConnect();

const handler = async (req, res) => {
    const { method } = req;

    if (method !== 'POST') {
        return res
            .status(400)
            .json({ success: false, message: 'Only POST requests are allowed.' });
    }
    let user = await dbContext.User.findOne({ email: req.body.email });
    if (user) {
        if (user.codeExpires < new Date()) {
            return res
                .status(400)
                .json({ message: 'Email chưa được đăng ký!' });
        }
        else {
            user.approval = true;
            await user.save({ validateBeforeSave: false });
            res.json({ message:'Phê duyệt thành công!' });
        }
    }
    else {
        res.status(400).json({
            message: "Otp incorrect"
        });
    }
};
export default handler;
