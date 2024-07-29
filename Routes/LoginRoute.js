const express = require("express");
const router = express.Router();
const User = require("../Model/UserModel");
const bycrpt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const Login = async (req, res) => {

  const secret = "FoodwebApplication123456";

  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(201).send({
        success:false,
        message: "Username and Password are Incorrect",
      });
    }
    
    const pass = await bycrpt.compare(req.body.password,user.password);
    // console.log(pass);

    if (!pass) {
      return res.status(201).send({
        success:false,
        message: "Username and Password are Incorrect",
      });
    }

    const payload ={
      id:user.id
    };

    const token = jwt.sign(payload,secret);

    res.status(201).json({
      token:token,
      success:true,
    });
  } 
  catch (err) {
    res.send({
      success:false,
      Error: err,
    });
  }
};

router.post("/", Login);

module.exports = router;
