const User = require("../models/userModel");
const Blog = require("../models/blogModel");
const Comment = require("../models/commentModel");
const Cat=require("../models/categoryModel");
const sequelize = require("../models/index");

User.hasMany(Blog,{foriegnKey:'author'});
Blog.belongsTo(User);

User.belongsToMany(User, {
  as: "User",
  foreignKey: "user_id",
  through: "Follow",
});
User.belongsToMany(User, {
  as: "Followed",
  foreignKey: "followed_id",
  through: "Follow",
});

Blog.hasMany(Comment);
Comment.belongsTo(Blog);

User.hasMany(Comment);
Comment.belongsTo(User);

Blog.belongsToMany(Cat, {
  as: "Blog",
  foreignKey: "blog_id",
  through: "Tag",
});
Cat.belongsToMany(Blog, {
  as: "Category",
  foreignKey: "cat_id",
  through: "Tag",
});

User.belongsToMany(Blog, {
  as: "user",
  foreignKey: "user_id",
  through: "bookmarks",
});
Blog.belongsToMany(User, {
  as: "post",
  foreignKey: "blog_id",
  through: "bookmarks",
});

sequelize
  .sync({ alter: true })
  .then(() => console.log("schemas updated and resynced"));


const db={user:User,blog:Blog,comment:Comment,cat:Cat};
module.exports=db;