const Advert = require('../models/advert-module.js');

const _save = (_advert, callback)=>{
    const newAd = new Advert(_advert);
    newAd.save((err,data)=>{
        if(err){
            callback({message: err.toString()});
        }else{
            callback(data);
        };
    })
    
}
const _update = ()=>{
    
}
const _get = ()=>{
    
}
const _delete = ()=>{
    
}
return {
     save : _save,
     update : update,
     get : _get,
     delete : _delete
};
