const router = require('express').Router();
const messageController = require('../controllers/message-controller');


router.post('/:sent_id/to/:received_id/:sent_name/:received_name',(req, res)=>{
    if(req.body){
        const sent_id = req.params.sent_id;
        const received_id = req.params.received_id;
        const received_name = req.params.received_name;
        const sent_name = req.params.sent_name;
        
        console.log(received_name);
        console.log(sent_name);
        
       messageController.addMessage(sent_id,received_id,sent_name, received_name, req.body,(data)=>{
          res.json(data); 
       });
        
    };
});

router.get('/:sent_id/to/:received_id',(req,res)=>{
     const sent_id = req.params.sent_id;
     const received_id = req.params.received_id;
     const message = [{
            text: 'oi tudo bom',
            user_sent : 'paulo',
            user_id : received_id
        }];
        messageController.get(sent_id,received_id,(data)=>{
            res.json(data);     
        });
     
});
router.get('/all/:user_id',(req,res)=>{
     
    messageController.getAll(req.params.user_id, (data)=>{
        res.json(data);      
    });
});

module.exports = router;
