//to link connection on controller
import '../models/connection.js';
import url from 'url';
import path from 'path';

//to link user model on controller
//import CategorySchemaModel from '../models/category.model.js';
import SubCategorySchemaModel from '../models/subcategory.model.js'; 

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
    
export const save = async(req,res)=>{
console.log(req.body);
console.log(req.files);
 const subcategories = await SubCategorySchemaModel.find();
 const l = subcategories.length;

 const caticon = req.files.caticon;
 
 const subcaticonnm = caticon.name;

 const _id = l==0?1:subcategories[l-1]._id+1;
 const scDetails={...req.body,'_id':_id,'subcaticonnm':subcaticonnm};
 try
 {
  await SubCategorySchemaModel.create(scDetails);
  const uploadpath = path.join(__dirname,'../../UI/public/assets/uploads/subcaticons',subcaticonnm); 
  caticon.mv(uploadpath);
  res.status(201).json({'status':true});
 }
 catch(error){
  res.status(500).json({
    'status':false,
    'msg':error.message
  });      
 }
};

export const fetch=async(req,res)=>{
  var condition_obj=req.query;
  const scList=await SubCategorySchemaModel.find(condition_obj);
  if(scList.length!=0)
    res.status(200).json(scList);
  else
    res.status(404).json({"status":false});    
};


/*export var deleteUser=async(req,res)=>{
  var condition_obj=req.body.condition_obj;
  if(condition_obj!=undefined)
   condition_obj=JSON.parse(condition_obj); 
  else
   condition_obj={};

  try{
    let cDetails = await CategorySchemaModel.findOne(condition_obj);
    if(cDetails){
      let category=await CategorySchemaModel.deleteOne(condition_obj);   
      if(category)
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
    let cDetails = await CategorySchemaModel.findOne(JSON.parse(req.body.condition_obj));
    if(cDetails){
      let category=await CategorySchemaModel.updateMany(JSON.parse(req.body.condition_obj),{$set:JSON.parse(req.body.content_obj)});   
      if(category)
        res.status(200).json({"status":true,"msg":"Category details updated"});
      else
        res.status(500).json({"status": false});
    }
    else
      res.status(404).json({"status":false,"msg":"Requested resource not available"});
  }catch(error){
    res.status(500).json({"status":false,"msg":"Server error"});        
  };
};  
*/

