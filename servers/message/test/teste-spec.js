const controller = require('../controllers/message-controller');
const mongoose = require('mongoose');
require('../config/db-config');


const obj = {owner_id : '12312331',
                     receiver_id : '12313812321',
                     messages : [
                        {
                            user_id : '1231231820389',
                            text: 'Isso é uma mensagem'
                        },
                        {
                            user_id : '57657567',
                            text: 'Essa é outra mensagem'
                        }
                     ]
              };
              
const arrayUp = [
                {
                    owner_id : '657567',
                    text: 'Isso é uma mensagem de update'
                },
                {
                    owner_id : '8978978978',
                    text: 'Essa é outra mensagem de update'
                }
               ];


function get(id) {
    controller.get(id, function(data){
        if(data.message){
            console.log(data.message);
            mongoose.connection.close();
        }else{
            console.log("ACHOU");
            console.log(data);
            mongoose.connection.close();
        };
    });
}

function update(id) {
    controller.update(id, arrayUp, function(data){
        if(data.message){
            console.log(data.message);
            mongoose.connection.close();
        }else{
            console.log('MODIFICOU');
            // console.log(data);
            get(id);
        };
    })
}

function save() {
    controller.save(obj, function(data){
        if(data.message){
            console.log(data.message);
            mongoose.connection.close();
        }else{
            console.log("SALVOU");
            // console.log(data);
            update(data._id);
        };
    });
}

function getAll(){
    controller.getAll('12312331',function(data){
        if(data.message){
            console.log(data.message);
            mongoose.connection.close();
        }else{
            console.log("TODOS");
            // console.log(data);
            console.log(data.forEach((curr)=>{
                console.log(curr.messages);
            }));
        };
    });
}


getAll();