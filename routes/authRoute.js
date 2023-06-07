import express from 'express';
import {registerController,loginController,testController,forgotpasswordController, updateProfileController, getOrdersController, getAllOrdersController, orderStatusController} from '../controllers/authController.js'
import { isAdmin, requireSign } from '../middleware/authMiddleware.js';
const router=express.Router()
router.post('/register',registerController)
router.post('/login',loginController);
router.post('/forgot-password',forgotpasswordController);

router.get('/test',requireSign,isAdmin,testController);
router.get('/user-auth',requireSign,(req,res)=>{
    res.status(200).send({
        ok:true
    })
})
router.get('/admin-auth',requireSign,isAdmin,(req,res)=>{
    res.status(200).send({
        ok:true
    })
});
//update profile
router.put("/profile", requireSign, updateProfileController);
//orders
router.get("/orders", requireSign, getOrdersController);

//all orders
router.get("/all-orders", requireSign, isAdmin, getAllOrdersController);
// order status update
router.put(
    "/order-status/:orderId",
    requireSign,
    isAdmin,
    orderStatusController
  );

export default router;
