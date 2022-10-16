const express = require('express')
const usercontroller = require('../Controllers/user')
const router = express.Router()
const upload = require('../Config/multerConfig')
// const{ uploader, cloudinaryConfig } =require( './Config/cloudinaryConfig')

router.post('/register', upload.single('item'), usercontroller.signup)

router.get('/currentuser',usercontroller.user);

router.post('/login', usercontroller.login)

router.get('/getuserinfo',usercontroller.getuserinfo);

router.post('/followUser', /* require('../Middlewares/tokenauth'), */ usercontroller.followUser)

router.post('/unfollowUser', usercontroller.unfollowUser)

router.post('/bookmarkblog', usercontroller.bookmarkblog)

router.post('/unbookmarkblog', usercontroller.unbookmarkblog)

router.get('/getFollowingblogs', usercontroller.getFollowingblogs)

router.get('/getbookmarkedblogs', usercontroller.getbookmarkedblogs)

router.get('/getFollowers', usercontroller.getFollowers)

router.get('/getFollowing', usercontroller.getFollowing)

router.get('/getallusers',usercontroller.getallusers)
// router.get('/register',(req,res)=>{
//     res.render("../views/register.ejs");
// }
// )
// router.get('/login',(req,res)=>res.render("../views/login.ejs"));
// router.post('/register',usercontroller.signup);
// router.post('/login',usercontroller.login);
// router.get('/logout',auth,(req,res)=>{
//     res.clearCookie('token');
//     res.redirect('/');
// });

module.exports = router
