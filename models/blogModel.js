const sequelize = require("./index");
const { DataTypes } = require("sequelize");
const Blog = sequelize.define(
  "blogs",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
    },
    content: {
      type: DataTypes.STRING,
    },
    likes: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    freezeTableName: true,
  }
);
Blog.sync({ alter: true }).then(() => {
  console.log("yes Blog schema re-sync done!");
});

module.exports = Blog;
