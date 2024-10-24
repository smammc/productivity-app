const express = require("express");
const router = express.Router();

// ℹ️ Handles password encryption
const bcrypt = require("bcrypt");

// Require the User model in order to interact with the database
const User = require("../models/User.model");

// Require necessary (isAuthenticated) middleware in order to control access to specific routes
const isAuthenticated = require("../middleware/jwt.middleware.js");

// How many rounds should bcrypt run the salt (default - 10 rounds)
const saltRounds = 10;

const mongoose = require("mongoose");

const fileUploader = require("../config/cloudinary.config");

// Remove unecessary user information
function normalizeUser(userInfo) {
  const newObj = { ...userInfo._doc };

  // Remove password before sending user object
  delete newObj.password;
  return newObj;
}

// GET User information
router.get("/:userId", isAuthenticated, (request, response, next) => {
  const { userId } = request.params;
  User.findById(userId)
    .then((userInfo) => {
      const user = normalizeUser(userInfo);
      console.log("Retrieved user information -> ", user);
      response.status(200).json(user);
    })
    .catch((error) => {
      console.log("Error user info -> ", error);
      response.status(500).json({ error: "Failed to retrieve user info" });
    });
});

// Update user information
router.put(
  "/:userId",
  isAuthenticated,
  fileUploader.single("picture"),
  async (req, res) => {
    const { userId } = req.params;
    const { name, email, password } = req.body;
    console.log("File: ", req.file);
    const picture = req.file ? req.file.path : undefined; // Get the uploaded image URL from Claudinary

    try {
      // Find the user by ID
      const existingUser = await User.findById(userId);

      if (!existingUser) {
        return res.status(404).json({ error: "User not found" });
      }

      // If a new password is provided, hash it
      let hashedPassword = existingUser.password; //Default to existing password

      if (password) {
        const salt = bcrypt.genSaltSync(saltRounds);
        hashedPassword = bcrypt.hashSync(password, salt);
      }

      // Update User
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        {
          name,
          email,
          password: hashedPassword,
          picture,
        },
        { new: true }
      );
      if (!updatedUser) {
        return res.status(404).json({ error: "User not found" });
      }

      console.log("User updated: ", updatedUser);
      res.status(200).json(updatedUser);
    } catch (error) {
      console.log("Error while updating user: ", error);
      res.status(500).json({ error: "Failed to update user" });
    }
  }
);

// Delete user
router.delete("/:userId", isAuthenticated, (res, req) => {
  const { userId } = req.params;

  User.findByIdAndDelete(userId)
    .then((user) => {
      console.log("User deleted: ", userId);
      res.status(201).json({ message: "User deleted sucessfully" });
    })
    .catch((error) => {
      console.error("Error while deleting user account: ", error);
      res.status(500).json({ message: "Failed to delete user account" });
    });
});

module.exports = router;
