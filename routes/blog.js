const express = require('express')
const blogcontroller = require('../Controllers/blog')
const auth = require('../Middlewares/tokenauth')
const router = express.Router()
const upload = require('../Config/multerConfig')

router.delete('/deleteBlog', auth, blogcontroller.deleteBlog)

router.get('/getAllBlogs', auth, blogcontroller.getAllBlogs)

router.get('/getblogbyid', auth, blogcontroller.getblogbyid)

router.get('/allUserBlogs', auth, blogcontroller.getUserBlogs)

router.get('/getlikedusers', auth, blogcontroller.getlikedusers)

router.post('/addBlog', auth, upload.single('item'), blogcontroller.addBlog)

router.post('/addblogcategory', auth, blogcontroller.addblogcat)

router.put('/editBlog', auth, upload.single('item'), blogcontroller.editBlog)

router.put('/likeBlog', auth, blogcontroller.likeBlog)

router.put('/unlikeBlog', auth, blogcontroller.unlikeBlog)

module.exports = router
