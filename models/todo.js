const mongoose = require("mongoose");

const todoSchema = mongoose.Schema({
  _id: mongoose.Types.ObjectId,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: String,
  details: String,
  status: {
    type: String,
    enum: ["Not Started", "In Progress", "Completed"],
    default: "Not Started",
  },
  startDate: Date,
  priority: {
    type: String,
    enum: ["Low", "Medium", "High"],
    default: "Medium",
  },
  tags: [String], // Storing an array of tags as strings
});

module.exports = mongoose.model("Todo", todoSchema);
