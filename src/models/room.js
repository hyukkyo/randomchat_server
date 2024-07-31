const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const roomSchema = new Schema(
  {
    roomId: { type: String, required: true, unique: true },
    users: [{ type: Schema.Types.ObjectId, ref: "User" }],
    messages: [
      {
        user: { type: Schema.Types.ObjectId, ref: "User" },
        message: { type: String, required: true },
        timestamps: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Room", roomSchema);
