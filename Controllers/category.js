const sequelize = require("./index");
const { Sequelize, DataTypes } = require("sequelize");
const Cat = sequelize.define(
  "categories",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    Title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    imageurl: DataTypes.STRING,
    cloudid: DataTypes.STRING,
    
  },
  {
    freezeTableName: true,
  }
);
Cat.sync({ alter: true }).then(() => {
  console.log("yes user re-sync done!\n\n");
});
module.exports = Cat;
//Deba is GoD