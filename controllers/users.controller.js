const UserModel = require("../models/user.model");
const express = require("express");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const bycrptJs = require("bcryptjs");
const router = express.Router();
const jwt = require("jsonwebtoken");

// user login logic
exports.userLogin = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await UserModel.findOne({ username: username });

    if (!username) {
      return res.send({
        status: false,
        message: "username field is required",
      });
    }

    if (!password) {
      return res.send({
        status: false,
        message: "Password field is required",
      });
    }
    // Check if the user exists
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Verify the password
    const isPasswordValid = await bcrypt.compare(
      password,
      user.password,
      function (err, result) {
        if (result) {
          console.log(result);
          // Create a JWT token
          const token = jwt.sign({ userId: user._id }, "your-secret-key", {
            expiresIn: "1h", // Token expiration time
          });

          res.status(200).json({ token });
        } else {
          return res.status(401).json({ message: "Invalid credentials" });
        }
      }
    );
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// get all users
exports.getUser = async (req, res) => {
  try {
    const usersList = await UserModel.find({});
    res.send({ usersList });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Register a new user
exports.createUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // checking if the inputed username is already taken
    const existingUser = await UserModel.findOne({
      $or: [{ username }, { email }],
    });
    if (existingUser) {
      return res
        .status(404)
        .json({ message: "Username or Email already taken" });
    }
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);

    // create new user instance
    const newUser = new UserModel({
      username,
      email,
      password: hash,
    });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// fetch details for a single user
exports.getUserDetails = async (req, res) => {
  try {
    const username = req.params.username;
    const user = await UserModel.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Return the user's details as a JSON response
    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user details:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// update a single user details
exports.updateUserDetails = async (req, res) => {
  try {
    const userName = req.params.username;
    const { username, email, password } = req.body;
    const user = await UserModel.findOne({ username: userName });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (username) {
      user.username = username;
    }
    if (email) {
      user.email = email;
    }
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
    }
    await user.save();

    res.status(200).json(user);
  } catch (error) {
    console.error("Error updating user details:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// delete usermodel
exports.deleteUserByUsername = async (req, res) => {
  try {
    const username = req.params.username;
    const user = await UserModel.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    await user.deleteOne({ username: username });

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user by username:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
