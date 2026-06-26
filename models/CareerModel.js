const mongoose = require("mongoose");
const careerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  mobile: { type: String, required: true },
  email: { type: String },
  location: { type: String, required: true },
  course: { type: String, required: true }
});

const CareerModel = mongoose.model('mcRegistration', careerSchema);

module.exports = CareerModel;
