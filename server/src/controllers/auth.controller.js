import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

// for register function
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // check user using email
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({
        message: "User exists",
      });
    }

    // password hashing
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //
    await User.create({
      name,
      email,
      password: hashedPassword,
      role: "user",
    });
    return res.status(201).json({
      message: "User registered successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body || {};

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }
    // find user in DB
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: " Invalid email or password",
      });
    }

    //password match
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        message: " Invalid email or password",
      });
    }

    //make token for loging
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
    );
    console.log("Sign secret: ", process.env.JWT_SECRET);
    return res.status(200).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};
