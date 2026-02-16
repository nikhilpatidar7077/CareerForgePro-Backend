const User = require("../models/auth.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const signUp = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;
    if (!fullName || !email || !password) {
      return res.status(400).json({
        message: "All Fileds Are Required!",
      });
    }
    const emailExists = await User.findOne({ email });
    if (emailExists) {
      return res.status(409).json({
        message: "Email Already registered!",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({
      fullName,
      email,
      password: hashedPassword,
    });
    res.status(201).json({
      success: true,
      message: "Account Created Successfully!",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const logIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userDeatils = await User.findOne({ email });
    if (!email || !password) {
      return res.status(401).json({
        message: "All Fileds Are Required!",
      });
    }
    if (!userDeatils) {
      return res.status(401).json({
        message: "Invalide Email!",
      });
    }
    const matchPassword = await bcrypt.compare(password, userDeatils.password);
    if (!matchPassword) {
      return res.status(401).json({
        message: "Invalide Password!",
      });
    }
    const generateToken = jwt.sign({ id: userDeatils.id }, process.env.JWT_KEY, {expiresIn:"2d"});
    await res.status(200).json({
      success: true,
      message: "LogIn Successfully!",
      token : generateToken
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {signUp,logIn}
