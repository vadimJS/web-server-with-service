const userHandler = require('../handlers/users');

module.exports = {

    addUser: async (req, res) => {
        if (!req.body.name || !req.body.age) {
            res.json(`Request data not full! Body: ${req.body}`);
            return res.end();
        }

        let user = new userHandler(req.body);
        try {
            let userInfo = await user.add();
            res.json(userInfo);
            res.end(`New user successfully added!`);
        }
        catch (ex) {
            if (ex) {
                res.json(`Something went wrong while adding user. Error: ${ex}`);
                return res.end();
            }
        }

    },

    getUserById: async (req, res) => {
        if (!req.params.id) {
            res.json(`Request data not full!`);
            return res.end();
        }

        let user = new userHandler();

        let params = {
            id: req.params.id
        };
        try {
            let response = await user.getById(params);
            res.json(response);
            res.end();
        }
        catch (ex) {
            if (ex) {
                res.json(`Something went wrong while getting user by id. Error: ${ex}`);
                return res.end();
            }
        }
    },

    getList: async (req, res) => {
        let user = new userHandler();

        try {
            let response = await user.getList();
            res.json(response);
            res.end();
        }
        catch (ex) {
            if (ex) {
                res.json(`Something went wrong while getting users list. Error: ${ex}`);
                return res.end();
            }
        }
    },

    updateById: async (req, res) => {
        if (!req.body.name || !req.body.age || !req.params.id) {
            res.json(`Request data not full! Body: ${req.body}`);
            return res.end();
        }

        let user = new userHandler(req.body);

        try {

            let params = {
                id: req.params.id
            };

            let response = await user.update(params);
            res.end();
        }
        catch (ex) {
            if (ex) {
                res.json(`Something went wrong while updating user by id. Error: ${ex}`);
                return res.end();
            }
        }
    },

    deleteById: async (req, res) => {
        if (!req.params.id) {
            res.json(`Request data not full!`);
            return res.end();
        }

        let user = new userHandler();

        try {

            let params = {
                id: req.params.id
            };

            let response = await user.deleteById(params);
            res.end();
        }
        catch (ex) {
            if (ex) {
                res.json(`Something went wrong while deleting user by id. Error: ${ex}`);
                return res.end();
            }
        }
    }

};