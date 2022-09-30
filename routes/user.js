const express = require("express");
const usercontroller = require("../Controllers/user");
const router = express.Router();
const app = express();
const upload=require('../Config/multerConfig');
const db = require("../Config/dbconfig");
// const{ uploader, cloudinaryConfig } =require( './Config/cloudinaryConfig')
// console.log("USER  ROUTES\n\n");

// const auth=require('../Middleware/Auth');

// router.get('/secrets',auth,(req,res)=>{

//     res.render('../views/secrets.ejs')
// })
router.post("/register", upload.single("item"),usercontroller.signup);
router.post("/", upload.single("item"), async(req,res)=>{
    /* const blog1= await db.blog.create({title:"aaaa",content:"hello",imageurl: result.secure_url,
    cloudid: result.public_id,});
    const cat1=await db.cat.create
    const ass=reguser.addBlog(blog1); */
});
router.post("/login",usercontroller.login);

router.post("/followUser",usercontroller.followUser);

router.post("/unfollowUser",usercontroller.unfollowUser);

router.get("/getFollowers",usercontroller.getFollowers);
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

module.exports = router;
