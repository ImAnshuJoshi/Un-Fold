const sequelize=require('./index');
const { DataTypes} = require('sequelize');

module.exports= ()=>{
    const Comment=sequelize.define('comments',{
        id:{
            type:DataTypes.UUID,
            defaultValue:DataTypes.UUIDV4,
            primaryKey:true,
        },
        content:{
            type:DataTypes.STRING,
        },
        },
    {
        freezeTableName: true,
    }
    );
    Comment.sync({ force: false })
    .then(() => {
        console.log('yes re-sync done!')
    })
    return Comment;
}