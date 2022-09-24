const {Sequelize} = require('sequelize');

require('dotenv').config()

const sequelize = new Sequelize(
    process.env.DB_NAME, process.env.DB_CONNECTION, process.env.DB_PASSWORD, {
        host: 'localhost',
        dialect: 'postgres',
        operatorsAliases: false,

        pool: {
            max: 5,
            min: 0,
            idle: 10000

        }
    }
)
sequelize.authenticate()
.then(() => {
    console.log('connected..')
})
.catch(err => {
    console.log('Error'+ err)
})

module.exports=sequelize;
