//jshint esversion:6
const express = require('express')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
const path = require('path')
const cookieparser = require('cookie-parser')
const slashRoutes = require('./routes/slash')
const userRoutes = require('./routes/user')
const blogRoutes = require('./routes/blog')
const commentRoutes = require('./routes/comment')
const categoryRoutes = require('./routes/category')
const { error } = require('./Middlewares/error')
const cors = require('cors')
dotenv.config()

const app = express()

app.use(cookieparser())
app.use(
  cors({})
)
app.use(express.static('public'))

app.set('views', path.join(__dirname, 'views'))

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.use(express.json())
app.use(express.static('public'))

app.get('/', (_, res) => {
  res.redirect('/login-signup')
})
app.use('/api', slashRoutes)
app.use('/api/blog', blogRoutes)
app.use('/api/user', userRoutes)
app.use('/api/comment', commentRoutes)
app.use('/api/category', categoryRoutes)
app.use(require('./Middlewares/error'))
app.listen(3000, function () {
  console.log('Server is Running')
})
