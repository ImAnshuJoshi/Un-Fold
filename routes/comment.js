const express = require("express");
const commentcontroller = require("../Controllers/comment");
const router = express.Router();
router.delete('/deletecomment',commentcontroller.deletecomment);
router.get('/getComments',commentcontroller.getcomments);
router.post('/addComment',commentcontroller.addcomment);     
module.exports = router;