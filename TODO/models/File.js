const mongoose=require("mongoose");
const fileSchema=new mongoose.Schema({
 
    imageUrl:{
        type:String,
    },
  
});



const File=mongoose.model("File",fileSchema);
module.exports=File;