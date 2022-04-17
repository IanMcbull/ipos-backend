const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const Org = require("../models/organizationModel");
const User =  require("../models/UserModel");
// const createDb = require("../utils/createDb")
// @desc Register a new organization
// @ route POST /api/organization
// @access public
const registerOrg = asyncHandler(async (req, res) => {
    const { organization_name, email, password } = req.body;
    if (!organization_name || !password || !email) {
      res.status(400);
      throw new Error("Please add all the fields");
    }
    // Check if the user exists
    const orgExists = await Org.findOne({ email });
    //console.log(userExists)
    if (orgExists) {
      res.status(400);
      throw new Error("Organization already exists");
    } else {
      //Create new Mongodb Database
      //  createDb(organization_name)
      //  .then(console.log)
      //  .catch(console.log)
      //hash the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      //create Organization
      const org = await Org.create({
        organization_name,
        email,
        password: hashedPassword,
      });
      if (org) {
        res.status(201).json({
          _id: org.id,
          name: org.organization_name,
          email: org.email,
          token: generateToken(org._id),
        });
      } else {
        res.status(400);
        throw new Error("Invalid organization data");
      }
    }
  });

// @desc Authenticate an Organization
// @ route POST /api/org/login
// @access public
const loginOrg = asyncHandler(async (req, res) => {
    const { organization_name, password,  username} = req.body;
    // const database = await connectDb(organization_name.replace(/\s+/g, ''))
    const user = await User.findOne({ username });
    if(user.usertype === 'Admin'){
      if (user && (await bcrypt.compare(password, user.password))) {
        res.json({
          user: {
            _id: user.id,
            name: user.username,
            role: user.role,
            org_name:user.org_name
          },
          token: generateToken(user._id),
        });
      } else {
        res.status(400);
        throw new Error("Invalid credentials");
      }
    }else{
      res.status(401).json({
        msg:'You are not authorized. Please get in touch with your admin to acquire the necessary privilages.'
      })
    }
    
  });

  // Generate a jwt
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });
  };

  module.exports = {
   registerOrg,
   loginOrg   
  }