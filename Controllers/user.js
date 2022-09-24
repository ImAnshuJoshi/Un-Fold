const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const db=require('../Config/config');

console.log("in CONTROLLERS\n\n\n\n");

exports.test = async (req, res, next) => {
  // await User.create({
  //   firstName: 'bc',
  //   lastName: 'dcc',
  //   email:'a@1a.com'
  //   password:'Bee@28292'
  // });
  // const user=await User.findOne({ where: {email: 'a@1a.com' } });
  // await Blog.create({content:'HEJDNFJKAFKASNKJFSAKJFJKSAJFKAS',userId:user.id})
  // await Blog.create({content:'dkfka sakafk gfde3  33 f df d ',userId:user.id})
  // // console.log(user);
  db.blog.findAll().then((data) => res.send(data));
  // // const blog= await Blog.create({})
  // console.log("hello"+users);
  // res.send(user.id);
};

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
