//@ts-nocheck
const {Pool} = require('pg');
require('dotenv');
const { connectionString, ssl } = require('pg/lib/defaults');
DB_URL = process.env.DB_URL;


const pool = new Pool({
    connectionString : DB_URL,
    ssl:{
        rejectUnauthorized : false,
    },

});


module.exports = pool;