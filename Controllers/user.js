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
    if (reguser) {
      const token = jwt.sign({ email: req.body.email, id: req.body.id }, process.env.secretstring, {
        expiresIn: '10h',
      })
      const currentuser= await reguser.json();
      res.status(200).json({
        user: currentuser,
        message: 'User has been signed in!',
        token: token,
      })
    } else {
      res.status(400).json({
        message: 'Database error',
      }) 
    }
  } catch (e) {
    next(e)
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
        message: 'Email is empty',
      })
    }
    const currentuser = await db.user.findOne({ where: { email: email } })
    if (!currentuser) {
      res.status(400).json({
        message: 'User is not registered, Sign Up first',
      })
    } else {
      bcrypt.compare(password, currentuser.password, (err, result) => {
        //Comparing the hashed password
        if (err) {
          res.status(500).json({
            message: 'Server error',
          })
        } else {
          if (result) {
            const token = jwt.sign({ email: email, id: currentuser.id }, process.env.secretstring, {
              expiresIn: '10h',
            })
            res.status(200).json({
              user: currentuser,
              message: 'User has been signed in!',
              token: token,
            })
          } else {
            res.status(400).json({ message: 'Enter correct password!' })
          }
        }
      })
    }
  } catch (err) {
    next(err)
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

exports.getFollowingblogs = async (req, res, next) => {
  const { id } = req.query
  try {
    const currentuser = await db.user.findOne({ where: { id: id } })
    const FollowingList = (await currentuser.getFollower({attributes:['id']})).map((m)=>m.id);
    const blogs= await db.blog.findAll({where:{userId:FollowingList},order:[['updatedAt','DESC']]})
    res.status(200).json({followingblogs:blogs})
  } catch (e) {
    next(e);
  }
}

exports.bookmarkblog = async (req, res) => {
  try {
    const { uid, bid } = req.body
    const user = await db.user.findOne({ where:{id: uid }})
    const blog = await db.blog.findOne({ where:{id: bid }})
    const bmark = await blog.addBookmarker(user)
    res.status(200).json({bblog:bmark})
  } catch (e) {
    console.log(e)
    next(e)
  }
}

exports.unbookmarkblog = async (req, res,next) => {
  try {
    const { uid, bid } = req.body
    const user = await db.user.findOne({ where:{id: uid }})
    const blog = await db.blog.findOne({ where:{id: bid }})
    const bmark = await blog.removeBookmarker(user)
    res.status(200).json({message:'removed bookmark'});
  } catch (e) {
    console.log(e)
    next(e)
  }
}

exports.getbookmarkedblogs= async(req,res,next)=>{
  try{
    const {id}=req.query;
    const bids= await db.blog.findAll({
      include:{model:db.user, as:'Bookmarker',
      where:{id:id}
    }
    });
    res.status(200).json({bblogs:bids});
  }
  catch(e)
  {next(e)}
}

exports.getuserinfo = async (req, res, next) => {
  try {
    console.log(req.query)
    const user = await db.user.findOne({ where: { id: req.query.id } })
    if (!user) res.status(400).json({ error: 'User not Found!!' })
    res.json({ user: user })
  } catch (e) {
    next(e)
  }
}

exports.getallusers = async (req, res, next) => {
  try {
    const users = await db.user.findAll({})
    res.status(200).json({ user: users })
  } catch (e) {
    next(e)
  }
}
