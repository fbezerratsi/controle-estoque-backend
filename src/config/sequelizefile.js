require('dotenv').config()

const db = process.env.DB_DATABASE
const h = process.env.DB_HOST
const us = process.env.DB_USERNAME
const ps = process.env.DB_PASSWORD
module.exports = {
    dialect: 'postgres',
    //logging: false,
    host: h,
    database: db,
    username: us,
    password: ps,
    define: {
        timestamps: true,
        underscored: true,
    },
    dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false // <<<<<<< YOU NEED THIS
        }
    }
}