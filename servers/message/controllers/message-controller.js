const Message = require('../models/message-module');

const _save = (message,callback)=>{
    const newMe = new Message(message);
    
    newMe.save((err, data)=>{
       if(err){
            callback({message: err.toString()});
        }else if(data){
            callback(data);
        }else{
            callback({message : 'deu treta'});
        };
    });
};
const _update = (mess_id,mod,callback)=>{
    const query = Message.update({_id : mess_id} ,{$push : {messages : {$each : mod} } });
    
    query.exec((err, data)=>{
        if(err){
            callback({message: err.toString()});
        }else if(data){
            callback(data);
        }else{
            callback({message : 'deu treta'});
        };
    });
};
const _get = (mess_id,callback)=>{
    const query = Message.findOne({_id : mess_id});
    
    query.exec((err, data)=>{
        if(err){
            callback({message: err.toString()});
        }else if(data){
            callback(data);
        }else{
            callback({message : 'deu treta'});
        };
    });
};

const _getAll = (user_id,callback)=>{
    const query = Message.find({$or: [ {owner_id : user_id}, {receiver_id : user_id} ]});
    
    query.exec((err, data)=>{
        if(err){
            callback({message: err.toString()});
        }else if(data){
            callback(data);
        }else{
            callback({message : 'Não possível encontrar nada'});
        };
    });
};

module.exports = {
    save : _save,
    update : _update,
    get : _get,
    getAll : _getAll
};