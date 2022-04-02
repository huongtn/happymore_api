//const mongoose = require('mongoose');
module.exports = (mongoose) => {
  var trainingSchema = new mongoose.Schema(
    {
      title: {
        type: String,
        required: [true, 'Title is required'],
      },
      description: {
        type: String,
        required: [true, 'Description is required'],
      },
      gender: {
        type: Number
      },
      videos :[String]
    },
    { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
  );
  return trainingSchema;
}
