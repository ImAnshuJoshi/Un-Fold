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
    res.send(Allblogs.sort((a,b)=>b.updatedAt-a.updatedAt));
  } catch (e) { console.log(e)
    res.status(500).json({
      error: "Database error occurred!",
    });
  }
};
exports.addBlog = async (req, res, next) => {
  try {
    const r=req.body;
    if(!req.file||!r.title||!r.content)
    throw new Error("Please fill all entries!!");
    const result = await cloudinary.uploader.upload(req.file.path);
    console.log('id is ',req.query.id);
    const user = await db.user.findOne({ where: { id: req.query.id } });
    if (!user) {
      res.status(400).json({
        error: "No blogs Found!",
      });
    }
    const newb = await db.blog.create({
      title: req.body.title,
      content: req.body.content,
      imageurl: result.secure_url,
      cloudid: result.public_id,
    });
     await user.addPost(newb);
     const newblog= await db.blog.findOne({where:{userId:req.query.id}})
     console.log(newblog);
    res.status(200).json({ blogid: newblog.id });
  } catch (e) {
    console.log(e);
    next(e,res);
  }}

exports.getUserBlogs=async (req,res,next)=>{
  const {id}=req.query;
  try{
    const user=await db.user.findOne({where:{id:id}});
    console.log(user);
    const alluserblogs= await user.getPost();
    res.status(200).send(alluserblogs.sort((a,b)=>a.updatedAt-b.updatedAt));
    }
    catch(e)
    {
      console.log(e);
    res.status(500).json({
      error: "Database error occurred!",
    });
    }
}

exports.getblogbyid=async (req,res,next)=>{
  const {id}=req.query;
  try{
    const blog=await db.blog.findOne({where:{id:id}});
    res.status(200).json({blog});
    }
    catch(e)
    {
      console.log(e);
      next(e);
    }
    }

exports.addblogcat=async(req,res)=>{
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
  const {newtitle,newcontent}=req.body;
  const {id}=req.query;
  const result = (req.file)?await cloudinary.uploader.upload(req.file.path):null; 
  try{
    const upblog=(result)?await db.blog.update({
      title:newtitle,
      content:newcontent,
      imageurl:result.secure_url,
      cloudid:result.public_id
    },{
      where: {
        id: id
      }
    }):
    await db.blog.update({
      title:newtitle,
      content:newcontent,
    },{
      where: {
        id: id
      }
    })
    console.log(upblog);
    res.status(200).json({message:'blog edited successfully'});  
  }
    catch(e)
    {
      console.log(e);
    res.status(500).json({
      error: "Database error occurred!",
    });
    }
}

exports.likeBlog= async(req,res,next)=>{
  const {id}=req.body;
  console.log(req.body);
  try{
    const blog=await db.blog.findOne({where:{id:id}});
    const upblog=await db.blog.update({
      likes:blog.likes+1,
    },{
      where: {
        id: id
      }
    })
    console.log(blog);
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

exports.removelikeBlog= async(req,res,next)=>{
  const {id}=req.body;
  console.log(req.body);
  try{
    const blog=await db.blog.findOne({where:{id:id}});
    if(!blog.likes)
    res.status(400).json({error:"Cannot remove like for a post with 0 likes!"});
    const upblog=await db.blog.update({
      likes:blog.likes-1,
    },{
      where: {
        id: id
      }
    })
    console.log(blog);
    res.status(200).send(upblog);  
  }
    catch(e)
    {
      console.log(e);
    res.status(500).json({
      error: "Database error occurred!",
    });
  }}



exports.addcat=async (req,res)=>{
  try{
     const result = await cloudinary.uploader.upload(req.file.path);
      const {title,desc}=req.body;
      const newCat= await db.cat.create({
        Title:title,
        Description:desc,
        imageurl: result.secure_url,
        cloudid: result.public_id,
      })
      res.send(newCat);
      }
  catch(e){
    next(e);
  }
}

exports.getfollowingblogs=async (req,res,next)=>{
  
}