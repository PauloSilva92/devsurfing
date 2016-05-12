const controller = require('../controllers/advert-controller');
require('../config/db-config');


const objFind = { tags : "javascrpt" };

function getTag(){
    controller.getTag(objFind, function(data){
        console.log(data);
    });
}
getTag();