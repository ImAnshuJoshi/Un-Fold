const express = require("express");
// const path=require('path')
const usercontroller = require("../Controllers/user");
const router = express.Router();
const app = express();
const User = require("../models/userModel");
const Blog = require("../models/blogModel");

const multer = require("multer");

console.log("USER  ROUTES\n\n");

// const auth=require('../Middleware/Auth');

// router.get('/secrets',auth,(req,res)=>{

//     res.render('../views/secrets.ejs')
// })
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/img");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + " " + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post("/", upload.single("item"), usercontroller.test);
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
