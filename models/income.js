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
            orderAmount: {
                type: Number,
                required: [true, 'Amount is required'],
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
