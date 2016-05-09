const router = require('express').Router();
const messageController = require('../controllers/message-controller');


router.post('/save',(req, res)=>{
    if(req.body){
        messageController.save(req.body, (data)=>{
            res.json(data);      
        });
    };
});
router.post('/save/:message_id',(req, res)=>{
    if(req.body){
        messageController.update(req.params.message_id,req.body, (data)=>{
            res.json(data);      
        });
    };
});
router.get('/:message_id',(req,res)=>{
     if(req.body){
        messageController.get(req.params.message_id, (data)=>{
            res.json(data);      
        });
    };
});
router.get('/getall/:user_id',(req,res)=>{
     if(req.body){
        messageController.getAll(req.params.user_id, (data)=>{
            res.json(data);      
        });
    };
});

module.exports = router;
