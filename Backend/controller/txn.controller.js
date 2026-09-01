//to link connection on controller
import '../models/connection.js';

//to link user model on controller
import TxnSchemaModel from '../models/txn.model.js';``

export const save = async(req,res)=>{
 const txn_list = await TxnSchemaModel.find();
 const l = txn_list.length;

 const _id = l==0?1:txn_list[l-1]._id+1;
 const txnDetails={...req.body,'_id':_id,'info':Date()};
 try
 {
  await TxnSchemaModel.create(txnDetails);
  res.status(201).json({'status':true});
 }
 catch(error){
  res.status(500).json({'status':false});      
 }
};

