const sequelize = require("./index");
const { DataTypes } = require("sequelize");

  const Comment = sequelize.define(
    "comments",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      content: {
        type: DataTypes.STRING,
      },
      likes:{
        type: DataTypes.INTEGER,
        defaultValue:0
      }
    },
    {
      freezeTableName: true,
    }
  );
  Comment.sync({ alter: true }).then(() => {
    console.log("yes re-sync done!");
  });
  module.exports=Comment;
