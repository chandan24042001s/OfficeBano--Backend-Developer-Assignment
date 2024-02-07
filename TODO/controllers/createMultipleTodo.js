// import the model
const Todo=require("../models/Todo");

//define route handler

exports.createMultipleTodos = async (req, res) => {
    try {
        
      const response = await Todo.insertMany(req.body);
      res.status(200).json({
        sucess:true,
        data:response,
        message:'Entry Created Sucessfully'
    });
    } 
    catch(err){
        console.error(err);
        console.log(err);
        res.status(500).json({
            sucess:false,
            data:"internal server eroor",
            message:err.messsage,
        })
    }
  };