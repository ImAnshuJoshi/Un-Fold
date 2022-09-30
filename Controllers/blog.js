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
    const addedblog=user.addBlogs(newb);
    res.status(200).json({ message: "Added Blog!" });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      error: "Database error occurred!",
    });
  }
};
exports.getUserBlogs=async (req,res,next)=>{
  const {id}=req.body;
  try{
    const user=await db.user.findOne({where:{id:id}});
    console.log(user);
    const alluserblogs= await user.getBlogs();
    res.status(200).send(alluserblogs);
    }
    catch(e)
    {
      console.log(e);
    res.status(500).json({
      error: "Database error occurred!",
    });
    }
}

exports.editBlog= async(req,res,next)=>{
  const {id}=req.body;
  try{
    const blog=await db.blog.findOne({where:{id:id}});
    console.log(blog);
    }
    catch(e)
    {
      console.log(e);
    res.status(500).json({
      error: "Database error occurred!",
    });
    }
}