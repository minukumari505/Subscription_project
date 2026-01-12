const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service:"gmail",
  auth:{
    user:process.env.EMAIL,
    pass:process.env.EMAIL_PASS
  }
});

const sendMail = (to,subject,text)=>{
  transporter.sendMail({
    from:process.env.EMAIL,
    to,
    subject,
    text
  });
};

module.exports = sendMail;
