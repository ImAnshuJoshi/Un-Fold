const express = require("express");
const blogcontroller = require("../Controllers/blog");
const router = express.Router();
const upload = require("../Config/multerConfig");
const app = express();
router.get("/blog/getAllBlogs", blogcontroller.getAllBlogs);
router.post("/addBlog", upload.single("item"), blogcontroller.addBlog);
router.get("/allUserBlogs",blogcontroller.getUserBlogs);
module.exports = router;
