const User = require('../models/user-module');

//função que gera e retorna o token 
function userData(email, callback){
  const query = User.findOne({'email':email});

  query.select("name email");

  query.exec(function(err, usr){
    const token = usr.genToken(usr._id,usr.email, usr.name);
    callback({token:token});
  });
};

//funções de cadastro
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
        callback({message:err});
      }else if(usr){
        callback({message:'Email já cadastrado. Tente outro'});
      }else{
        create(_user,callback);
      };
    });
};

//função de login
const _login = (_user, callback)=>{
	const queryEmail = User.findOne({'email':_user.email});

    queryEmail.exec(function(err, user){
      if(err){
        callback({message:err});
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

const _read = ( token, callback)=>{
	const newUser = new User();
	try{
		const decoded = newUser.veriToken(token);
		if(decoded){
			const queryUser = User.findOne({'_id':decoded._id});
			queryUser.select("name email created_at following followers _id adress");
			 queryUser.exec((err,usr)=>{
				if(err){
					callback({message: err});
				}else if(usr){
					callback(usr);
				}else{
					callback({message: "usuário não encontrado"});
				};
			});
		}	
	}catch(err){
		callback({message:"Token Inválido"});
	}
};

const _update = (token,mod,callback)=>{
	const newUser = new User();
	try{
		const decoded = newUser.veriToken(token);
		if(decoded){
			const queryUp = User.update({'email':decoded.email}, mod);

				queryUp.exec((err,data)=>{
				if(err){
					callback({message:err});
				}else if(data){
					console.log(data);
					callback({message: "modificado"});
				}else{
					callback({message : "Usuário não encontrado"});
				}
			});
		}else{
			callback({message: "Token Inválido"})
		}
	}catch(err){
		callback(err);
	}
};

const _delete = (token, id,callback)=>{
	const newUser = new User();
	try{
		const decoded = newUser.veriToken(token);
		if(decoded._id === id){
			User.remove({'email':decoded.email},(err,data)=>{
				if(err){
					callback({message: err});
				}else if(data){
					callback({message: "Deletado"});
				}else{
					callback({message: "Usuário não encontrado"});
				}
			});
		}
	}catch(err){
		callback(err);
	}
};

module.exports = {
	save : _save,
	login : _login,
	read : _read,
	update : _update,
	delete : _delete
};