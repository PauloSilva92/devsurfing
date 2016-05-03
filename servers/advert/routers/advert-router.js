const advertController = require('../controllers/advert-controller');
const router = require('express').Router();


router.get('/:advert_id',(req, res)=>{
    const _id = req.params.advert_id;
    advertController.get(_id, function (data){
        res.json(data);
    })
});
router.get('/getall/:user_id',(req, res)=>{
    const _id = req.params.user_id;
    advertController.getAll(_id, function (data){
        res.json(data);
    });
});
router.put('/save/:advert_id',(req, res)=>{
    const _id = req.params.advert_id;
    const _ad = req.body;
    advertController.update(_id,_ad, function (data){
        res.json(data);
    });
});
router.post('/save',(req, res)=>{
    const _ad = req.body;
    advertController.save(_ad, function (data){
        res.json(data);
    });
});
router.delete('/:advert_id',(req, res)=>{
    const _id = req.params.user_id;
    advertController.delete(_id, function (data){
        res.json(data);
    });
});

module.exports = router;