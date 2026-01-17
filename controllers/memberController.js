const Member = require("../models/Member");
const bcrypt = require("bcrypt");
const sendMail = require("../utils/mailer");

const membershipAmount = {
  monthly: 1000,
  Quarterly: 2500,
  "half yearly": 4500,
  yearly: 8000
};

/* CREATE MEMBER */
//We are exporting a function named createMember so it can be used in routes. It is async because we use await (database + hashing).
exports.createMember = async(req,res)=>{
  try{//Starts a try block to catch errors safely. 

    const data = req.body;//Takes all data sent from Postman (JSON body) and stores in data.

 const isAlreadyExist1 = await Member.findOne({ MemberEmailId: data.MemberEmailId });
    if(isAlreadyExist1){
      return res.status(400).json({ msg:"User Already exists" });
    }
     const isAlreadyExist2 = await Member.findOne({ M_id: data.M_id });
    if(isAlreadyExist2){
      return res.status(400).json({ msg:"User Already exists" });
    }
    const hashedPassword = await bcrypt.hash(data.password,10);//Encrypts the user’s password. 10 = salt rounds (security strength).We NEVER store plain password in database.
     
    const expiry = new Date();
    if(data.MembershipTYPE==="monthly") expiry.setMonth(expiry.getMonth()+1);
    if(data.MembershipTYPE==="Quarterly") expiry.setMonth(expiry.getMonth()+3);
    if(data.MembershipTYPE==="half yearly") expiry.setMonth(expiry.getMonth()+6);
    if(data.MembershipTYPE==="yearly") expiry.setFullYear(expiry.getFullYear()+1);

    const member = await Member.create({//Insert new member into MongoDB.
      ...data,//Copies all fields sent by user (MemberName, Email, Gender, etc).
      password:hashedPassword,
      M_id:"MEM"+Date.now(),
      MembershipExpiryDate:expiry,
      ProfileInitial:data.MemberName[0].toUpperCase()
    });//MongoDB insert complete.
   
    await sendMail(member.MemberEmailId,"Membership Activated",
    `Hello ${member.MemberName}, your membership expires on ${expiry}`);

    res.json(member);//Sends newly created member data back to frontend/Postman.
  }catch(err){ res.status(500).json(err); }
};

/* LOGIN */
exports.login = async(req,res)=>{
  try{
    const {MemberEmailId,password}=req.body;
    const member = await Member.findOne({MemberEmailId});//Searches DB for member with this email.
    if(!member) return res.status(404).json("Member not found");

    const ok = await bcrypt.compare(password, member.password);
    if(!ok) return res.status(401).json("Invalid Password");

    // Due calculation
    if(new Date()>member.MembershipExpiryDate){
      member.DueAmount = membershipAmount[member.MembershipTYPE];
      await member.save();//Save updated due amount into DB.
    }else member.DueAmount=0;

    res.json(member);//Login success → return member details.
  }catch(err){ res.status(500).json(err); }
};

/* DELETE MEMBER */
exports.deleteMember = async(req,res)=>{
  try{
    await Member.findByIdAndDelete(req.params.id);//Deletes member from MongoDB using _id passed in URL
    res.json("Member Deleted Successfully");
  }catch(err){ res.status(500).json(err); }
};

//updateMembership
exports.updateMembership = async(req,res)=>{
  const {MembershipTYPE} = req.body;

  const expiry = new Date();
  if(MembershipTYPE==="monthly") expiry.setMonth(expiry.getMonth()+1);
  if(MembershipTYPE==="Quarterly") expiry.setMonth(expiry.getMonth()+3);
  if(MembershipTYPE==="half yearly") expiry.setMonth(expiry.getMonth()+6);
  if(MembershipTYPE==="yearly") expiry.setFullYear(expiry.getFullYear()+1);

  const member = await Member.findByIdAndUpdate(req.params.id,{//Finds member by ID & updates fields like embershipTYPE,MembershipExpiryDate:expiry,DueAmount
    MembershipTYPE,
    MembershipExpiryDate:expiry,
    DueAmount:0
  },{new:true});//{new:true} → return updated data instead of old data

  res.json(member);
};

//updateTraining
exports.updateTraining = async(req,res)=>{
  const member = await Member.findByIdAndUpdate(req.params.id,{////Finds member by ID & updates TrainingType
    TrainingType:req.body.TrainingType
  },{new:true});

  res.json(member);
};

//updatemobileNumber
exports.updateMobile = async(req,res)=>{
  const member = await Member.findByIdAndUpdate(req.params.id,{
    Mobile:req.body.Mobile
  },{new:true});

  res.json(member);
};

//updateEmail , send an otp before updating emailid for confirmation
exports.updateEmail = async(req,res)=>{
  const member = await Member.findByIdAndUpdate(req.params.id,{
    MemberEmailId:req.body.MemberEmailId
  },{new:true});

  res.json(member);
};

//updateDp
exports.updateDP = async(req,res)=>{
  const member = await Member.findByIdAndUpdate(req.params.id,{
    ProfileInitial:req.body.ProfileInitial
  },{new:true});

  res.json(member);
};
