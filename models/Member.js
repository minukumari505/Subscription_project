const mongoose = require("mongoose");
const memberSchema = new mongoose.Schema({

  M_id: {
    type: String,
    unique: true
  },

  MemberEmailId: {
    type: String,
    required: true,
    unique: true
  },

  password: {
    type: String,
    required: true
  },

  MemberName: { type: String, required: true },

  Gender: {
    type: String,
    enum: ["male", "female", "other"],
    required: true
  },

  Mobile: { type: Number, required: true },

  TrainingType: {
    type: String,
    enum: ["general training", "personal training", "Both"],
    required: true
  },

  MembershipTYPE: {
    type: String,
    enum: ["monthly", "Quarterly", "half yearly", "yearly"],
    required: true
  },

  MembershipExpiryDate: { type: Date, required: true, },
  // if member take a membership today then we will see th membershipTYPE and then we  can put membership Expiry Date

  DueAmount: { type: Number, default: 0 },

  ProfileInitial: { type: String }   // First letter of name

}, { timestamps: true });

module.exports = mongoose.model("Member", memberSchema);


/*

user =>Member  has following details:

Task 1: Update schema 

   1.a.  M_id         =>String 
   1.b.  MemberEmailId  =>String
   2.  MemberName   => String
   3.  Gender       => Enum  ["male","female","other"]
   4.  Mobile       => Number
   5.  Training type =>Enum ["general training ","personal training","Both"]

   6.a MembershipTYPE => ENUM ["monthly","Quarterly","half yearly ","yearly"]

   6.b  Memeber ProfilePhoto =>image (for now we will show only the first character of name in place of image)
   7.  Membership Expiry Date 
   8.  Due amount 
                 : if current date is ahead of expiry date => due amout=membership amount;
                   else due amout = 0.
 
  Note: controllers need to be build in future
         1. delete the member
         2. update the membership type
         3. update  the training type
         4. update mobile number
         5. update email
         6. update dp

        


 Task 2 : update the existing controllers after updating the schema

 Task 3: now you will have email and  password as your credential 

 Task 4: perform deletion, createuser, login 


 
   

*/ 