const express = require("express");
// const path=require('path')
const usercontroller = require("../Controllers/user");
const router = express.Router();
const app = express();
const User = require("../models/userModel");
const Blog = require("../models/blogModel");

console.log("USER  ROUTES\n\n");
// const auth=require('../Middleware/Auth');

// router.get('/secrets',auth,(req,res)=>{

//     res.render('../views/secrets.ejs')
// })

router.get("/", usercontroller.test);
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

//this is anshu comment

<<<<<<< HEAD
//this is anshu comment

//Fuck Anshuṁnbkjgyiu
=======
//Bruh
>>>>>>> e0a362214df1676e05a7b1c31badabdb07c746e7
