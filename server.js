import express, { json } from 'express';
import color from 'colors';
import dotenv from 'dotenv';
import morgan  from 'morgan';
import connectDB from './config/db.js';
// import authRoutes from './routes/authRoute.js'
import authRoutes from './routes/authRoute.js';
import categoryRoutes from './routes/categoryRoutes.js';
 import productRoutes from './routes/productRoutes.js';

import  Jwt  from 'jsonwebtoken';
import  cors from 'cors';
import path from 'path';
import { fileURLToPath} from 'url';
dotenv.config();
const app=express();
connectDB();
////////esmodule fix
const __filename=fileURLToPath(import.meta.url);
const __dirname=path.dirname(__filename);
/////middlewares
app.use(express.json())
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname,'./clientside/build')));
//////routes
app.use('/api/v1/auth',authRoutes);
app.use('/api/v1/category',categoryRoutes);
app.use('/api/v1/product',productRoutes);
// app.get('/',(req,res)=>{
//     res.send('<h1>Welcome to my E-commerce using MERN STACK App</h1>');
// });
/////////////restapi
app.use("*",function(req,res){
res.sendFile(path.join(__dirname,"./clientside/build/index.html"));
})
const PORT= process.env.PORT || 8080;
app.listen(PORT,()=>{
    console.log(`app run on ${process.env.DEV_MODE} port ${PORT}`.bgCyan.white)
});
