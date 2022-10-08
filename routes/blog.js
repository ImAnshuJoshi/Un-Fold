const express = require("express");
const blogcontroller = require("../Controllers/blog");
const router = express.Router();
const upload = require("../Config/multerConfig");

router.get("/getAllBlogs", blogcontroller.getAllBlogs);
router.get("/getblogbyid", blogcontroller.getblogbyid);
router.get("/allUserBlogs",blogcontroller.getUserBlogs);
router.post("/addBlog", upload.single("item"), blogcontroller.addBlog);
router.post("/addblogcategory",blogcontroller.addblogcat);
router.put("/editBlog",upload.single("item"),blogcontroller.editBlog);
router.put("/likeBlog",blogcontroller.likeBlog);
router.post("/addCategory", upload.single("item"),blogcontroller.addcat);
module.exports = router;
