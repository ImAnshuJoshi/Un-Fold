const express = require('express')
const router = express.Router()
const cloudinary=require('../Config/cloudinaryConfig');
const upload = require('../Config/multerConfig')
const db = require('../Config/dbconfig')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

router.post('/register', upload.single('item'),  async (req, res, next) => {
    try {
      const result = await cloudinary.uploader.upload(req.file.path)
      let reguser
      reguser = await db.user.create({
        firstName: req.body.fname,
        lastName: req.body.lname,
        email: req.body.email,
        password: req.body.password,
        about: req.body.about,
        imageurl: result.secure_url,
        cloudid: result.public_id,
      })
      if (reguser) {
        const token = jwt.sign({ email: req.body.email, id: req.body.id }, process.env.secretstring, {
          expiresIn: '10h',
        })
        res.cookie("token",token);
        req.userid=reguser.id;
        res.status(200).json({
          user: reguser,
          message: 'User has been signed in!',
          token: token,
        })
      } else {
        res.status(400).json({
          message: 'Database error',
        }) 
      }
  
    } catch (e) {
      next(e)
    }
  })

router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body
    if (!email) {
      res.status(400).json({
        message: 'Email is empty',
      })
    }
    const currentuser = await db.user.findOne({ where: { email: email } })
    if (!currentuser) {
      res.status(400).json({
        message: 'User is not registered, Sign Up first',
      })
    } else {
      bcrypt.compare(password, currentuser.password, (err, result) => {
        //Comparing the hashed password
        if (err) {
          res.status(500).json({
            message: 'Server error',
          })
        } else {
          if (result) {
            const token = jwt.sign({ email: email, id: currentuser.id }, process.env.secretstring, {
              expiresIn: '10h',
            })
            res.cookie("token",token);
            req.userid=currentuser.id;
            res.status(200).json({  
              user: currentuser,
              message: 'User has been signed in!',
              token: token,
            })
          } else {
            res.status(400).json({ message: 'Enter correct password!' })
          }
        }
      })
    }
  } catch (err) {
    next(err)
  }
})

module.exports = router
