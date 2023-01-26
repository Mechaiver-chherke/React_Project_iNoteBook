const express = require('express');
const User = require('../models/User');
const router = express.Router();
const bcrypt = require('bcrypt');
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const JWT_SECRET = "mack_24";
//create a user using :POST "/api/auth/createuser" 
router.post('/createuser', [body('name', "Please Enter Valid Name").isLength({ min: 3 }),body('email',"Please Enter Valid Email").isEmail(),body('password',"Please Enter Valid Password").isLength({ min: 5 })],
async (req, res)=>{
  //if there is error it return bed request
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  //CHECK USER EXIST OR NOT 
  try {
    
  
  let user = await User.findOne({email: req.body.email});
  if(user){
    return res.status(400).json({error: "Sorry a user with this Email Already exist Please Try to Login"})
  }
  const salt = await bcrypt.genSalt(10);
  secPass = await bcrypt.hash (req.body.password, salt);
  //create user 
   user = await User.create({
    name: req.body.name,
    password: secPass,
    email: req.body.email,
  }) 
  const data = {
    user :{id : user.id}
  }
  const authToken = jwt.sign(data,JWT_SECRET);
   

  res.json({authToken});
 } catch (error) {
    console.error(error.message);
    res.status(500).send("some error occured")
  }
})
module.exports = router