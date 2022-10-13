const User = require('../models/userModel')
const Blog = require('../models/blogModel')
const Comment = require('../models/commentModel')
const {Cat,Tag} = require('../models/categoryModel')
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

User.hasMany(Comment,{as:'Message'})
Comment.belongsTo(User,{as:'Commenter'})

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

User.belongsToMany(Blog, {
  as: 'likedblog',
  foreignKey: 'user_id',
  through: 'Likes',
})
Blog.belongsToMany(User, {
  as: 'Liker',
  foreignKey: 'blog_id',
  through: 'Likes',
})

sequelize.sync({ alter: true }).then(() => console.log('schemas updated and resynced'))

const db = { user: User, blog: Blog, comment: Comment, cat: Cat, tag:Tag }
module.exports = db
