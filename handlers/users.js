const request = require ('request');

module.exports = class User {

    constructor (data = {}) {
        this.name = data.name;
        this.age = data.age;
    }

    add () {
        let data = {
            name: this.name,
            age: this.age
        };

        let params = {
            url: `http://10.10.12.52:3315/user`,
            json: data
        };

        return new Promise(
            (resolve, reject) => {
                request.post(params, (err, response) => {
                    if (err) return reject(err);

                    return resolve(response.body.user);
                });
            }
        );
    }

    getById (params) {
        let requestParams = {
           url: `http://10.10.12.52:3315/user/${params.id}`
        };
        return new Promise(
            (resolve, reject) => {
                request.get(requestParams, (err, response) => {
                    if (err) return reject(err);

                    return resolve(JSON.parse(response.body).user);
                });
            }
        );
    }

    getList () {
        let requestParams = {
            url: `http://10.10.12.52:3315/user/list`
        };
        return new Promise(
            (resolve, reject) => {
                request.get(requestParams, (err, response) => {
                    if (err) return reject(err);

                    return resolve(JSON.parse(response.body).users);
                });
            }
        );
    }

    update (params) {
        let userData = {
            name: this.name,
            age: this.age
        };

        let requestParams = {
            url: `http://10.10.12.52:3315/user/${params.id}`,
            json: userData
        };
        return new Promise(
            (resolve, reject) => {
                request.put(requestParams, (err, response) => {
                    if (err) return reject(err);

                    return resolve();
                });
            }
        );
    }

    deleteById (params) {
        let requestParams = {
            url: `http://10.10.12.52:3315/user/${params.id}`
        };
        return new Promise(
            (resolve, reject) => {
                request.delete(requestParams, (err, response) => {
                    if (err) return reject(err);

                    return resolve();
                });
            }
        );
    }

};