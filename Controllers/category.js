const db = require("../Config/dbconfig");

exports.getallcategories=async(req,res,next)=>{
    try
    {
     const allcats=await db.cat.findAll({});
     res.send(allcats);
    }
    catch(e)
    {
        next(e);
    }
}

exports.addcategorytoblog=async(req,res,next)=>{
    try{
        const {bid,cid}=req.body;
        await db.tag.create({
            b_id:bid,
            c_id:cid
        });
        res.status(200).send("done");
    }
    catch(e)
    {next(e);}
}


exports.getallcategoryblogs=async(req,res,next)=>{
    const {id}=req.query;
    try
    {
     const blogids=await db.tag.findAll({where:{c_id:id}});
     
     let blogs=[];
     blogids.forEach(async (bl,index)=>{
        const b=await db.blog.findOne({where:{id:bl.dataValues.b_id}})
        // console.log(b.dataValues);    
        blogs.push(b.dataValues);
        console.log(blogs);
        // blogs=[...blogs,b.dataValues]
     }
     )
     blogs.sort((a,b)=>b.likes-a.likes),
     res.status(200).send(blogs)
    }
    catch(e)
    {
        next(e);
    }
}
