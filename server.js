require("dotenv").config();//we require env details
// const nodemailer=require("nodemailer");// imported the nodemailer , which helps to send email
// const transporter=nodemailer.createTransport({//object which holds the configuration for how our email will be send
//     service: "gmail",
//     auth: {
//         user: process.env.EMAIL,
//         pass: process.env.EMAIL_PASS,
//     },
// });
// const emailOption = {
//     from:  process.env.EMAIL,
//     to:  process.env.EMAIL,
//     subject: "test email from node.js",
//     text: "hello, this is a text email sent from node.js using Nodemailer",
// };

// transporter.sendMail(emailOption,(error,info)=>{
//     if(error){
//         return console.log("error occured:",error);
//     }
//     console.log("email sent successfully:",info.response);
// })


const express = require("express");//express import
const cors = require("cors");
const SignUp=require("./routes/userRoutes")
const login=require("./routes/login")
const GetalluserDetails=require("./routes/getAlluserRoutes")
const deleteuser=require("./routes/deleteusers")
const memberRoutes = require("./routes/memberRoutes");



const db=require("./config/db");
db();

const app = express();//we are taking instance of express in the form of app

app.use(cors());//cross origin resource sharing
app.use(express.json());

app.use("/api",SignUp);
app.use("/api",login);
app.use("/api",GetalluserDetails);
app.use("/api",deleteuser);
app.use("/api", memberRoutes);
app.listen(5000, ()=>console.log("Server running on port 5000"));

app.get('/',(req,res)=>{
    res.send(` server started at ${process.env.PORT}`);
})

