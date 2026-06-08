 import bcrypt from "bcrypt";
 export const register = async (req, res) => {
  try {
    //console.log(req.body);

const {
  name,
  email,
  password,
  phoneNumber,
  department,
  year
} = req.body;

     // Validation
    if (
      !name ||
      !email ||
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

    

      // password hashing
    const hashedPassword = await bcrypt.hash(password, 10);
const userData = {
  name,
  email,
  password: hashedPassword,
  phoneNumber,
  department,
  year
};

console.log(userData);
    

    return res.status(200).json({
      success: true,
      message: " password  hashed successfully"
    });


  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

