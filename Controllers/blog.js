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
  const result = await cloudinary.uploader.upload(req.file.path);
  try {
    const user = await db.user.findOne({ where: { id: req.query.id } });
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
    const addedblog=await user.addPost(newb);
    await user.addBlog(newb);
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
    }
}



/* exports.addcat=async (req,res)=>{
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
    console.log(e);
    res.status(500).json({
      error: "Database error occurred!",
    });
  }
} */