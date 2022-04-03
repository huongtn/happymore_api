module.exports = (mongoose) => {

    const incomeSchema = new mongoose.Schema(
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
            },
            fromUser: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
            },
            order: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Order',
            },
            amount: {
                type: Number
            },
            percentage: {
                type: Number
            },
            note: {
                type: String
            },
        },
        { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
    );
    return incomeSchema;
} 
