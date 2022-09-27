const express = require("express");
const blogcontroller = require("../Controllers/blog");
const router = express.Router();
const app = express();
router.get("/getAllBlogs",blogcontroller.getAllBlogs);
module.exports = router;
