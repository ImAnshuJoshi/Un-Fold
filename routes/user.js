const express = require('express')
const usercontroller = require('../Controllers/user')
const router = express.Router()
const upload = require("../Config/multerConfig");

router.get('/currentuser',usercontroller.user);

router.get('/getuserinfo',usercontroller.getuserinfo);

router.get('/getFollowingblogs', usercontroller.getFollowingblogs)

router.get('/getbookmarkedblogs', usercontroller.getbookmarkedblogs)

router.get('/getFollowers', usercontroller.getFollowers)

router.get('/getFollowing', usercontroller.getFollowing)

router.get('/getallusers',usercontroller.getallusers)

router.post('/followUser', /* require('../Middlewares/tokenauth'), */ usercontroller.followUser)

router.post('/unfollowUser', usercontroller.unfollowUser)

router.post('/bookmarkblog', usercontroller.bookmarkblog)

router.post('/unbookmarkblog', usercontroller.unbookmarkblog)

router.put('/editprofile',upload.single('item'),usercontroller.editprofile);

module.exports = router
