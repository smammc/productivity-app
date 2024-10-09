const { Schema, model, default: mongoose } = require("mongoose");

const todoSchema = new Schema(
  {
    name: { type: String, required: [true], trim: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    status: {
      type: String,
      enum: ["Ongoing", "Done"],
      default: "Ongoing",
    },
  },
  { timestamps: true }
);

const Todo = model("Todo", todoSchema);
module.exports = Todo;
