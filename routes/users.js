const database = require('../database/query');

let db = new database();

module.exports = {

    add: async (req, res) => {

        try {

            let sql = `INSERT INTO users (name, age) VALUES ($1, $2) RETURNING *;`;
            let user = await db.query(sql, [req.body.name, req.body.age]);
            res.send({user: user[0]});
            return res.end();

        }
        catch (e) {

            res.json(`Cannot add user to database. Error: ${e}`);
            return res.end();

        }

    },

    getById: async (req, res) => {
        try {
            let sql = `SELECT * FROM users WHERE id = $1;`;
            let user = await db.query(sql, [req.params.id]);
            res.send({user: user[0]});
            return res.end();

        }
        catch (e) {

            res.json(`Error while getting user details from DB: ${e}`);
            return res.end();

        }
    },

    getList: async (req, res) => {
        try {
            let sql = `SELECT * FROM users`;
            let users = await db.query(sql, []);
            res.send({users: users});
            return res.end();

        }
        catch (e) {

            res.json(`Error while getting users list from DB: ${e}`);
            return res.end();

        }
    },

    updateById: async (req, res) => {
        try {
            console.log('UPDATE ==> ',req.body, req.params);
            let sql = `UPDATE users SET name = $1, age = $2 WHERE id = $3`;
            let user = await db.query(sql, [req.body.name, req.body.age, req.params.id]);
            return res.end();

        }
        catch (e) {

            res.json(`Error while updating user from DB: ${e}`);
            return res.end();

        }
    },

    deleteById: async (req, res) => {
        try {
            let sql = `DELETE FROM users WHERE id = $1`;
            let user = await db.query(sql, [req.params.id]);
            return res.end();

        }
        catch (e) {

            res.json(`Error while deleting user from DB: ${e}`);
            return res.end();

        }
    }

};