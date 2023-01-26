const express = require('express');
const User = require('../models/User');
const router = express.Router();
const bcrypt = require('bcrypt');
const { body, validationResult } = require('express-validator');
var jwt = require('jsonwebtoken');
const JWT_SECRET = "mack_24";
var fetchuser = require('../middleware/fetchuser');
//ROUTE 1 :create a user using :POST "/api/auth/createuser" 
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
  //hashing of password is done by bcrypt and salt is added
    const salt = await bcrypt.genSalt(10);
  secPass = await bcrypt.hash (req.body.password, salt);
  //create user 
   user = await User.create({
    name: req.body.name,
    password: secPass,
    email: req.body.email,
  }) 
  //toked is generated for auth
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
// ROUTE 2 authenticate a User using POST "/api/auth/login" no Login Reqiured 
router.post('/login', [body('email',"Please Enter Valid Email").isEmail(),
body('password', "password cannot be Blank").exists()], 

async (req, res)=>{
  //if there is error it return bed request
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  } 
  const {email, password} = req.body;
  try {
    let user = await User.findOne({email});
    if (!user){
      return res.status(400),json({error : "Please Try To Login With Correct Credentials"});
    }
    const passwordCompare =  await bcrypt.compare(password , user.password);
    if (!passwordCompare){
      return res.status(400),json({error : "Please Try To Login With Correct Credentials"});
    }
    const data = {
user:{
  id : user.id
}
    }
    const authToken = jwt.sign(data,JWT_SECRET);
     res.json({authToken});
  } catch (error) {
    console.error(error.message);
    res.status(500).send("some error occured")
  }
})
//ROUTE 3: Get Login Details using POST "/api/auth/getuser"
router.post('/getuser', fetchuser, async (req, res)=>{

try {
  userId = req.user.id;
  const user = await User.findById(userId).select("-password")
  //console.log(user);
  res.send(user)
} catch (error) {
  console.error(error.message);
  res.status(500).send("some error occured")

}
})
module.exports = router