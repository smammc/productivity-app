const { Schema, model } = require("mongoose");

const todoSchema = new Schema({
  name: {
    type: String,
    required: [true],
    trim: true,
  },
  timestamps: true,
});

const Todo = model("Todo", todoSchema);
module.exports = Todo;
