const Todo=require("../models/Todo");

//define route handler

exports.getTodo=async(req,res)=>{

    try{
        //fetch all todo items from database
        const todos= await Todo.find({});

        //response
        res.status(200).json({
            success: true,
            data:todos,
            message:"Entire Todo is fetch sucessfully",
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

exports.getTodoById=async(req,res)=>{
    try{
        const id=req.params.id;
        const todo=await Todo.findById({_id:id})

        //data forgiven id not found
        if(!todo){
            return res.status(404).json({
                success:false,
                message:"no Data found with Given Id",
            })
        }
        //data for given id FOUND
        res.status(200).json({
            sucess:true,
            data:todo,
            message:`Todo ${id} data sucessfully fetched`
        })

    }
    catch(err){
        //data not found
        console.error(err);
      res.status(500).json({
        success:false,
        error:err.message,
        message: 'server Error',
      })

    }
}