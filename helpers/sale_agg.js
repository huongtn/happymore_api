

export async function  saleAgg(dbContext, userId) {
    return await dbContext.Order.aggregate(
        [
            {
                '$match': {
                    'user': userId
                }
            }, {
                '$group': {
                    '_id': {
                        'status': 'Delivered'
                    },
                    'totalSales': {
                        '$sum': '$amount'
                    },
                    'countSales': {
                        '$sum': 1
                    }
                }
            }
        ]
    );
}
