const mongoose=require("mongoose");

const LogInSchema = new mongoose.Schema({


email:String,
password:String


});

const LogInModel=mongoose.model("LogInUsers",LogInSchema);
module.exports= LogInModel;