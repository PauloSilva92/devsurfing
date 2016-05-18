const advertController = require('../controllers/advert-controller');
const router = require('express').Router();

router.get('/search/:searchString',(req,res)=>{
   if(req.params.searchString != ""){
       //converte a string de busca em uma Expressão Regular
       const searchString = new RegExp(req.params.searchString,'i');
       advertController.search(searchString, (data)=>{
          res.json(data); 
       });
   }else{
       res.json({message:'Não foi possivel encontrar'});
   }
});
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
    const _id = req.params.advert_id;
    console.log
    advertController.delete(_id, function (data){
        res.json(data);
    });
});
router.post('/listfollowed',(req,res)=>{
   const following = req.body;
   console.log(following);
   advertController.listFollowed(following,(data)=>{
      res.json(data); 
   });
});

module.exports = router;