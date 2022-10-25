const express = require('express')
const upload = require('../Config/multerConfig')
const router = express.Router()
const catcontrollers = require('../Controllers/category')

router.get('/getallcategories', catcontrollers.getallcategories)

router.get('/getallcategoryblogs', catcontrollers.getallcategoryblogs)

router.get('/getcategoryinfo', catcontrollers.getcategoryinfo)

router.get('/getblogcategories', auth, catcontrollers.getblogcategories)

router.post('/addcategorytoblog', auth, catcontrollers.addcategorytoblog)

router.post('/addcategory', upload.single('item'), catcontrollers.addcategory)

module.exports = router
