const http = require('http');
const express = require('express');
const config = require('./config/config.json');
const bodyParser = require('body-parser');
const userController = require('./controllers/users');

const app = express();

// parse application/json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


/**
 * Allow headers
 */
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


/**
 * Routes
 */
app.post('/user', userController.addUser);
app.get('/user/list', userController.getList);
app.get('/user/:id', userController.getUserById);
app.put('/user/:id', userController.updateById);
app.delete('/user/:id', userController.deleteById);



// Create HTTP server
const server = http.createServer(app);

// start HTTP
server.listen(config.app.port, function () {
    console.log('Server listening on port %d ', config.app.port);
});

