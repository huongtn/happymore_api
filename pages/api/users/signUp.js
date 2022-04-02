import dbConnect from '../../../utils/db_connect';
import dbContext from '../../../models/db_context';
import { makeSalt, encryptPassword } from '../../../utils/crypto_password'
import { sendEmail } from '../../../utils/email_client';
import { generate, generateVerifyCode } from '../../../utils/generate_code';
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
    if (user) {
        return res.status(400).json({
            message: "email already existed!"
        });
    }
    else {
        try {
            makeSalt(function (saltErr, salt) {
                if (saltErr) {
                    next(saltErr);
                }
                encryptPassword(req.body.password, async function (encryptErr, hashedPassword) {
                    if (encryptErr) {
                        next(encryptErr);
                    }
                    req.body.password = hashedPassword;
                    const code = generateVerifyCode(req.body.email);

                    sendEmail(req.body.email, "Happy more code", code);

                    user = await dbContext.User.create({
                        email: req.body.email,
                        password: req.body.password,
                        agentCode: generate(6),
                        parentAgentCode: req.body.parentAgentCode,
                        code: code,
                        codeExpires: new Date((new Date()).getTime() + (1000 * process.env.CODE_VERIFY_EXPIRED_SECONDS))
                    });
                    await user.save({ validateBeforeSave: false }); 
                    return res.json({
                        message: "please check your email"
                    });
                });
            })
        } catch (error) {
            return res.status(200).json({
                message: error
            });
        }
    }
}
export default handler;
