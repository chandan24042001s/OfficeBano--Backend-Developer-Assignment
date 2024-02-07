// import the model
const Todo=require("../models/Todo");
const File = require("../models/File");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

// /file supported check karne ka logic
function isFileTypeSupported(type, supportedTypes) {
  return supportedTypes.includes(type);
}

//cloudinary mey upload ka logic
async function uploadFileToCloudinary(file, folder) {
  const options = { folder };
  options.resource_type = "auto";
  console.log("temp file path", file.tempFilePath);
  return await cloudinary.uploader.upload(file.tempFilePath, options);
}
//define route handler

exports.createTodo=async(req,res)=>{

    try{
        
        let imageUrl = ''; // Default image URL

        // Check if the file is present in the request
        if (req.files && req.files.file) {
          const file = req.files.file;
    
          // Validate file type
          const supportedTypes = ["jpg", "jpeg", "png"];
          const fileType = file.name.split(".")[1].toLowerCase();
          if (!isFileTypeSupported(fileType, supportedTypes)) {
            return res.status(400).json({
              success: false,
              message: "File format not supported",
            });
          }
    
          // Upload file to Cloudinary
          const data = await uploadFileToCloudinary(file, "OfficeBanao");
          imageUrl = data.secure_url;
        }
    
        const {title,description}=req.body;
        const response=await Todo.create({title,description,imageUrl});

        res.status(200).json({
            sucess:true,
            data:response,
            message:'Crate hogaya aab ---Entry Created Sucessfully'
        });

    }
    catch(err){
        console.error(err);
        console.log(err);
        res.status(500).json({
            sucess:false,
            data:"internal server error",
            message:err.messsage,
        })
    }
}