const controller = require('../controllers/user-controller.js');
require('../config/db-config');

const _mod = {$push : {followers: "12345"}};
const _token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJfaWQiOiI1NzMzZTYwYWVjOTk2ODc4MWNmZDliZTAiLCJlbWFpbCI6InBhdWxvQHBhdWxvLmNvbSIsIm5hbWUiOnsibGFzdG5hbWUiOiJTSUxWQSIsImZpcnN0bmFtZSI6IlBBVUxPIn0sImlhdCI6MTQ2MzE5NDYxOH0.YZpbWlI43_uejC6sVrbTBCc5KO-adYckUb7vTyz0UYs"

function update() {
    controller.update(_token,_mod, function(data){
       console.log(data); 
    });
}

update();