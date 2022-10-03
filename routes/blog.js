const express = require("express");
const blogcontroller = require("../Controllers/blog");
const router = express.Router();
const upload = require("../Config/multerConfig");

router.get("/getAllBlogs", blogcontroller.getAllBlogs);
router.get("/allUserBlogs",blogcontroller.getUserBlogs);
router.post("/addBlog", upload.single("item"), blogcontroller.addBlog);
router.post("/addblogcategory",blogcontroller.addblogcontroller);
router.put("/editBlog",upload.single("item"),blogcontroller.editBlog);
module.exports = router;
