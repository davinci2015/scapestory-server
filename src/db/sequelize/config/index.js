/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')

require('dotenv').config({path: path.resolve(__dirname, '../../../../.env')})

module.exports = {
    development: {
        url: process.env.DATABASE_URL,
        ssl: true,
        dialect: 'postgres',
        dialectOptions: {
            ssl: true,
        },
    },
    production: {
        url: process.env.DATABASE_URL,
        ssl: true,
        dialect: 'postgres',
        dialectOptions: {
            ssl: true,
        },
    },
}
