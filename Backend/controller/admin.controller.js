

// import '../models/connection.js'

// import UserSchemaModel from '../models/user.model.js'; 

// import jwt from 'jsonwebtoken'
// import rs from 'randomstring'


// export var login = async(req,res) => {
//     console.log("login",req.body)

//      if(req.body.email !== undefined){
//      var userDetails = {...req.body,"status":1}
//      console.log("if",userDetails)
//      var users =  await UserSchemaModel.find(userDetails)
//      console.log(users)
//      if(users.length>0){

//       const payload = users[0].email
//       const key = rs.generate(50)
//        const token = jwt.sign(payload,key)
//        res.status(200).json({
//         "status":true,
//         "msg" : "user login success",
//         "token":token,
//         "users":users
//        })
//      } 
//        else{
//         res.status(500).json({
//           "status":false,
//              "msg":"token error"})
//        }
//      }
//      else{
//       res.status(500).json({
//         "status":false,
//         "msg":"token error"
//       })
//      }
//  }
