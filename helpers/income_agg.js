

var mongoose = require('mongoose'); 
export async function incomeAgg(dbContext, userId) {
    return await dbContext.Income.aggregate(
        [
            {
                '$match': {
                    'user': new mongoose.Types.ObjectId(userId)
                }
            }, {
                '$group': {
                    '_id': {
                        'amount': {
                            '$gte': [
                                '$amount', 0
                            ]
                        }
                    },
                    'amount': {
                        '$sum': '$amount'
                    }
                }
            }
        ]
    );
}
