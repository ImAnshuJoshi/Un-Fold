const express = require("express");
const commentcontroller = require("../Controllers/comment");
const router = express.Router();
router.get('/getComments',commentcontroller.getcomments);
router.post('/addComment',commentcontroller.addcomment);     
module.exports = router;