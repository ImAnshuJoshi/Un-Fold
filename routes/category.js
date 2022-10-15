const express = require('express')
const upload = require("../Config/multerConfig");
const usercontroller = require('../Controllers/user')
const router = express.Router()
const catcontrollers= require('../Controllers/category');
router.get('/getallcategories',catcontrollers.getallcategories);
router.get('/getallcategoryblogs',catcontrollers.getallcategoryblogs);
router.get('/getcategoryinfo',catcontrollers.getcategoryinfo);
router.get('/getblogcategories',catcontrollers.getblogcategories);
router.post('/addcategorytoblog',catcontrollers.addcategorytoblog);
router.post('/addcategory',upload.single("item"),catcontrollers.addcategory);
module.exports=router;