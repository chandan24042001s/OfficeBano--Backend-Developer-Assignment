// import the model
const Todo=require("../models/Todo");

//define route handler


exports.validateTodo = (req, res, next) => {
    const { title, description } = req.body;
    if (!title ) {
      return res.status(400).json({ error: 'Title is required' });
    }

    if (!description ) {
        return res.status(400).json({ error: 'Description is required' });
      }
    
    next();
  };
  