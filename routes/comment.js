const express = require('express')
const commentcontroller = require('../Controllers/comment')
const router = express.Router()
const auth = require('../Middlewares/tokenauth')

router.delete('/deletecomment', auth, commentcontroller.deletecomment)

router.get('/getComments', auth, commentcontroller.getcomments)

router.post('/addComment', auth, commentcontroller.addcomment)

module.exports = router
