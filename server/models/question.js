const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    require: true,
  },
  location: {
    type: mongoose.Schema.Types.ObjectLocation,
    ref: 'Users',
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Questions", QuestionSchema);