const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const db=require('../Config/dbconfig');
const cloudinary =require( '../Config/cloudinaryConfig')
console.log("in CONTROLLERS\n\n\n\n");
exports.test = async (req, res, next) => {
  console.log(req.body);
  const result=await cloudinary.uploader.upload(req.file.path);
  res.send(result.secure_url);
}
  /*const cat1=await db.cat.create({
    Title:req.body.t,
    Description:req.body.desc,
    imageType: req.file.mimetype,
    imageName: req.file.originalname,
    ImageData: req.file.buffer
  }) */
  // res.send(cat1);
 

/* exports.signup=(req,res,next)=>{
    bcrypt.hash(req.body.password,10).then((hash)=>{
        const user=new User({
            email:req.body.username,
            password:hash
        });
    user.save().then(() => {
      console.log(req.body);
        return res.redirect('/login');
      })
      .catch((error) => {
        console.log(error);
      });
  });
};


exports.login = (req, res, next) => {
    console.log(req.body);
    User.findOne({ email: req.body.username }).then(async (user) => {
        if (!user)
            {console.log(`User ${req.body.username} not Found` );res.redirect('/login')}
        bcrypt.compare(req.body.password, user.password)
            .then((valid) => {
                if (!valid)
                    {console.log("Pamsword Emrror");
                    return res.redirect('/login');
                  }
                const token=  jwt.sign(
                    {useremail: user.email},
                    secretstring,
                    {
                        expiresIn:"10h",
                    }
                );
                res.cookie('token', token) 
                 return res.redirect('/secrets')
                })
                .catch((error) => {
                  return res.redirect('/login');
                });
            })
            .catch((error) => {
        
            });
        };
 */
