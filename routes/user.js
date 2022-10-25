const express = require('express')
const usercontroller = require('../Controllers/user')
const router = express.Router()
const upload = require("../Config/multerConfig");
const auth = require('../Middlewares/tokenauth');

router.get('/currentuser',auth ,usercontroller.user);

router.get('/getuserinfo',auth ,usercontroller.getuserinfo);

router.get('/getFollowingblogs',auth , usercontroller.getFollowingblogs)

router.get('/getbookmarkedblogs',auth , usercontroller.getbookmarkedblogs)

router.get('/getFollowers',auth ,usercontroller.getFollowers)

router.get('/getFollowing',auth ,usercontroller.getFollowing)

router.get('/getallusers',auth ,usercontroller.getallusers)

router.post('/followUser',auth ,usercontroller.followUser)

router.post('/unfollowUser',auth ,usercontroller.unfollowUser)

router.post('/bookmarkblog',auth ,usercontroller.bookmarkblog)

router.post('/unbookmarkblog',auth ,usercontroller.unbookmarkblog)

router.put('/editprofile',auth ,upload.single('item'),usercontroller.editprofile);

module.exports = router
