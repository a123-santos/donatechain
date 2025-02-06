const express = require("express");
const User = require("../models/UserModel");
const bcrypt = require("bcrypt");

const registerRouter = express.Router();

registerRouter.post("/", async (req, res) => {
  const { email, password } = req.body;

  // Trim the inputs and check if any are empty
  if (
    [email, password].some(
      (item) => !item || (typeof item === "string" && item.trim() === "")
    )
  ) {
    return res.status(400).json({ message: "All fields are required" });

  }

  try {
    // Check if the user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(409).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const user = await User.create({
      email,
      password: hashedPassword
    });

    const cookieOption = {
      httpOnly: true,
      secure: true,
    };

    res.status(201).cookie("userId", user._id, cookieOption).json(user._id);
  } catch (error) {
    res.status(500).json({ message: "Error registering new user" });
  }
});
module.exports = registerRouter;