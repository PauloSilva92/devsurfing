'use strict';
const MongoClient = require('mongodb').MongoClient;
const mongo = require('mongodb');

const url = process.env.MONGODB_URI || 'mongodb://localhost:27017/devsurfing'


function getAds(tags,id,Advert,db, callback) {
   Advert.find({tags : { $in : tags } } ).limit(10).toArray((err,ads)=>{
     if(err){
       db.close();
       callback(err);
     }else if(ads){
       db.close();
       callback(ads);
     }else{
       db.close();
       callback({message:'Nada foi encontrado'});
     };
   });
}

function findTags(Advert,id,db,callback){
  Advert.find({user_id: id},{tags:1,_id:0}).limit(1).next((err,advert)=>{
    if(err){
      //fecho a conexão
      db.close();
      // retorno o erro
      callback(err);
    }else if(advert){
      //chama a função que pega os anuncios com aquelas tags
      getAds(advert.tags,id,Advert,db,callback);
    }else{
      callback({message: 'Nada foi encontrado'});
    }
  })
}

function recTags(id, callback){
  const o_id = new mongo.ObjectID(id);
  MongoClient.connect(url,(err, db)=>{
    const User = db.collection('users');
    const Advert = db.collection('adverts');
    //busco usuário com o id especificado
    User.find({'_id': o_id},{_id:1}).limit(1).next((err,user)=>{
        if(err){
          db.close();
          callback(err);
        } else if(user){
          findTags(Advert,id,db,callback);
        }else{
          db.close();
          callback({message:'nada encontrado'});
        };
      });
    });
}


function trending(id,callback){
    MongoClient.connect(url,(err, db)=>{
        const Advert = db.collection('adverts');
        const o_id = new mongo.ObjectID(id);
        Advert.aggregate(
                    [
                        {$unwind : "$tags"},
                        {$group: { "_id": "$tags", "qtd": { $sum: 1 } } },
                        {$sort : {"qtd": -1}}
                    ]
            ).limit(3).toArray((err,result)=>{
            if(err){
                db.close();
                callback(err);
            }else{
                let tags = [];
                result.forEach((curr)=>{
                    tags.push(curr._id);
                });
                getAds(tags,o_id,Advert,db, callback);
            };
        });
    });
}
module.exports = {
  recTags: recTags,
  trending : trending
};
