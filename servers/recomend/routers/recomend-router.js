const recomendController = require('../controllers/recomend-controller');
const router = require('express').Router();


router.get('/recomendedByFollow/:user_id', (req,res)=>{
    if(req.params.user_id.split('').length < 12){
        res.json({message: 'ID inválido'});
    }else{
        const user_id = req.params.user_id;
        recomendController.recTags(user_id,(data)=>{
            res.json(data);
        });
    };

});

router.get('/trending/:user_id',(req,res)=>{
    if(req.params.user_id.split('').length < 12){
        res.json({message: 'ID inválido'});
    }else{
        const user_id = req.params.user_id;
        recomendController.trending(user_id,(data)=>{
            res.json(data);
        });
    };
});

router.get('/',(req,res)=>{
    res.json({api:'recomendações'})
});

module.exports = router;
