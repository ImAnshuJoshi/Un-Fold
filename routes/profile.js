const express = require('express')
const profilecontroller = require('../Controllers/profile')
const router = express.Router()
const upload = require('../Config/multerConfig')

router.put('/editprofile',upload.single('item'),profilecontroller.editprofile);

module.exports=router;