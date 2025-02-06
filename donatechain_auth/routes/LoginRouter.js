const express = require("express");
const User = require("../models/UserModel");
const bcrypt = require("bcrypt");

const loginRouter = express.Router();

loginRouter.post("/", async (req, res) => {
  
  const { email, password } = req.body;
  
  if (!email || !password) {
    return res.status(400).json({ message: "E-mail or password is not provided" });
  }

  try {
    const isUserPresent = await User.findOne({ email });

    if (!isUserPresent) {
      return res.status(404).json({ message: "User does not exist" });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      isUserPresent.password
    );

    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Password is not correct" });
    }

    const cookieOption = {
      httpOnly: true,
      secure: true,
    };

    res
      .status(200)
      .cookie("userId", isUserPresent._id, cookieOption)
      .json({ message: "Login successful", userId: isUserPresent._id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred while logging in" });
  }
});

module.exports = loginRouter; 