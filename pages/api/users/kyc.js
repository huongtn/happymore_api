import dbConnect from '../../../utils/db_connect';
import dbContext from '../../../models/db_context';
import withProtect from '../../../middleware/with_protect';
import { incomeAgg } from '../../../helpers/income_agg';
dbConnect();

const handler = async (req, res) => {
    const { method } = req;
    if (method !== 'PUT' && method !== 'GET') {
        return res
            .status(400)
            .json({ success: false, message: 'Only PUT,GET requests are allowed.' });
    }
    // Get user based on POSTed phoneNumber
    let user = await dbContext.User.findOne({ email: req.user.email });
    if (!user) {
        return res.status(400).json({
            message: "email do not existed!"
        });
    }
    else {
        if (method === 'PUT') {
            user.fullName = req.body.fullName;
            user.phoneNumber = req.body.phoneNumber;
            user.photo = req.body.photo;
            user.icNumber = req.body.icNumber;
            user.icPhotos = req.body.icPhotos;
            user.address = req.body.address;
            user.bankAccount = req.body.bankAccount;
            user.gender = req.body.gender;
            await user.save({ validateBeforeSave: false });
            res.json({
                message: "update successful!"
            });
        } else {
            let myUser = {
                ...user._doc,
                totalIncome: 0,
                paidIncome: 0
            };
            const incomes = await incomeAgg(dbContext, myUser._id);
            if (incomes.length > 0) {
                for (let income of incomes) {
                    if (income.amount > 0) {
                        myUser.totalIncome = income.amount;
                    }
                    else {
                        myUser.paidIncome = (-1) * income.amount;
                    }
                }
            }
            res.json(myUser);
        }
    }
}
export default withProtect(handler);
