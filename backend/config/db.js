//@ts-nocheck
const {Pool} = require('pg');
require('dotenv').config();
const { connectionString, ssl, database, password, host } = require('pg/lib/defaults');
DB_URL = process.env.DB_URL;


const pool = new Pool({
    user:process.env.DB_USER,
    host:process.env.DB_HOST,
    database:process.env.DB_DB,
    password:process.env.DB_PASSWORD,
    port:process.env.DB_PORT

});


module.exports = pool;