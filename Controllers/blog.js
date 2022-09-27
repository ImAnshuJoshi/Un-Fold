exports.getAllBlogs=async(req,res,next)=>{
    try{
      const Allblogs=await db.blogs.findAll({where:{}});
      if(!user){
        res.status(400).json({
          error: "No blogs Found",
        });
      }
      res.send(Allblogs);
    }catch(e)
    {
  
    }
  }