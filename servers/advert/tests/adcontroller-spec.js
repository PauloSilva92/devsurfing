const controller = require('../controllers/advert-controller');
require('../config/db-config');


// const searchString = /torres/i;

// function search(){
//     controller.search(searchString, function(data){
//         console.log(data);
//     });
// }
// search();

const following = [
    'face',
    'torres',
    '5734ea867e0b3ab97318e6e1'
]

function listFollowed(){
    controller.listFollowed(following, function(data){
        console.log(data);
    });
}
listFollowed();