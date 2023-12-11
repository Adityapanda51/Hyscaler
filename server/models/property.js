const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  price: { type: String, required: true },
  description: { type: String, required: true },
  picture: { type: Buffer }, // Store the file buffer
});

const Property = mongoose.model("Property", propertySchema);

module.exports = Property;
