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
    const query = Advert.find({'user_id': _user_id}).sort({created_at: -1});
    query.exec((err,data)=>{
       if(err){
           callback({message: 'error'});
       }else{
           callback(data);
       };
    });
}
const search = (searchString, callback)=>{
    console.log(searchString);
    const message = {message : "Não foi possivel encontrar"};
    const query = { $or : [{'adress.city' : searchString}, {'adress.country' : searchString}, { tags : searchString }] };
    const queryTag = Advert.find(query).sort({created_at: -1});
    queryTag.exec((err,data)=>{
        if(err){
            callback(message);
        }else if(data.length === 0){
            callback(message);
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
};

const _listFollowed = (following,callback)=>{
    const query = Advert.find({$or : [{tags : {$in :following }}, {user_id : {$in : following}}] });
    query.exec((err,data)=>{
        if(err){
            callback({message:err});
        }else if(data.length === 0){
            callback({message:'Nada foi encontrado'});
        }else{
            callback(data);
        };
    });
}
module.exports = {
     save : _save,
     update : _update,
     get : _get,
     getAll : _getAll,
     search : search,
     delete : _delete,
     listFollowed : _listFollowed
};
