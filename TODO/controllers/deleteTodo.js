const Todo=require("../models/Todo");

exports.deleteTodo=async(req,res)=>{

    try{
        //fetch all todo items from database
        const {id}=req.params;

        await Todo.findByIdAndDelete(id);

        //response
        res.status(200).json({
            success: true,
    
            message:"Deleted sucessfully",
        })
        
    }
    catch(err){
      console.error(err);
      res.status(500).json({
        success:false,
        error:err.message,
        message: 'server Error',
      })
    }
}