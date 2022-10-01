const express = require('express')
const usercontroller = require('../Controllers/user')
const router = express.Router()
const app = express()
const upload = require('../Config/multerConfig')
const db = require('../Config/dbconfig')
// const{ uploader, cloudinaryConfig } =require( './Config/cloudinaryConfig')

router.post('/register', upload.single('item'), usercontroller.signup)

router.post('/login', usercontroller.login)

router.get('/getuserinfo',usercontroller.getuserinfo);

router.post('/followUser', require('../Middlewares/tokenauth'), usercontroller.followUser)

router.post('/unfollowUser', usercontroller.unfollowUser)

router.post('/bookmarkblog', usercontroller.bookmarkblog)

router.get('/getFollowers', usercontroller.getFollowers)
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
