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
const Tag = sequelize.define(
  "Tag",
  {
    b_id: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
    c_id: {
      type: DataTypes.UUID,
      primaryKey: true,
    }    
  },
  {
    freezeTableName: true,
  }
);
Tag.sync({ alter:true }).then(() => {
  console.log("yes re-sync done!\n\n");
});
Cat.sync({ alter:false }).then(() => {
  console.log("yes user re-sync done!\n\n");
});
module.exports = {Cat:Cat,Tag:Tag};
