import dbConnect from '../../../utils/db_connect';
import dbContext from '../../../models/db_context'; 
import { makeSalt, encryptPassword } from '../../../utils/crypto_password'  

import jwt from 'jsonwebtoken'  
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
        return res.status(400).json({
            message: "Email chưa được đăng ký!"
        });
    }
    else {
        if (!user.active) {
            return res.status(202).json({
                message: "Tài khoản chưa được xác nhận email!"
            });
        }
        if (!user.approval) {
            return res.status(400).json({
                message: "Tài khoản chưa được phê duyệt!"
            });
        }
        makeSalt(function (saltErr, salt) {
            if (saltErr) {
                next(saltErr);
            }
            encryptPassword(req.body.password, async function (encryptErr, hashedPassword) {
                if (encryptErr) {
                    next(encryptErr);
                }
                if (user.password != hashedPassword) {
                    res.status(400).json({
                        message: "password not correct!"
                    });
                }
                else {
                    let token = jwt.sign(
                        {
                            user: user,
                        }, process.env.JWT_SECRET
                    );
                    user.authLoginToken = token;
                    user.code = '';
                    user.active = true;
                    await user.save({ validateBeforeSave: false });
                    res.json({ token });

                    // const code = generateVerifyCode(req.body.email);
                    // sendEmail(req.body.email, "Happy more code", code);
                    // user.code = code;
                    // user.codeExpires= new Date((new Date()).getTime() + (1000 * process.env.CODE_VERIFY_EXPIRED_SECONDS))
                    // await user.save({ validateBeforeSave: false });
                    // res.json({
                    //     message: "please check your email"
                    // });
                }
            });
        })
    }
};
export default handler;
