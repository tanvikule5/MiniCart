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
if (year < 1 || year > 5) {
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
      year
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
  where: { email }
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
