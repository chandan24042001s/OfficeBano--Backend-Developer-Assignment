
//Server Banao/instantiate

const express=require("express");
const app= express();

//load config from env file
require("dotenv").config();
const PORT = process.env.PORT || 4000;

//midddleware to parse json request body
app.use(express.json());

//middleware for file upload
const fileupload=require("express-fileupload");
app.use(fileupload({
    useTempFiles:true,
    tempFileDir:'/tmp/'
}))

//import troutes for TODO API
const todoRoutes=require("./routes/todos");

//mount the todo API routes
app.use("/api/v1",todoRoutes);

//default route
app.get("/",(req,res)=>{
    res.send(`<h1> Office Banao with Chandan <h1>`);
})

// Error handling middleware
app.use((err, res) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
  });

//start server
app.listen(PORT,()=>{
    console.log(`server started sucesssfully at port ${PORT}`)
})

//connect to the database
const dbConnect=require("./config/database");
dbConnect();


