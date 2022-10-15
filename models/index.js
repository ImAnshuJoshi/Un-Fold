const { Sequelize } = require('sequelize')
const db = require('../Config/dbconfig')

require('dotenv').config()

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_CONNECTION, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'postgres',
  operatorsAliases: false,

  pool: {
    max: 5,
    min: 0,
    idle: 10000,
  },
  logging: false,
})
sequelize.config.username = process.env.DB_USERNAME
sequelize
  .authenticate()
  .then(() => {
    console.log('connected..')
  })
  .catch((err) => {
    console.log('Error' + err)
  })

module.exports = sequelize
