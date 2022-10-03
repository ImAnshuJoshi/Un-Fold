const User = require('../models/userModel')
const Blog = require('../models/blogModel')
const Comment = require('../models/commentModel')
const Cat = require('../models/categoryModel')
const sequelize = require('../models/index')

User.hasMany(Blog, { as: 'Post' })
Blog.belongsTo(User, { as: 'Writer' })

User.belongsToMany(User, {
  as: 'Follower',
  foreignKey: 'user_id',
  through: 'Follow',
})
User.belongsToMany(User, {
  as: 'Followed',
  foreignKey: 'followed_id',
  through: 'Follow',
})

Blog.hasMany(Comment,{as:'Comment'})
Comment.belongsTo(Blog,{as:'Log'});

User.hasMany(Comment,{as:'discussion'})
Comment.belongsTo(User,{as:'Commenter'})

Blog.belongsToMany(Cat, {
  as: 'Cat',
  foreignKey: 'blog_id',
  through: 'Tag',
})
Cat.belongsToMany(Blog, {
  as: 'Blog',
  foreignKey: 'cat_id',
  through: 'Tag',
})

User.belongsToMany(Blog, {
  as: 'bookmarkedblog',
  foreignKey: 'user_id',
  through: 'bookmarks',
})
Blog.belongsToMany(User, {
  as: 'Bookmarker',
  foreignKey: 'blog_id',
  through: 'bookmarks',
})

sequelize.sync({ alter: true }).then(() => console.log('schemas updated and resynced'))

const db = { user: User, blog: Blog, comment: Comment, cat: Cat }
module.exports = db
