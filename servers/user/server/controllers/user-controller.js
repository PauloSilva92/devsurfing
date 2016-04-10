const User = require('../models/user-module');

function userData(email, callback){
  const query = User.findOne({'email':email});

  query.select("name email");

  query.exec(function(err, usr){
  	console.log(usr);
    const token = usr.genToken(usr.email, usr.name);
    callback({token:token});
  });
};
const create = function(_user,callback){
  User.create(_user,function(err, result){
    if(err){
      callback({Error:'Não foi possivel salvar ' + err});
    }else if (result){
        userData(result.email, callback);
    };
  });
}
const _save = (_user, callback)=>{
	console.log(_user.email)
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


module.exports = {
	save : _save
}