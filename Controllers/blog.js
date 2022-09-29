const cloudinary = require("../Config/cloudinaryConfig");
const db = require("../Config/dbconfig");
exports.getAllBlogs = async (req, res, next) => {
  try {
    const Allblogs = await db.blogs.findAll({ where: {} });
    if (!user) {
      res.status(400).json({
        error: "No blogs Found",
      });
    }
    res.send(Allblogs);
  } catch (e) {
    res.status(500).json({
      error: "Database error occurred!",
    });
  }
};
exports.addBlog = async (req, res, next) => {
  const result = await cloudinary.uploader.upload(req.file.path);
  try {
    const user = await db.user.findOne({ where: { id: req.body.id } });
    if (!user) {
      res.status(400).json({
        error: "No blogs Found!",
      });
    }
    console.log(req.body, result);
    const newb = await db.blog.create({
      title: req.body.title,
      content: req.body.content,
      imageurl: result.secure_url,
      cloudid: result.public_id,
    });
    user.addBlog(newb);
    res.status(200).json({ message: "Added Blog!" });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      error: "Database error occurred!",
    });
  }
};
