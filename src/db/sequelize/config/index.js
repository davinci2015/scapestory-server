/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')

require('dotenv').config({path: path.resolve(__dirname, '../../../../.env')})

module.exports = {
    development: {
        url: process.env.DATABASE_URL,
        dialect: 'postgres',
    },
    production: {
        url: process.env.DATABASE_URL,
        dialect: 'postgres',
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false,
            },
        },
    },
}
