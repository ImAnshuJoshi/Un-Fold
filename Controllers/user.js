const jwt = require('jsonwebtoken')
const db = require('../Config/dbconfig')
const cloudinary = require('../Config/cloudinaryConfig')
const bcrypt = require('bcrypt')
const error = require('../Middlewares/error')
exports.test = async (req, res, next) => {
  console.log(req.body)
  res.send(result.secure_url)
}

exports.signup = async (req, res, next) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path)
    let reguser
    reguser = await db.user.create({
      firstName: req.body.fname,
      lastName: req.body.lname,
      email: req.body.email,
      password: req.body.password,
      about: req.body.about,
      imageurl: result.secure_url,
      cloudid: result.public_id,
    })
    res.json(reguser)
  } catch (e) {
    console.log(e);
    res.status(500).json({
      error: e.errors[0].message,
    })
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
}
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body
    if (!email) {
      res.status(400).json({
        error: 'Email is empty',
      })
    }
    const currentuser = await db.user.findOne({ where: { email: email } })
    if (!currentuser) {
      res.status(400).json({
        error: 'User is not registered, Sign Up first',
      })
    } else {
      bcrypt.compare(password, currentuser.password, (err, result) => {
        //Comparing the hashed password
        if (err) {
          res.status(500).json({
            error: 'Server error',
          })
        } else {
          if (result) {
            const token = jwt.sign({ email: email }, process.env.secretstring, {
              expiresIn: '10h',
            })
            res.cookie('token', token)
            res.status(200).json({
              user: currentuser,
              message: 'User has been signed in!',
              token: token,
            })
          } else {
            res.status(400).json({ error: 'Enter correct password!' })
          }
        }
      })
    }
  } catch (err) {
    error.next();
  }
}

exports.followUser = async (req, res, next) => {
  const { id1, id2 } = req.body
  try {
    const currentuser = await db.user.findOne({ where: { id: id1 } })
    const usertofollow = await db.user.findOne({ where: { id: id2 } })
    const newFollower = await currentuser.addFollowed(usertofollow)
    res.status(200).send(newFollower)
  } catch (e) {
    res.status(500).json({
      error: 'Database error occurred while signing in!',
    })
  }
}

exports.unfollowUser = async (req, res, next) => {
  const { id1, id2 } = req.body
  try {
    const currentuser = await db.user.findOne({ where: { id: id1 } })
    const usertounfollow = await db.user.findOne({ where: { id: id2 } })
    const unfolloweduser = await currentuser.removeFollowed(usertounfollow)
    res.status(200).send('Great Success!')
  } catch (e) {
    res.status(500).json({
      error: 'Database error occurred while signing in!',
    })
  }
}

exports.getFollowers = async (req, res, next) => {
  const { id } = req.query
  try {
    const currentuser = await db.user.findOne({ where: { id: id } })
    const FollowerList = await currentuser.getFollowed()
    res.status(200).send(FollowerList)
  } catch (e) {
    console.log(e)
    res.status(500).json({
      error: 'Database error occurred while signing in!',
    })
  }
}

exports.getFollowing = async (req, res, next) => {
  const { id } = req.query
  try {
    const currentuser = await db.user.findOne({ where: { id: id } })
    const FollowingList = await currentuser.getFollower()
    res.status(200).send(FollowingList)
  } catch (e) {
    console.log(e)
    res.status(500).json({
      error: 'Database error occurred while signing in!',
    })
  }
}

exports.bookmarkblog = async (req, res) => {
  try {
    const { uid, bid } = req.body
    const user = await db.user.findOne({ id: uid })
    const blog = await db.blog.findOne({ id: bid })
    const bmark = await blog.addBookmarker(user)
    res.status(200).send(bmark)
  } catch (e) {
    console.log(e)
    res.status(500).json({
      error: 'Database error occurred while signing in!',
    })
  }
}

exports.unbookmarkblog = async (req, res) => {
  try {
    const { uid, bid } = req.body
    const user = await db.user.findOne({ id: uid })
    const blog = await db.blog.findOne({ id: bid })
    const bmark = await blog.removeBookmarker(user)
    res.status(200).send("yo")
  } catch (e) {
    console.log(e)
    res.status(500).json({
      error: 'Database error occurred while signing in!',
    })
  }
}

exports.getuserinfo=async(req,res,next)=>{
  try{
    console.log(req.query);
    const user=await db.user.findOne({where:{id:req.query.id}});
    if(!user)
    res.status(400).json({error:"User not Found!!"});
    res.json({user:user});
  }
  catch(e)
  {
    next(e);
  }
}

exports.getallusers=async(req,res,next)=>{
  try{
    const users=await db.user.findAll({});
    res.status(200).json({user:users});
  }
  catch(e)
  {
    next(e);
  }
}
