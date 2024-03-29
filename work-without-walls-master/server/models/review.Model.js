const mongoose = require('mongoose');


const Schema = mongoose.Schema;
const ReviewModel = new Schema(
  {
    reviewedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    reviewedTo: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    reviewOf: {
      type: Schema.Types.ObjectId,
      ref: 'Job',
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Review = mongoose.model('Review',ReviewModel);
module.exports = Review;
