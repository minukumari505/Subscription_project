const cron = require("node-cron");
const User = require("../models/User");
const sendMail = require("./mailer");

cron.schedule("0 10 * * *", async()=>{
  const today = new Date();
  const reminderDate = new Date();
  reminderDate.setDate(today.getDate()+3);

  const users = await User.find({
    expiryDate: {$lte: reminderDate, $gte: today}
  });

  users.forEach(u=>{
    sendMail(u.email,"Subscription Expiry Reminder",
    `Dear ${u.name}, your subscription expires on ${u.expiryDate}`);
  });
});
