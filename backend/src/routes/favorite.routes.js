import express from "express";
import {
  addFavorite,
  getFavorites,
  removeFavorite
} from "../controllers/favorite.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

// Add favorite
router.post("/:productId", authMiddleware, addFavorite);

// Get my favorites
router.get("/", authMiddleware, getFavorites);

// Remove favorite
router.delete("/:productId", authMiddleware, removeFavorite);

export default router;