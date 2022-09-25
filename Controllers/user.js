const jwt = require("jsonwebtoken");
const db=require('../Config/dbconfig');
const cloudinary =require( '../Config/cloudinaryConfig')

exports.test = async (req, res, next) => {
  console.log(req.body);
 res.send(result.secure_url);
}
 

 exports.signup=async (req,res,next)=>{
    const result=await cloudinary.uploader.upload(req.file.path);
    let reguser;
    try{
       reguser=await db.user.create({
        firstName:req.body.fname,
        lastName:req.body.lname,
        email:req.body.email,
        password: req.body.password,
        about:req.body.about,
        imageurl:result.secure_url,
        cloudid: result.public_id,
      })
    }
    catch(e){
      res.send(e);
    }
    res.json(reguser)
    
  }


/* exports.login = (req, res, next) => {
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
