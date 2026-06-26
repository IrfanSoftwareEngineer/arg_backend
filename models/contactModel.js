const mongoose=require('mongoose')
const ContactSchema=new mongoose.Schema(
{
id:String,
name:String,
email:String,
message:String
    
}



)

const ContactModel=mongoose.model("mcFeedback",ContactSchema);
module.exports=ContactModel;