const Message = require('../models/message-module');
const socket = require('../config/socket-config');

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



const _addMessage = (sent_id,receiver_id,sent_name, receiver_name,mod,callback)=>{
    const query = Message.find({$or: [{$and : [{sent_id : sent_id},{receiver_id: receiver_id}]},{$and : [{sent_id : receiver_id},{receiver_id: sent_id}]}]});

    query.exec((err, data)=>{
        console.log(data)
        if(err){
            callback({message: err.toString()});
        }else if(data.length === 0){
            console.log(data);
            const message = {
                receiver_id : receiver_id,
                sent_id : sent_id,
                sent_name: sent_name,
                receiver_name : receiver_name,
                messages :[
                    mod
                ]
            };
            _save(message,callback);
        }else if(data.length > 0){
            _update(sent_id,receiver_id,mod,callback);
        };
    });
};

const _update = (sent_id,receiver_id,mod,callback)=>{
    const query = Message.update({$or: [{$and : [{sent_id : sent_id},{receiver_id: receiver_id}]},{$and : [{sent_id : receiver_id},{receiver_id: sent_id}]}]},{$push:{messages:mod}});

    query.exec((err,data)=>{
        if(err){
            callback({message: err.toString()});
        }else{
            callback(data);
        }
    })
}

const _get = (sent_id,receiver_id,callback)=>{
    const query = Message.findOne({$or: [{$and : [{sent_id : sent_id},{receiver_id: receiver_id}]},{$and : [{sent_id : receiver_id},{receiver_id: sent_id}]}]});

    query.exec((err, data)=>{
        if(err){
            callback({message: err.toString()});
        }else if(data){

            callback(data.messages);
        }else{
            callback([{message : 'Não foi achado nada'}]);
        };
    });
};

const _getAll = (user_id,callback)=>{
    const query = Message.find({$or: [{sent_id: user_id}, {receiver_id: user_id}]},{sent_name: 1, sent_id: 1,receiver_name: 1, receiver_id: 1 , _id : 0});

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
    addMessage : _addMessage,
    get : _get,
    getAll : _getAll
};
