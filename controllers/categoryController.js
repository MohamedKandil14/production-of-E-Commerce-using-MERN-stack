import slugify from "slugify";
import categoryModel from "../models/categoryModel.js";

export const createCategoryController= async(req,res)=>{
try {
    const {name}=req.body;
    if(!name){
      return  res.status(401).send({message:"name is required"})
    }
    const existingCategory=await categoryModel.findOne({name});
    if(existingCategory){
        res.status(200).send({message:"category already Exist"});
    }
    const category=await new categoryModel({name,slug:slugify(name)}).save();
    res.status(201).send({
        success:true,
        message:"new category added",
        category
    })
    
} catch (error) {
    console.log(error)
    res.status(500).send({
        success:false,
        error,
        message:"error in Category"
    })
}
}
//////////////////////////////
export const updateCategoryController=async(req,res)=>{
    try {
        const {name}=req.body;
        const {id}=req.params;
        const category=await categoryModel.findByIdAndUpdate(id,{name,slug:slugify(name)},{new:true});
        res.status(200).send({
            success:true,
            category,
            message:"successfully updated the category"
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:"Error in updating category"
        })
    }

}
/////////////////////////
export const categoryController=async(req,res)=>{
    try {
        const category=await categoryModel.find({});
        res.status(200).send({
            success:true,
            message:"successfully got all categories",
            category
        })
        
    } catch (error) {
        console.log(error),
        res.status(500).send({
            success:false,
            error,
            message:"Error in getall categories"
        })
    }

}
///////////////////////////
 export const singleCategoryController=async(req,res)=>{
try {
    
    const category=await categoryModel.findOne({slug:req.params.slug});
    res.status(200).send({
        success:true,
        message:"successfully got the category",
        category
    })
    
    
} catch (error) {
    console.log(error)
    res.status(500).send({
        success:false,
        error,
        message:"Error in getsingle category"
    })
}
 }
 ///////////////
 export const deleteCategoryController=async(req,res)=>{
try {
    const {id}=req.params;
    await categoryModel.findOneAndDelete(id);
    res.status(200).send({
        success:true,
        message:"successfully delete the category",
        
    })
} catch (error) {
    console.log(error)
    res.status(500).send({
        success:false,
        error,
        message:"Error in delete category"
    })
}
 }