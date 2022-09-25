const express = require("express");
const usercontroller = require("../Controllers/user");
const router = express.Router();
const app = express();
const upload=require('../Config/multerConfig');
// const{ uploader, cloudinaryConfig } =require( './Config/cloudinaryConfig')
// console.log("USER  ROUTES\n\n");

// const auth=require('../Middleware/Auth');

// router.get('/secrets',auth,(req,res)=>{

//     res.render('../views/secrets.ejs')
// })

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
