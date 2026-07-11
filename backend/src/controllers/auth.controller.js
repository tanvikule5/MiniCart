import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../config/prisma.js";
import uploadToCloudinary from "../utils/uploadToCloudinary.js";
import cloudinary from "../config/cloudinary.js";

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

const parsedYear = Number(year);
console.log("BODY:", req.body);

// Clean inputs
const trimmedName = name?.trim();
const trimmedEmail =
  email?.trim().toLowerCase();

// Required fields
if (
  !trimmedName ||
  !trimmedEmail ||
  !password ||
  !phoneNumber ||
  !department ||
  !year
) {
  return res.status(400).json({
    success: false,
    message: "All fields are required"
  });
}

// Name validation
if (trimmedName.length < 2) {
  return res.status(400).json({
    success: false,
    message:
      "Name must be at least 2 characters"
  });
}

// Email validation
const emailRegex =
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if (!emailRegex.test(trimmedEmail)) {
  return res.status(400).json({
    success: false,
    message: "Invalid email address"
  });
}

// Password validation
if (password.length < 6) {
  return res.status(400).json({
    success: false,
    message:
      "Password must be at least 6 characters"
  });
}

// Phone validation
const phoneRegex = /^[0-9]{10}$/;

if (!phoneRegex.test(phoneNumber)) {
  return res.status(400).json({
    success: false,
    message:
      "Phone number must be exactly 10 digits"
  });
}

// Year validation
if (parsedYear < 1 || parsedYear > 5) {
  return res.status(400).json({
    success: false,
    message: "Invalid year"
  });
}

// Check duplicate email
const existingUser =
  await prisma.user.findUnique({
    where: {
      email: trimmedEmail
    }
  });

if (existingUser) {
  return res.status(400).json({
    success: false,
    message:
      "Email already registered"
  });
}

// Hash password
const hashedPassword =
  await bcrypt.hash(password, 10);

// Create user
const user =
  await prisma.user.create({
    data: {
      name: trimmedName,
      email: trimmedEmail,
      password: hashedPassword,
      phoneNumber,
      department,
      year:parsedYear
    }
  });

return res.status(201).json({
  success: true,
  message:
    "User registered successfully",
  user: {
    id: user.id,
    name: user.name,
    email: user.email,
    phoneNumber:
      user.phoneNumber,
    department:
      user.department,
    year: user.year,
    createdAt:
      user.createdAt
  }
});


} catch (error) {
  console.error("REGISTER ERROR:", error);

  return res.status(500).json({
    success: false,
    message: error.message
  });
}
};


//logiin user
export const loginUser = async (req, res) => {
try {
const { email, password } = req.body;


const trimmedEmail =
  email?.trim().toLowerCase();

// Required fields
if (!trimmedEmail || !password) {
  return res.status(400).json({
    success: false,
    message: "Email and password are required"
  });
}

// Email format validation
const emailRegex =
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if (!emailRegex.test(trimmedEmail)) {
  return res.status(400).json({
    success: false,
    message: "Invalid email address"
  });
}

// Find user
const user = await prisma.user.findUnique({
  where: { email: trimmedEmail }
});

if (!user) {
  return res.status(404).json({
    success: false,
   message: "Invalid credentials"
  });
}

// Compare password
const isMatch = await bcrypt.compare(
  password,
  user.password
);

if (!isMatch) {
  return res.status(401).json({
    success: false,
    message: "Invalid credentials"
  });
}

// Generate JWT
const token = jwt.sign(
  {
    userId: user.id,
    email: user.email
  },
  process.env.JWT_SECRET,
  {
    expiresIn: "7d"
  }
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

//update profile
export const updateProfile = async (req, res) => {
  try {

    const {
      name,
      phoneNumber,
      department,
      year,
      collegeName,
    } = req.body;
    
    console.log(req.file);
console.log(req.body);

    let profileImage;


    if (req.file) {

  const result = await uploadToCloudinary(req.file.buffer);

  console.log("CLOUDINARY RESULT:", result);

  profileImage = result.secure_url;

  console.log("PROFILE IMAGE URL:", profileImage);
}


    const updatedUser = await prisma.user.update({

      where:{
        id:req.user.userId
      },


      data:{

        name,
        phoneNumber,
        department,
        year:Number(year),
        collegeName,

        ...(profileImage && {
          profileImage
        })

      },



      select:{
        id:true,
        name:true,
        email:true,
        phoneNumber:true,
        department:true,
        year:true,
        collegeName:true,
        profileImage:true,
        createdAt:true
      }

    });

console.log("UPDATED USER:", updatedUser);

    res.status(200).json({

      success:true,
      message:"Profile updated successfully",
      user:updatedUser

    });


  } catch(error){

    res.status(500).json({

      success:false,
      message:error.message

    });

  }
};

export const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    // Check required fields
    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Current password and new password are required",
      });
    }

    // Find logged-in user
    const user = await prisma.user.findUnique({
      where: {
        id: req.user.userId,
      },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Verify current password
    const isMatch = await bcrypt.compare(
      currentPassword,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Current password is incorrect",
      });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(
      newPassword,
      10
    );

    // Update password
    await prisma.user.update({
      where: {
        id: req.user.userId,
      },
      data: {
        password: hashedPassword,
      },
    });

    return res.status(200).json({
      success: true,
      message: "Password changed successfully",
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



export const removeProfileImage = async (req, res) => {

  try {

    const user = await prisma.user.findUnique({

      where:{
        id:req.user.userId
      }

    });


    if(!user.profileImage){

      return res.status(400).json({

        success:false,
        message:"No profile image found"

      });

    }


    // Remove image from Cloudinary
    const publicId = user.profileImage
      .split("/")
      .pop()
      .split(".")[0];


    await cloudinary.uploader.destroy(
      publicId
    );


    // Remove URL from database
    const updatedUser = await prisma.user.update({

  where:{
    id:req.user.userId
  },

  data:{
    profileImage:null
  },


  select:{
    id:true,
    name:true,
    email:true,
    phoneNumber:true,
    department:true,
    year:true,
    collegeName:true,
    profileImage:true,
    createdAt:true
  }

});


    res.status(200).json({

      success:true,
      message:"Profile image removed",
      user:updatedUser

    });


  } catch(error){

    res.status(500).json({

      success:false,
      message:error.message

    });

  }

};