//const mongoose = require('mongoose');
module.exports = (mongoose) => {
  var notificationSchema = new mongoose.Schema(
    {
      title: {
        type: String,
      },
      description: {
        type: String
      },
      url: {
        type: String
      },
      user: {
        type: String
      },
      images: {
        type: [String]
      },
      type: {
        type: String,
        enum: ['NewIncome', 'SettlePayment', 'News', 'Other'],
        default: 'Other',
      },
    },
    { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
  );
  return notificationSchema;
}
