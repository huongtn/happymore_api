module.exports = (mongoose) => {

    const orderDetail = new mongoose.Schema({
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: [true, 'Product is required'],
        },
        price: {
            type: Number,
            required: [true, 'Price is required'],
        },
        discount: {
            type: Number
        },
        qty: {
            type: Number,
            required: [true, 'Qty is required'],
        },
    });

    const destinationInfo = new mongoose.Schema({
        address: {
            type: String,
            required: [true, 'address is required'],
        },
        lat: {
            type: Number,
            required: [true, 'Lat is required'],
        },
        lng: {
            type: Number,
            required: [true, 'Lat is required'],
        },
        deliveryFee: {
            type: Number,
            required: [true, 'Delivery Fee is required'],
        }
    });

    const orderSchema = new mongoose.Schema(
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
            },
            orderId: {
                type: String
            },
            amount: {
                type: Number,
                required: [true, 'Amount is required'],
            },
            note: {
                type: String
            },
            orderDetails: [orderDetail],
            destination: destinationInfo,
            status: {
                type: String,
                enum: ['New', 'Delivering', 'Delivered', 'Returned'],
                default: 'New',
            },
        },
        { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
    );
    return orderSchema;
} 
