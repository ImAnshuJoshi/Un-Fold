const jwt = require("jsonwebtoken");
const db = require("../Config/dbconfig");
const cloudinary = require("../Config/cloudinaryConfig");
const bcrypt = require("bcrypt");
const error=require('../util/error');
exports.test = async (req, res, next) => {
  console.log(req.body);
  res.send(result.secure_url);
};

exports.signup = async (req, res, next) => {
  const result = await cloudinary.uploader.upload(req.file.path);
  let reguser;
  try {
    reguser = await db.user.create({
      firstName: req.body.fname,
      lastName: req.body.lname,
      email: req.body.email,
      password: req.body.password,
      about: req.body.about,
      imageurl: result.secure_url,
      cloudid: result.public_id,
    });
  } catch (e) {
    res.status(500).json({
      error: "Database error occurred while signing in!",
    });
  }
  /* const u2=await db.user.create({
    firstName: 'AAAA',
      lastName: 'req.body.lname',
      email: 'a@a.com',
      password: req.body.password,
      about: req.body.about,
      imageurl: result.secure_url,
      cloudid: result.public_id,
  })
  const newu=reguser.addUser(u2); 
  Method of adding in many to many tables
  */

  res.json(reguser);
};
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if(!email)
    {
      res.status(400).json({
        error: "Email is empty",
      });
    }
    const currentuser = await db.user.findOne({ where: { email: email } });
    if (!currentuser) {
      res.status(400).json({
        error: "User is not registered, Sign Up first",
      });
    } else {
      bcrypt.compare(password, currentuser.password, (err, result) => {   //Comparing the hashed password
        if (err) {
          res.status(500).json({
            error: "Server error",
          });
        } else {
          if (result) {
            const token = jwt.sign({ email: email }, process.env.secretstring, {
              expiresIn: "10h",
            });
            res.cookie("token", token);
            res.status(200).json({
              user:currentuser,
              message: "User has been signed in!",
              token: token,
            });
          } else {
            res.status(400).json({ error: "Enter correct password!" });
          }
        }
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "Database error occurred while signing in!",
    });
  }
};

exports.followUser= async(req,res,next)=>{
  const {id1,id2}=req.body;
  try{
    const currentuser=await db.user.findOne({where:{id:id1}});
    const usertofollow=await db.user.findOne({where:{id:id2}});
    const newFollower=await currentuser.addUser(usertofollow);
    res.status(200).send(newFollower);
  }
  catch(e){
    res.status(500).json({
      error: "Database error occurred while signing in!",
    });
  }
}

exports.unfollowUser= async(req,res,next)=>{
  const {id1,id2}=req.body;
  try{
    const currentuser=await db.user.findOne({where:{id:id1}});
    const usertounfollow=await db.user.findOne({where:{id:id2}});
    const unfolloweduser=await currentuser.removeUser(usertounfollow);
    res.status(200).send("Great Success!");
  }
  catch(e){
    res.status(500).json({
      error: "Database error occurred while signing in!",
    });
  }
}

exports.getFollowers=async(req,res,next)=>{
  const {id}=req.body;
  try{
    const currentuser=await db.user.findOne({where:{id:id}});
    const FollowerList=await currentuser.getUser();
    res.status(200).send(FollowerList);
  }
  catch(e){
    console.log(e);
    res.status(500).json({
      error: "Database error occurred while signing in!",
    });
  }
}


