const mongoose = require("mongoose");

const SignUpSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email:  String, 
  password:String,
});

const SignUpModel = mongoose.model("SignUpUsers", SignUpSchema);
module.exports = SignUpModel;
