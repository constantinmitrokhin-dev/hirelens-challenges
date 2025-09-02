
const express = require("express");
const cors = require("cors");
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const routes = require('./services/index.js');

const server = express();
server.name = 'Backend Server Ensolvers';

server.use(cors());
server.use(express.json());
server.use(bodyParser.urlencoded({extended: true, limit: '50mb'}));
server.use(bodyParser.json({limit: '50mb'}));
server.use(cookieParser());
server.use(morgan('dev'));
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Credentials', 'true');
  // eslint-disable-next-line max-len
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, token, id, storename, user_email');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
  next();
});

server.use('/', routes);

server.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
	const status = err.status || 500;
	const message = err.message || err;
	res.status(status).send(message);
});

module.exports = server;

