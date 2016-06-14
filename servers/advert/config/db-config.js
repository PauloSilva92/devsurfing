const mongoose = require('mongoose');

const connectString =
		  process.env.MONGODB_URI || 'mongodb://localhost/devsurfing';

mongoose.connect(connectString);

mongoose.connection.on('connected', function(){
  console.log('Conectado ao banco de dados');
});

mongoose.connection.on('error', function(err){
  console.log('Não foi possivel conectar ao mongodb. '+err)
});

mongoose.connection.on('disconnected', function(){
  console.log('Disconectado do mongodb')
});

mongoose.connection.on('open', function(){
  console.log('Conexao com o mongodb esta aberta')
});

process.on('SIGINT', function(){
  mongoose.connection.close(function(){
    console.log('Conexão com o mongodb terminada');
    process.exit(0);
  });
});
