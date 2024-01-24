const { Pool } = require('pg');
require('dotenv').config();


const pool = new Pool({
    connectionString: process.env.DATABASE_PRIVATE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});


module.exports = {
    query: (text, params, callback) => pool.query(text, params, callback),
};