const sequelize = require("./index");
const { Sequelize, DataTypes } = require("sequelize");
const User = sequelize.define(
  "users",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      validate: { isEmail: true },
      unique: {
        args: true,
        msg: "Email address already in use!",
      },
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: { msg: "Please provide a password" },
        validatePassword: function (password) {
          if (
            !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{5,12}$/.test(
              password
            )
          ) {
            throw new Error(
              "The password must contain at least 5 and maximum 12 characters including at least 1 uppercase, 1 lowercase, one number and one special character."
            );
          }
        },
      },
    },
    about: {
      type: DataTypes.STRING,
    },
    imageType: DataTypes.STRING,
    imageName: DataTypes.STRING,
    imageData: DataTypes.BLOB("long"),
  },
  {
    freezeTableName: true,
  }
);
User.sync({ alter: true }).then(() => {
  console.log("yes user re-sync done!\n\n");
});
module.exports = User;