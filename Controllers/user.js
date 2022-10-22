const db = require('../Config/dbconfig')
const cloudinary = require('../Config/cloudinaryConfig')
const error = require('../Middlewares/error')
exports.test = async (req, res, next) => {
  console.log(req.body)
  res.send(result.secure_url)
}

exports.user=(req,res,next)=>{
  res.send(req.userid);
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
    res.status(200).send(FollowerList.sort((a, b) => a.updatedAt - b.updatedAt))
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
    res.status(200).json({followingblogs:blogs.sort((a, b) => a.createdAt - b.createdAt)})
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

exports.editprofile = async (req, res, next) => {
  const { id,fname,lname,email,about } = req.body
  const result = req.file ? await cloudinary.uploader.upload(req.file.path) : null
  try {
    const newuser = result
    ? await db.user.update(
      {
        firstName: fname,
        lastName: lname,
        email:email,
        about: about,
        imageurl: result.secure_url,
        cloudid: result.public_id,
      },
      {
        where: {
          id: id,
        },
      }
    ): await db.user.update(
      {
        firstName: fname,
        lastName: lname,
        email:email,
        about: about,},
      {
        where: {
          id: id,
        },
      }
    ) 

    console.log(newuser)
    res.status(200).send(newuser)
  } catch (e) {
    console.log(e);
    next(e);
  }
}