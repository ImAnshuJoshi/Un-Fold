const express = require('express')
const usercontroller = require('../Controllers/user')
const router = express.Router()
const catcontrollers= require('../Controllers/category');
router.get('/getallcategories',catcontrollers.getallcategories);
router.get('/getallcategoryblogs',catcontrollers.getallcategoryblogs);
router.post('/addcategorytoblog',catcontrollers.addcategorytoblog);
module.exports=router;