const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const User = require("../models/User");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

////// Signup
router.post(
  "/createuser",
  body("email", "Incorrect email format").isEmail(),
  body("password", "Password should be min 5 length").isLength({ min: 5 }),
  // body("name", "name should be min 5 length").isLength({ min: 5 }),
  async (req, res) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    console.log("req.body signup ", req.body);
    const { name, password, email, location } = req.body;
    ///// Check if user(email) is already existed
    let isUserExisted = await User.findOne({ email });
    console.log("isUserExisted CreateUser.js", isUserExisted);
    if (isUserExisted) {
      // window.alert("User is already existed");
      return res
        .status(400)
        .json({ success: false, error: "User is already existed" });
    }

    const salt = await bcryptjs.genSalt(10);
    const securePassword = await bcryptjs.hash(password, salt);

    try {
      await User.create({
        name,
        email,
        password: securePassword,
        location,
      });
      res.json({
        success: true,
      });
    } catch (error) {
      console.log("Error", error);
      res.json({
        success: false,
      });
    }
  }
);

/////////// Login
router.post(
  "/loginuser",
  body("email", "Incorrect email format").isEmail(),
  body("password", "Password should be min 5 length").isLength({ min: 5 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    console.log("req.body login", req.body);
    const { password, email } = req.body;

    try {
      const userDoc = await User.findOne({ email }); // It will return the document(record) based on the email. If no email exist then return null
      console.log("userDoc", userDoc);
      if (!userDoc) {
        return res
          .status(400)
          .json({ errors: "Incorrect username or password" });
      }

      // /// Comparing passwords
      ///It will return either true or false.
      const passwordCompare = await bcryptjs.compare(
        password,
        userDoc.password
      );
      //   if (!(password === userDoc.password)) {  ///// this code was use when storing password without encryption. Just for testing
      //   if (password !== userDoc.password) {
      if (!passwordCompare) {
        return res
          .status(400)
          .json({ errors: "Incorrect username or password" });
      }

      ///// Creating token and sending to client's browser
      const payload = {
        user: { id: userDoc.id },
      };
      const secretkey = process.env.SECRET_KEY;
      const token = await jwt.sign(payload, secretkey, { expiresIn: "3d" });

      res.json({
        success: true,
        token: token,
      });
    } catch (error) {
      console.log("Error", error);
      res.json({
        success: false,
      });
    }
  }
);

module.exports = router;
