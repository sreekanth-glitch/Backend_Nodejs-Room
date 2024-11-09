const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  details: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Details",
    },
  ],
});

const Room = mongoose.model("Room", roomSchema);

module.exports = Room;
