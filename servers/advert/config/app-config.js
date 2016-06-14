const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const morgan      = require('morgan');
const cors = require('cors');


const port = process.env.PORT || 4000;



app.use(morgan('dev'));

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.listen(port, function(){
    console.log('Rodando na porta: '+port);
});


app.use(cors({
    allowedHeaders : ['X-Requested-With','Content-type', 'token']
}));
module.exports = app;
