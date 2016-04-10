const User = require('../models/user-module');

function userData(email, callback){
  const query = User.findOne({'email':email});

  query.select("name email");

  query.exec(function(err, usr){
    const token = usr.genToken(usr.email, usr.name);
    callback({token:token});
  });
};
const create = function(_user,callback){
  User.create(_user,function(err, result){
    if(err){
      callback({message:'Não foi possivel salvar ' + err});
    }else if (result){
        userData(result.email, callback);
    };
  });
}
const _save = (_user, callback)=>{
    const queryEmail = User.findOne({'email':_user.email});
    queryEmail.exec(function(err, usr){
      if(err){
        callback({Error:err});
      }else if(usr){
        callback({message:'Email já cadastrado. Tente outro'});
      }else{
        create(_user,callback);
      };
    });
};

const _login = (_user, callback)=>{
	const queryEmail = User.findOne({'email':_user.email});

    queryEmail.exec(function(err, user){
      if(err){
        callback({Error:err});
      }else if(user){
        if(user.validPass(_user.password)){
          userData(_user.email, callback);
        }else{
          callback({message:'Password incorreta'});
        }
      }else{
        callback({message:'Usuário não encontrado'});
      };
    });
};

module.exports = {
	save : _save,
	login : _login
}