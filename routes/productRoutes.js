import express from 'express';
import { isAdmin, requireSign } from '../middleware/authMiddleware.js';
import {  brainTreePaymentController, braintreeTokenController, createProductController, deleteProduct, getAllProducts, getProductPhoto, getSingleProduct, productCategoryController, productCountController, productFiltersController, productListController, realtedProductController, searchProductController, updateProductController,  } from '../controllers/productController.js';
import formidable from 'express-formidable';
const router=express.Router()
////routes
////create-product
router.post('/create-product',requireSign,isAdmin,formidable(),createProductController);
////update-product
router.put('/update-product/:pid',requireSign,isAdmin,formidable(),updateProductController);
//////get products
router.get('/getall-products',getAllProducts);
//////singleproduct
router.get('/getall-products/:slug',getSingleProduct);
/////////get phot
router.get('/productphoto/:pid',getProductPhoto);
/////////delete product
router.delete('/delete-product/:pid',deleteProduct);
////////////filter product
router.post('/product-filters',productFiltersController);
//////////productcount
router.get('/product-count',productCountController)
//product per page
router.get("/product-list/:page", productListController);
///////search product
router.get('/search/:keyword',searchProductController);
//////////////similar products
router.get('/related-product/:pid/:cid',realtedProductController);
//category wise product
router.get("/product-category/:slug", productCategoryController);
// payments routes
// token
router.get("/braintree/token", braintreeTokenController);

// payments
router.post("/braintree/payment", requireSign, brainTreePaymentController);









export default router;