import express from "express";
import {
  registerUser,
  loginUser,
  updateProfile,
  removeProfileImage,
  changePassword,
 
} from "../controllers/auth.controller.js";
import prisma from "../config/prisma.js";
import authMiddleware from "../middleware/auth.middleware.js";
import upload from "../middleware/upload.middleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

router.get("/profile", authMiddleware, async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: req.user.userId,
      },
      select: {
        id: true,
        name: true,
        email: true,
        phoneNumber: true,
        department: true,
        year: true,
        
        collegeName: true,
        profileImage: true,
        createdAt: true,
      },
    });

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});
router.put(
  "/profile",
  authMiddleware,
  upload.single("profileImage"),
  updateProfile
);


router.delete(
  "/profile-image",
  authMiddleware,
  removeProfileImage
);

router.put(
  "/change-password",
  authMiddleware,
  changePassword
);


export default router;