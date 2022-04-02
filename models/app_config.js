//const mongoose = require('mongoose');
module.exports = (mongoose) => {
  var appConfigSchema = new mongoose.Schema(
    {
      name: {
        type: String
      },
      aboutUs: {
        type: String
      },
      facebookPage: {
        type: String
      },
      hotline: {
        type: String
      },
      FIncome: [Number],
      deliveryFee: {
        type: Number
      },
    },
    { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
  );
  return appConfigSchema;
}
