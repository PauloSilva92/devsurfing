const Advert = require('../models/advert-module.js');

const _save = (_advert, callback)=>{
    const newAd = new Advert(_advert);
    newAd.save((err,data)=>{
        if(err){
            callback({message: err.toString()});
        }else{
            callback(data);
        };
    });
}
const _update = (_id, _mod, callback)=>{
    const query = Advert.update({'_id': _id}, _mod);
    
    query.exec((err,data)=>{
        if(err){
            callback({message:err});
        }else if(data){
            console.log(data);
            callback({message: "modificado"});
        }else{
            callback({message : "Usuário não encontrado"});
        }
    });
}
const _get = (_id, callback)=>{
    const query = Advert.findOne({'_id': _id});
    query.exec((err,data)=>{
       if(err){
           callback({message: 'error'});
       }else{
           callback(data);
       };
    });
}
const _getAll = (_user_id, callback)=>{
    const query = Advert.find({'user_id': _user_id});
    query.exec((err,data)=>{
       if(err){
           callback({message: 'error'});
       }else{
           callback(data);
       };
    });
}
const _delete = (_id, callback)=>{
    const query = Advert.remove({'_id':_id});
    query.exec((err,data)=>{
       if(err){
           callback({message: 'error'});
       }else{
           callback(data);
       };
    });
}
return {
     save : _save,
     update : _update,
     getAll : _getAll,
     delete : _delete
};
