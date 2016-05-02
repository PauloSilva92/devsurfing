const adverController = require('../controllers/advert-controller');
const router = require('express').Router();


const callback = (data)=>{
        res.json(data);
    };

router.get('/:advert_id',(req, res)=>{
    const _id = req.params.advert_id;
    adverController.get(_id, callback)
});
router.get('/:user_id',(req, res)=>{
    const _id = req.params.user_id;
    adverController.getAll(_id, callback);
});
router.put('/save/:advert_id',(req, res)=>{
    const _id = req.params.advert_id;
    const _ad = req.body;
    adverController.save(_id,_ad, callback);
});
router.post('/save',(req, res)=>{
    const _ad = req.body;
    adverController.update(_ad, callback);
});
router.delete('/:advert_id',(req, res)=>{
    const _id = req.params.user_id;
    adverController.delete(_id, callback);
});

module.exports = router;