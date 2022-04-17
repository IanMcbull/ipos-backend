const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../models/UserModel");
//@desc Get all users
//@route GET /api/users
//@access private
const getUsers = asyncHandler(async (req,res)=>{
  const users = await User.find({})
  res.status(200).send(users)
})

const getAdminUsers = asyncHandler(async(req,res)=>{
  const users =  await User.find({usertype:'Admin'});
  res.status(200).send(users)
})

// @desc Register a new user
// @ route POST /api/users
// @access public
const registerUser = asyncHandler(async (req, res) => {
  const { username, usertype, role, password} = req.body;
  if (!username || !usertype || !role) {
    res.status(400);
    throw new Error("Please add all the fields");
  }
  
  // Check if the user exists
  const userExists = await User.findOne({ username });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  } else {
    //hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //create user
    const user = await User.create({
      username,
      role,
      usertype,
      password: hashedPassword,
    });
    if (user) {
      res.status(201).json({
        _id: user.id,
        name: user.username,
        role: user.role,
        token: generateToken(user._id),
      });
    } else {
      res.status(400);
      throw new Error("Invalid user data");
    }
  }
});
// @desc Authenticate a new user
// @ route POST /api/users/login
// @access public
const loginUser = asyncHandler(async (req, res) => {
  const { username, password} = req.body;
  //Check for username
  const user =  await User.findOneAndUpdate({username},{$inc:{logincount:1}},{new:true});
  console.log(user)
  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      user: {
        _id: user.id,
        name: user.username,
        role: user.role,
        logincount:user.logincount
      },
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid credentials");
  }
});
// @desc Change Default password
// @route Put /api/users/password
// @access private
const changedefaultPin = asyncHandler(async(req,res)=>{
  const {id, pin } = req.body;
  const salt = await bcrypt.genSalt(10);
  const hashedPin = await bcrypt.hash(pin, salt);
  
  try {
    console.log(hashedPin)
    const user = await User.findByIdAndUpdate(id,{password:hashedPin},{new:true,upsert:true})
    res.status(200).json({msg:true})
  } catch (error) {
    res.status(500).json({msg:error})
  }  
})

// @desc Update User
// @ route PUT /api/users/
// @access private
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndUpdate({_id:req.body._id},{usertype:req.body.usertype},{new:true})
  if(user){
    res.status(200).json({
      msg:'User Updated'
    })
  }
});

// @desc Get user data
// @ route GET /api/users/me
// @access private
const getMe = asyncHandler(async (req, res) => {
  const { _id, username } = await User.findById(req.user.id);
  res.status(200).json({
    id: _id,
    username,
  });
});

// @desc Get user data
// @ route DELETE /api/users/
// @access private
const deleteUser = asyncHandler(async (req, res) => {
 const deleted = await User.findByIdAndRemove({_id:req.body._id})
});


// Generate a jwt
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = {
  registerUser,
  loginUser,
  getUsers,
  getAdminUsers,
  updateUser,
  changedefaultPin,
  getMe,
  deleteUser
};
