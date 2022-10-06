const db = require('../Config/dbconfig')

exports.getallcategories = async (req, res, next) => {
  try {
    const allcats = await db.cat.findAll({})
    res.send(allcats)
  } catch (e) {
    next(e)
  }
}

exports.getcategoryinfo = async (req, res, next) => {
    try {
      const cat = await db.cat.findOne({where:{id:req.query.id}})
      res.status(200).send(cat)
    } catch (e) {
      next(e)
    }
  }

exports.addcategorytoblog = async (req, res, next) => {
  try {
    const { bid, cid } = req.body
    await db.tag.create({
      b_id: bid,
      c_id: cid,
    })
    res.status(200).send('done')
  } catch (e) {
    next(e)
  }
}

async function findAllblogs(blogids)
{
    let blogs=[]
    for(let bid of blogids)
    {
        const blog=await db.blog.findByPk(bid.dataValues.b_id);
        blogs.push(blog);
    }
    return blogs;
}


exports.getallcategoryblogs = async (req, res, next) => {
  const { id } = req.query
  try {
    const blogids = await db.tag.findAll({ where: { c_id: id } })
    findAllblogs(blogids).then((blogs)=>{
        let blogdata=[];
        blogs.forEach((b)=>{
            blogdata.push(b.dataValues);
            blogdata.sort((a,b)=>b.likes-a.likes)
        })
        res.status(200).send(blogdata);
    });    
  } catch (e) {
    next(e)
  }
}
