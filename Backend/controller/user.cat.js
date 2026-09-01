import '../models/connection.js';
import url from 'url';
import path from 'path';
// import userCategorySchema from '../models/user.cat.js'
import CategorySchemaModel from '../models/user.cat.js'; 

import jwt from 'jsonwebtoken'
import rs from 'randomstring'

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
export const save = async(req,res)=>{

 try{

  console.log(req.body);
  console.log(req.files);

  const categories = await CategorySchemaModel.find();
  const l = categories.length;

  if(!req.files || !req.files.caticon){
    return res.status(400).json({
      status:false,
      msg:"Image not received"
    });
  }

  const caticon = req.files.caticon;
  const caticonnm = caticon.name;

  const _id = l==0 ? 1 : categories[l-1]._id+1;

  const cDetails = {
    ...req.body,
    _id:_id,
    catIconnm:caticonnm
  };

  await CategorySchemaModel.create(cDetails);

  const uploadpath = path.join(
    __dirname,
    '../../mp/mp/public/assets/uploads/caticons',
    caticonnm
  );

  console.log("UPLOAD PATH =", uploadpath);

  await caticon.mv(uploadpath);

  res.status(201).json({
    status:true
  });

 }
 catch(error){

  console.log("ERROR => ", error);

  res.status(500).json({
    status:false,
    error:error.message
  });

 }
};
export const fetch=async(req,res)=>{
 
    var condition_obj = req.query.condition_obj;
    if(condition_obj!=undefined)
      condition_obj = JSON.parse(condition_obj);
    else
      condition_obj = {};

  const CategoryList=await CategorySchemaModel.find(condition_obj);
  if(CategoryList.length!=0)
    res.status(200).json(CategoryList);
  else
    res.status(404).json({"status":false});    
};

export var deleteUserCategory=async(req,res)=>{

     var condition_obj = req.body.condition_obj;
    if(condition_obj!=undefined)
      condition_obj = JSON.parse(condition_obj);
    else
      condition_obj = {};

  try{
    let userDetails = await CategorySchemaModel.findOne(condition_obj);
    if(userDetails){
      let user=await CategorySchemaModel.deleteOne(condition_obj);   
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
    let userDetails = await CategorySchemaModel.findOne(JSON.parse(req.body.condition_obj));
    if(userDetails){
      let user=await CategorySchemaModel.updateMany(JSON.parse(req.body.condition_obj),{$set:JSON.parse(req.body.content_obj)});   
      if(user)
        res.status(200).json({"status":true, "msg":"category Updated successfully"});
      else
        res.status(500).json({"status": false });
    }
    else
      res.status(404).json({"status":false,"msg":"category not found"});
  }catch(error){
    res.status(500).json({"status":false});        
  };
};