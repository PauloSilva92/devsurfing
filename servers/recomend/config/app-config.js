const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const morgan      = require('morgan');


const port = process.env.PORT || 5500;



app.use(morgan('dev'));

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.listen(port, function(){
    console.log('Rodando na porta: '+port);
});

app.use(function(req, res, next){
	res.setHeader('Access-Control-Allow-Origin','*');
	res.setHeader('Access-Control-Allow-Methods', 'GET,POST, PUT, DELETE');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, token');
	next();
})

module.exports = app;
