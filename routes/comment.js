const express = require("express");
const commentcontroller = require("../Controllers/comment");
const router = express.Router();
router.post('/addComment',commentcontroller.addcomment);
module.exports = router;