const mongoose = require("mongoose");

const detailsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, // Name is a required field
    trim: true, // Automatically trims any extra whitespace
    minlength: 1,
    maxlength: 255,
  },
  phone: {
    type: Number,
    required: true, // Phone number is a required field
    minlength: 10, // Minimum length (adjust if necessary)
    maxlength: 15, // Maximum length (to accommodate different formats)
  },
  total: {
    type: Number,
    min: 0, // Total must be a positive number
  },
  perHead: {
    type: Number,
    min: 0, // perHead should also be positive
  },
  area: {
    type: String,
    required: true, // Area is a required field
    trim: true, // Trim extra spaces
  },
  city: {
    type: String,
    required: true, // City is a required field
    trim: true, // Trim extra spaces
  },
  description: {
    type: String,
    minlength: 1, // Ensure it's not an empty string
    maxlength: 500, // Optional: you can set a max length for the description
  },
  image: {
    type: String,
  },
  room: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Room",
    },
  ],
});

const Details = mongoose.model("Details", detailsSchema);

module.exports = Details;
