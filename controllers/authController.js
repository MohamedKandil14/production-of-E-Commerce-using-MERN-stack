import { comparedpassword, hashpassword } from "../helpers/authHelper.js";
import userModel from "../models/userModel.js"
import  JWT  from 'jsonwebtoken';
import orderModel from "../models/orderModel.js";
export const registerController=async(req,res)=>{
try {
    const{name,email,password,phone,answer,address}=req.body
  
    if(!name){
        return res.send({message:"name is required"})
    }
    if(!email){
        return res.send({message:"email is required"})
    }
    if(!password){
        return res.send({message:"password is required"})
    }
    if(!phone){
        return res.send({message:"phone is required"})
    }
    if(!answer){
        return res.send({message:"answer is required"})
    }
    if(!address){
        return res.send({message:"address is required"})
    }
     const existinguser=await userModel.findOne({email})
     if(existinguser){
        return res.status(200).send({
            success:false,
            message:"already register log in"

        })
     }
     const hashedpassword=await hashpassword(password)
     const user= await new userModel({name,email,password:hashedpassword,phone,answer,address}).save()
     res.status(201).send({
      success:true,
      message:"register successfully",
      user
     })
} catch (error) {
    console.log(error)
    res.status(500).send({
        success:"fail",
        message:"an error occured",
        error
    })
}
};
 export const loginController=async(req,res)=>{
    try {
        const {email,password}=req.body
        if(!email || !password){
            return res.status(404).send({
                success:"fail",
                message:"email or password invalid"
            })
        }
        const user=await userModel.findOne({email})
        if(!user){
            return res.status(404).send({
                success:"fail",
                message:"no mail for this user"
            })
        }
        const match=await comparedpassword(password,user.password)
        if(!match){
            return res.status(200).send({
                success:"fail",
                message:"password doen`t match"
            })
        }
        const token= await JWT.sign({_id:user._id},process.env.JWT_SECRET,{expiresIn:'7d'});
        res.status(200).send({
            success:true,
            message:"user login successfully",
            user:{
                name:user.name,
                email:user.email,
                phone:user.phone,
                address:user.address,
                role:user.role
            },
            token,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:"fail",
            message:"INVALID USER",
            error
        })
    }

}

 export const forgotpasswordController= async (req,res)=>{
try {
    const {email,answer,newpassword}=req.body;
    
    if(!email){
        res.status(400).send({message:"email is required"})
    }
    if(!answer){
        res.status(400).send({message:"answer is required"})
    }
    if(!newpassword){
        res.status(400).send({message:"newpassword is required"})
    }
    const user=await userModel.findOne({email,answer});
    if(!user){
      return res.status(404).send({
            success:false,
            message:"hhhhhhhhhhhhhhhhhhhhhhhhhhh"
        })
    }
    const hashed=await hashpassword(newpassword);
    await userModel.findByIdAndUpdate(user._id, {password:hashed});
    res.status(200).send({
        success:true,
        message:"password reset successfully"
    })
} catch (error) {
    console.log(error);
    res.status(500).send({
        success:'false',
        message:"something went wrong",
        error
    })
}
 }



export const testController=(req,res)=>{
res.status(200).send('protected route')
}
// export default{registerController}
//////////////////
export const updateProfileController = async (req, res) => {
    try {
      const { name, email, password, address, phone } = req.body;
      const user = await userModel.findById(req.user._id);
      //password
      if (password && password.length < 6) {
        return res.json({ error: "Passsword is required and 6 character long" });
      }
      const hashedPassword = password ? await hashPassword(password) : undefined;
      const updatedUser = await userModel.findByIdAndUpdate(
        req.user._id,
        {
          name: name || user.name,
          password: hashedPassword || user.password,
          phone: phone || user.phone,
          address: address || user.address,
        },
        { new: true }
      );
      res.status(200).send({
        success: true,
        message: "Profile Updated SUccessfully",
        updatedUser,
      });
    } catch (error) {
      console.log(error);
      res.status(400).send({
        success: false,
        message: "Error WHile Update profile",
        error,
      });
    }
  };
  //orders
export const getOrdersController = async (req, res) => {
    try {
      const orders = await orderModel
        .find({ buyer: req.user._id })
        .populate("products", "-photo")
        .populate("buyer", "name");
      res.json(orders);
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error WHile Geting Orders",
        error,
      });
    }
  };
  //orders
  export const getAllOrdersController = async (req, res) => {
    try {
      const orders = await orderModel
        .find({})
        .populate("products", "-photo")
        .populate("buyer", "name")
        .sort({ createdAt: "-1" });
      res.json(orders);
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error WHile Geting Orders",
        error,
      });
    }
  };
  
  //order status
  export const orderStatusController = async (req, res) => {
    try {
      const { orderId } = req.params;
      const { status } = req.body;
      const orders = await orderModel.findByIdAndUpdate(
        orderId,
        { status },
        { new: true }
      );
      res.json(orders);
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error While Updateing Order",
        error,
      });
    }
  };