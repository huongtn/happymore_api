module.exports = (mongoose) => {

    const requestPaymentSchema = new mongoose.Schema(
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
            },
            amount: {
                type: Number
            }
        },
        { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
    );
    return requestPaymentSchema;
} 
