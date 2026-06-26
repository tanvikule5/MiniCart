import express from "express";
import {
  uploadProductImage,
  getProductImages,
  deleteProductImage
} from "../controllers/productImage.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";
import upload from "../middleware/upload.middleware.js";

const router = express.Router();

// Public
router.get("/products/:id/images", getProductImages);

// Private
router.post(
  "/products/:id/images",
  authMiddleware,
  upload.single("image"),
  uploadProductImage
);

// Private
router.delete(
  "/products/images/:imageId",
  authMiddleware,
  deleteProductImage
);

export default router;