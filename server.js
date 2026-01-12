require("dotenv").config();
const express = require("express");//express import
const cors = require("cors");
const db=require("./config/db");
db();
const SignUp=require("../Subscription-Backend/routes/userRoutes")
const app = express();//we are taking instance of express in the form of app

app.use(cors());//cross origin resource sharing

app.use(express.json());
app.use("/api",SignUp);
app.listen(5000, ()=>console.log("Server running on port 5000"));

app.get('/',(req,res)=>{
    res.send(` server started at ${process.env.PORT}`);
})

