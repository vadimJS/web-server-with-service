const http = require('http');
const express = require('express');
const config = require('./config/config.json');
const bodyParser = require('body-parser');
const userRout = require('./routes/users');

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
app.post('/user', userRout.add);
app.get('/user/list', userRout.getList);
app.get('/user/:id', userRout.getById);
app.put('/user/:id', userRout.updateById);
app.delete('/user/:id', userRout.deleteById);


// Create HTTP server
const server = http.createServer(app);

// start HTTP
server.listen(config.service.port, function () {
    console.log('Server listening on port %d ', config.service.port);
});

