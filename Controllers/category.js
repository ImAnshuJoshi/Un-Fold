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
    const cat = await db.cat.findOne({ where: { id: req.query.id } })
    res.status(200).send(cat)
  } catch (e) {
    next(e)
  }
}

exports.addcategorytoblog = async (req, res, next) => {
  try {
    const {cname,bid } = req.body
    cname.forEach(async (category)=>{
      console.log(category);
      const cat = await db.cat.findOne({ where: { Title: category } })
      await db.tag.create({
        b_id: bid,
        c_id: cat.dataValues.id,
      });
    })
    res.status(200).json({data:'done'})
  } catch (e) {
    next(e)
  }
}

exports.addcategory = async (req, res, next) => {
  try {
    
    const {cname,desc } = req.body65
    const cat= await db.cat.create({
      Title:cname,
      Description:desc
    })
    res.status(200).json({data:cat})
  } catch (e) {
    next(e)
  }
}

exports.getallcategoryblogs = async (req, res, next) => {
  const { id } = req.query
  try {
    const blogids = await db.tag.findAll({ where: { c_id: id } })
    const blogidsj= blogids.map((m)=>m.dataValues.b_id);
    console.log(blogidsj);
    const blogs= (await db.blog.findAll({where:{id:blogidsj}})).map((m)=>m.dataValues);
    res.status(200).send({blogs:blogs});
  } catch (e) {
    next(e)
  }
}

exports.getblogcategories = async (req, res, next) => {
  const { id } = req.query
  console.log('ss');
  try {
    const catids =( await (await db.tag.findAll({ where: { b_id: id } })).map((c)=>c.dataValues.c_id))
    console.log(catids);
    const catsdata=await (await db.cat.findAll({where:{id:catids}})).map((c)=>c.dataValues);
    console.log(catsdata);
    res.status(200).send({cats:catsdata});
  } catch (e) {
    next(e)
  }
}
