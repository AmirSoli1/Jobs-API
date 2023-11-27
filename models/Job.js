const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: [true, 'Please provide company name'],
      maxLength: [50, 'company name cant exceed 50 characters'],
      minLength: [3, 'company name must be at least 3 characters'],
    },
    position: {
      type: String,
      required: true,
      maxLength: [20, 'position name cant exceed 20 characters'],
      minLength: [3, 'position name must be at least 3 characters'],
    },
    status: {
      type: String,
      enum: ['interview', 'declined', 'pending'],
      default: 'pending',
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: [true, 'Please provide user'],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Job', jobSchema);
