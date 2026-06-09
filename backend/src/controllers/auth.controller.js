import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../config/prisma.js";
//REGISTER
export const registerUser = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      phoneNumber,
      department,
      year
    } = req.body;

// Validation
    if (!name || !email || !password || !phoneNumber || !department || !year) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      });
    }

// Check duplicate email FIRST
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email already registered"
      });
    }

// Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

// Create user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        phoneNumber,
        department,
        year
      }
    });
return res.status(201).json({
  success: true,
  message: "User registered successfully",
  user: {
    id: user.id,
    name: user.name,
    email: user.email,
    phoneNumber: user.phoneNumber,
    department: user.department,
    year: user.year,
    createdAt: user.createdAt
  }
});
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// LOGIN
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required"
      });
    }

    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials"
      });
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.status(200).json({
  success: true,
  message: "Login successful",
  user: {
    id: user.id,
    name: user.name,
    email: user.email
  },
  token
});

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};