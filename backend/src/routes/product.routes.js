import express from "express";
import { createProduct,getAllProducts,  getProductById , getMyProducts, updateProduct, deleteProduct} from "../controllers/product.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/create", authMiddleware, createProduct);
//getallproducts
router.get("/",getAllProducts);

// get products of logged-in user
router.get("/my/products", authMiddleware, getMyProducts);
//update product
router.put("/:id", authMiddleware, updateProduct);
//delete product
router.delete("/:id", authMiddleware, deleteProduct);
// get product by id
router.get("/:id", getProductById);

export default router;