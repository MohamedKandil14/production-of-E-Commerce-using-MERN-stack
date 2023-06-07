import express from 'express'
import { isAdmin, requireSign } from '../middleware/authMiddleware.js';
import { categoryController, createCategoryController, deleteCategoryController, singleCategoryController, updateCategoryController } from '../controllers/categoryController.js';
const router=express.Router();
//routes
//createCategory
router.post('/create-category',requireSign,isAdmin,createCategoryController);
//updateCategory
router.put("/update-category/:id",requireSign,isAdmin,updateCategoryController);
//get all categories
router.get('/getall-category',categoryController)
//singlecategory
router.get('/single-category/:slug',singleCategoryController);
//deletecategory
router.delete('/delete-category/:id',requireSign,isAdmin,deleteCategoryController)



export default router;