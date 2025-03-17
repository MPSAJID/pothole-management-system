//@ts-nocheck
const {Pool} = require('pg');
require('dotenv').config();
DB_URL = process.env.DB_URL;


const pool = new Pool({
    user:process.env.DB_USER,
    host:process.env.DB_HOST,
    database:process.env.DB_DB,
    password:process.env.DB_PASSWORD,
    port:process.env.DB_PORT

});

pool.on('error', (err) => {
    console.error('Unexpected error on idle client', err);
    process.exit(-1);
});


module.exports = pool;