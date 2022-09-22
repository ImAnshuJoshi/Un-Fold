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
    content: {
      type: DataTypes.STRING,
    },
    likes: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    /* image:{
        
    } */
  },
  {
    freezeTableName: true,
  }
);
Blog.sync({ force: false }).then(() => {
  console.log("yes Blog schema re-sync done!");
});
module.exports = Blog;
//Deba is GO<MD
//asndfoaisfaiasnfas