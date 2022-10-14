const express = require('express')
const usercontroller = require('../Controllers/user')
const router = express.Router()
const catcontrollers= require('../Controllers/category');
router.get('/getallcategories',catcontrollers.getallcategories);
router.get('/getallcategoryblogs',catcontrollers.getallcategoryblogs);
router.get('/getcategoryinfo',catcontrollers.getcategoryinfo);
router.get('/getblogcategories',catcontrollers.getblogcategories);
router.post('/addcategorytoblog',catcontrollers.addcategorytoblog);
router.post('/addcategory',catcontrollers.addcategory);
module.exports=router;