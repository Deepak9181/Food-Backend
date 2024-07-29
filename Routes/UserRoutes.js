const express = require("express");
const router = express.Router();
const User = require("../Model/UserModel");
const bcrypt = require("bcryptjs");

const { validationResult, body } = require("express-validator");

const Signup = async (req, res) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(400).send({
      status: "Account Creation Failed",
      errors: result.array(),
    });
  }

  const salt = await bcrypt.genSalt(10);
  const Hash_pass = await bcrypt.hash(req.body.password, salt);
  console.log(Hash_pass);

  console.log(req.body);
  try {
    const Data = await User.create({
      name: req.body.name,
      location: req.body.location,
      email: req.body.email,
      password: Hash_pass,
    });
    res.status(201).json({
      status: "Account Created Successfully",
      data: {
        Data,
      },
    });
  } catch (err) {
    res.send({
      status: "Failed",
      Error: err,
    });
  }
};

const deleteuser = async (req, res) => {
  await User.deleteMany();
  res.send({
    success: "All user deleted",
  });
};

router
  .post(
    "/",
    [
      body("name", "Name field is empty").notEmpty(),
      body("email", "Enter a valid email").isEmail(),
      body("password", "Min password length should be 5").isLength({ min: 5 }),
    ],
    Signup
  )
  .delete("/",deleteuser);

module.exports = router;

// body("name","Name field is Empty").notEmpty(),
// body("email","Enter a valid email").isEmail(),
// body("password","Min password Length should be 5").isLength({ min: 5 })
