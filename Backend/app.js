import dotenv from 'dotenv';
dotenv.config();


import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors'
import fileUpload from 'express-fileupload';
const app = express();

//application level routers
import UserRouter from './routes/user.router.js';
import CategoryRouter from './routes/user.Cat.js';
import SubCategoryRouter from './routes/subcat.router.js';
import ProductRouter from './routes/product.router.js';
import aichatRoute from './routes/aichat.js';
import txnRouter from './routes/txn.router.js';
import Gateway from './controller/payment.controller.js';
import BidRouter from './routes/bid.router.js';
app.use(cors({
  origin: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(fileUpload());

//configuration to fetch req body content : body parser middleware
//used to fetch req data from methods like : POST , PUT , PATCH , DELETE
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json());
//route level middleware to link router with application base url
app.use('/user',UserRouter);
app.use('/category',CategoryRouter);
app.use('/subcategory',SubCategoryRouter);
app.use('/product',ProductRouter);
app.use('/api/ai',aichatRoute);
app.use('/txn',txnRouter);
app.use('/bid', BidRouter);


app.post('/payment',Gateway);

// app.use('/admin',AdminRouter)
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 
      
