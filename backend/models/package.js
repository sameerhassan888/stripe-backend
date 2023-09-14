const { text } = require("body-parser");
const mongoose = require("mongoose");

const packageSchema = new mongoose.Schema({
  title: { type: String, required: true },
  price: { type: String, required: true },
  duration: { type: String, required: true },
  people: { type: Number, required: true },
  location: { type: String, required: true },
  description: { type: String, required: true },
  reviews: { type: Number, required: true },
  rating: { type: Number, required: true },
  image: { type: String, required: false }, // Make sure to set required as "false" for the image field
  province: { type: String, required: true },
});

module.exports = mongoose.model("Package", packageSchema);
