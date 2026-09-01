//to link connection on controller
import '../models/connection.js';

//to link user model on controller
import UserSchemaModel from '../models/user.model.js'; 

import jwt from 'jsonwebtoken'
import rs from 'randomstring'
import sendMail from './email.controller.js'; // Sahi path do


export const save = async (req, res) => {
  try {
    // Check karo agar email pehle se registered toh nahi hai
    const existingUser = await UserSchemaModel.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(409).json({ 
        status: false, 
        message: "Email already registered" 
      });
    }

    // Custom Auto Increment ID Calculation
    const users = await UserSchemaModel.find();
    const l = users.length;
    const _id = l == 0 ? 1 : users[l-1]._id + 1;

    // ================= HERE IS YOUR CODE =================
    // Random 6 digit OTP generate karo
    const generatedOTP = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 Min Expiry

    const userDetails = { 
      ...req.body, 
      '_id': _id, 
      'role': req.body.role || 'user', 
      'status': 0, 
      'info': Date(),
      'otp': generatedOTP,
      'otpExpires': otpExpires
    };

    await UserSchemaModel.create(userDetails);

    // Tumhara email controller call!
    sendMail(req.body.email, generatedOTP);
    // =====================================================

    res.status(201).json({ 
      status: true, 
      message: "Registration successful! OTP sent to your email.",
      email: req.body.email
    });

  } catch (error) {
    console.log("Registration Error:", error);
    res.status(500).json({ status: false, message: "Registration failed" });
  }
};;

export const fetch=async(req,res)=>{
 
    var condition_obj = req.query.condition_obj;
    if(condition_obj!=undefined)
      condition_obj = JSON.parse(condition_obj);
    else
      condition_obj = {};

  const userList=await UserSchemaModel.find(condition_obj);
  if(userList.length!=0)
    res.status(200).json(userList);
  else
    res.status(404).json({"status":false});    
};

export var deleteUser=async(req,res)=>{

     var condition_obj = req.body.condition_obj;
    if(condition_obj!=undefined)
      condition_obj = JSON.parse(condition_obj);
    else
      condition_obj = {};

  try{
    let userDetails = await UserSchemaModel.findOne(condition_obj);
    if(userDetails){
      let user=await UserSchemaModel.deleteOne(condition_obj);   
      if(user)
        res.status(200).json({"status":true});
      else
        res.status(500).json({"status": false});
    }
    else
      res.status(404).json({"status":false});
  }catch(error){
    res.status(500).json({"status":false});        
  };
};  

export var update=async(req,res)=>{

  try{
    let userDetails = await UserSchemaModel.findOne(JSON.parse(req.body.condition_obj));
    if(userDetails){
      let user=await UserSchemaModel.updateMany(JSON.parse(req.body.condition_obj),{$set:JSON.parse(req.body.content_obj)});   
      if(user)
        res.status(200).json({"status":true, "msg":"user Updated successfully"});
      else
        res.status(500).json({"status": false });
    }
    else
      res.status(404).json({"status":false,"msg":"user not found"});
  }catch(error){
    res.status(500).json({"status":false});        
  };
};

 

export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body; // Role receive kar rahe hain

    // 1. Check karo ki role request me aaya hai ya nahi
    if (!role) {
      return res.status(400).json({ status: false, msg: "Please select a role" });
    }

    // 2. Email, Password aur Active Status (1) check karo
    const user = await UserSchemaModel.findOne({ email: email, password: password, status: 1 });

    if (!user) {
      return res.status(404).json({ status: false, msg: "Invalid Email, Password or Account not verified" });
    }

    // 3. MAIN ROLE MATCH CHECK (Vice-Versa Security Logic)
    if (user.role !== role) {
      return res.status(403).json({ 
        status: false, 
        msg: `Unauthorized access! You cannot login as ${role.toUpperCase()} with this account.` 
      });
    }

    // 4. Successful Login
    res.status(200).json({
      status: true,
      msg: "Login successful!",
      userDetails: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      }
    });

  } catch (error) {
    console.log("Login Error:", error);
    res.status(500).json({ status: false, msg: "Server error during login" });
  }
};

// Controller function:
export const verifyOTP = async (req, res) => {
  const { email, otp } = req.body;
  try {
    const user = await UserSchemaModel.findOne({ email: email });

    if (!user) return res.status(404).json({ status: false, msg: "User not found" });

    // Check OTP and Expiry
    if (user.otp === otp && new Date() < new Date(user.otpExpires)) {
      // Customer OTP verify hote hi active ho jaata hai.
      // Transporter OTP verify hone ke baad bhi pending (status 0) hi rahega,
      // jab tak Admin "Manage Transporters" se Approve nahi karta.
      user.status = user.role === "transporter" ? 0 : 1;
      user.otp = null;
      user.otpExpires = null;
      await user.save();

      return res.status(200).json({
        status: true,
        msg:
          user.role === "transporter"
            ? "Email verified! Your account is now pending Admin approval."
            : "Account verified successfully!",
      });
    } else {
      return res.status(400).json({ status: false, msg: "Invalid or Expired OTP" });
    }
  } catch (error) {
    res.status(500).json({ status: false, msg: "Verification failed" });
  }
};