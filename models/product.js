//const mongoose = require('mongoose');
module.exports = (mongoose) => {
  var productSchema = new mongoose.Schema(
    {
      name: {
        type: String,
        required: [true, 'Name is required'],
      },
      description: {
        type: String,
        required: [true, 'Description is required'],
      },
      price: {
        type: Number,
        required: [true, 'Price is required'],
      },
      discount: {
        type: Number
      },
      images: {
        type: [String]
      },
    },
    { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
  );
  return productSchema;
}
