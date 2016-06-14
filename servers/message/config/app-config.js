const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan      = require('morgan');


app.use(morgan('dev'));

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use(function(req, res, next){
	res.setHeader('Access-Control-Allow-Origin','https://devsurfing.herokuapp.com');
	res.setHeader('Access-Control-Allow-Credentials','true');
	res.setHeader('Access-Control-Allow-Methods', 'GET,POST, PUT, DELETE');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, token');
	next();
})

module.exports = app;
