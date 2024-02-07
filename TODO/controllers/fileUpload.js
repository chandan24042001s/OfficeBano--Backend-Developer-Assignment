const File = require("../models/File");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});


//file supported check karne ka logic
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

//image upload ka handler
exports.imageUpload = async (req, res) => {
  try {

    // Check if the file is present in the request
    if (!req.files || !req.files.file ) {
        return res.status(400).json({
          success: false,
          message: "No file was uploaded",
        });
      }

    //data fetch karo
    const file = req.files.file;
    console.log(file);

    //validation for image kaa hee sirf 
    const supportedTypes = ["jpg", "jpeg", "png"];

    //file ka naam nikalo fir update karo , lowercase mey laao filename ko
    const fileType = file.name.split(".")[1].toLowerCase();
    console.log("file type", fileType);

    //if not supported then fasle msg response bhejo
    if (!isFileTypeSupported(fileType, supportedTypes)) {
      return res.status(400).json({
        success: false,
        message: "file formatted not supported",
      });
    }
    //file format supported hai
    console.log("uploading to OfficeBanao");
    const response = await uploadFileToCloudinary(file, "OfficeBanao");
    console.log(response);

    //db mey Entry save krni hai
    const fileData = await File.create({
      imageUrl: response.secure_url,
    });
    res.json({
      success: true,
      imageUrl: response.secure_url,
      message: "Image Uploaded Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      sucesss: false,
      message: "something went wrong",
    });
  }
};

async function uploadFileToCloudinary2(file, folder, quality) {
  const options = { folder };
  if (quality) {
    options.quality = quality;
  }
  console.log("temp file path", file.tempFilePath);
  return await cloudinary.uploader.upload(file.tempFilePath, options);
}

//image size reducer

exports.imagesizeReducer = async (req, res) => {
  try {
    //data fetch

    const file = req.files.imageFile;
    console.log(file);

    //validation
    const supportedTypes = ["jpg", "jpeg", "png"];
    const fileType = file.name.split(".")[1].toLowerCase();
    console.log("file type", fileType);

    if (!isFileTypeSupported(fileType, supportedTypes)) {
      return res.status(400).json({
        success: false,
        message: "file formatted not supported",
      });
    }
    //file format supported hai
    console.log("uploading to OfficeBanao");
    const response = await uploadFileToCloudinary2(file, "OfficeBanao", 30);
    console.log(response);

    //db mey Entry save krni hai
    const fileData = await File.create({
      
      imageUrl: response.secure_url,
    });
    res.json({
      success: true,
      imageUrl: response.secure_url,
      message: "Image Uploaded Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      sucesss: false,
      message: "something went wrong",
    });
  }
};