const { Pool, Client } = require('pg');
const config = require('../config/config.json');

module.exports = class db {
    async query (sql, params, cb) {
        const pool = new Pool(config.psql);

        let res = await pool.query(sql, params);
        return res.rows;
    };
};




