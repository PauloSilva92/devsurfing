const controller = require('../controllers/advert-controller');
require('../config/db-config');


const searchString = /torres/i;

function search(){
    controller.search(searchString, function(data){
        console.log(data);
    });
}
search();