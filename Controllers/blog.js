const cloudinary = require("../Config/cloudinaryConfig");
const db = require("../Config/dbconfig");
exports. getAllBlogs = async (req, res, next) => {
  try {
    const Allblogs = await db.blog.findAll({ where: {} });
    if (!Allblogs) {
      res.status(400).json({
        error: "No blogs Found",
      });
    }
    res.send(Allblogs);
  } catch (e) { console.log(e)
    res.status(500).json({
      error: "Database error occurred!",
    });
  }
};
exports.addBlog = async (req, res, next) => {
  const result = await cloudinary.uploader.upload(req.file.path);
  try {
    const user = await db.user.findOne({ where: { id: req.params.id } });
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
  const {id}=req.query;
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

exports.addblogcategory=async(req,res)=>{
  const{bid,cid}=req.body;
  try{
    const blog=db.blog.findOne({where:{id:bid}});
    const cat=db.cat.findOne({where:{id:cid}});
    await blog.addCat(cat);
    res.status(200).json("Category added successfully!");
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
  const {id,newcontent}=req.body;
  const result = (req.file)?await cloudinary.uploader.upload(req.file.path):null; 
  try{
    const upblog=(result)?await db.blog.update({
      content:newcontent,
      imageurl:result.secure_url,
      cloudid:result.public_id
    },{
      where: {
        id: id
      }
    }):
    await db.blog.update({
      content:newcontent,
    },{
      where: {
        id: id
      }
    })
    console.log(upblog);
    res.status(200).send(upblog);  
  }
    catch(e)
    {
      console.log(e);
    res.status(500).json({
      error: "Database error occurred!",
    });
    }
}