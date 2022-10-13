const db = require('../Config/dbconfig')

exports.addcomment=async (req,res,next)=>{
    try{
        const {uid,bid,com}=req.body;
        const user=await db.user.findOne({where:{id:uid}});
        const blog=await db.blog.findByPk(bid);
        const comment= (await db.comment.create({content:com})).dataValues;
        await blog.addComment(comment);
        await comment.addCommenter(user);
        res.status(200).json('done');
    }
    catch(e)
    {next(e);}
} 