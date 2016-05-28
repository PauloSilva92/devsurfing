const app = require('./app-config');
const server = require('http').createServer(app);
const port = process.env.PORT || 5000;

server.listen(port,function(){
    console.log('Conectado na porta '+ port);
});

module.exports = server;