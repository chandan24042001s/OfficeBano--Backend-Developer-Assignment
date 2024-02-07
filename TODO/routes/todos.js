

const express=require("express");
const router=express.Router();

//import controller / controller laaao
const {createTodo}=require("../controllers/createTodo");
const {getTodo,getTodoById}=require("../controllers/getTodo.js");
const {updateTodo}=require("../controllers/updateTodo");
const {deleteTodo}=require("../controllers/deleteTodo");
const { getTodosPaginated } = require("../controllers/getTodoPagination.js");
const { createMultipleTodos } = require("../controllers/createMultipleTodo.js");
const { validateTodo } = require("../middleware/validationMiddleware.js");
const { imageUpload } = require("../controllers/fileUpload.js");


//route banao/ define Api Routes
router.post("/createTodo",validateTodo, createTodo);
router.get("/getTodo",getTodo);
router.get("/getTodo/:id",getTodoById);
router.get("/getTodos", getTodosPaginated);
router.post("/createMultipleTodos", createMultipleTodos);
router.put("/updateTodo/:id",updateTodo);
router.delete("/deleteTodo/:id",deleteTodo);
router.post("/fileupload",imageUpload)

module.exports=router;