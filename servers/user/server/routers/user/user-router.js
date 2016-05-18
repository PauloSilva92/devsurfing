const router = require('express').Router();
const user = require('../../controllers/user-controller');


router.post('/save',(req,res)=>{
	const _user = req.body;
	user.save(_user,(data)=>{
		res.json(data)
	})
});

router.put('/save',(req,res)=>{
	const _mod = req.body;
	const _token = req.headers.token;
	if(!req.headers.token){
		res.status(401).json({message:"Não autorizado"});
	}else{
		user.update(_token, _mod, (data)=>{
			res.json(data);
		});	
	};
});

router.post('/login',(req, res)=>{
	const _user = req.body;
	user.login(_user,(data)=>{
		res.json(data);
	});
});

router.get('/data',(req,res)=>{
	const _token = req.headers.token;
	if(!req.headers.token){
		res.status(401).json({message:"Não autorizado"});
	}else{
		user.read(_token,(data)=>{
			res.json(data);
		});
	};
});

router.get('/:id',(req,res)=>{
	const _id = req.params.id
	const _token = req.headers.token;
	if(!req.headers.token){
		res.status(401).json({message:"Não autorizado"});
	}else{
		user.get(_id,(data)=>{
			res.json(data);
		});
	};
});

router.delete('/:id',(req,res)=>{
	const _token = req.headers.token;
	const _id = req.params.id;
	if (!req.headers.token){
		res.status(401).json({message:"Não autorizado"});
	}else{
		user.delete(_token, _id, (data)=>{
			res.json(data);
		});
	};
});

router.put('/follow',(req,res)=>{
	console.log(req.req.body.follow_id);
	const _mod = {$push : {following: req.body.follow_id}};
	const _token = req.headers.token;
	if(!req.headers.token){
		res.status(401).json({message:"Não autorizado"});
	}else{
		user.update(_token, _mod, (data)=>{
			res.json(data);
		});	
	};
});

router.put('/unfollow',(req,res)=>{
	console.log(req.body.unfollow_id);
	const _mod = {$pull : {following: req.body.unfollow_id}};
	const _token = req.headers.token;
	if(!req.headers.token){
		res.status(401).json({message:"Não autorizado"});
	}else{
		user.update(_token, _mod, (data)=>{
			res.json(data);
		});	
	};
});


module.exports = router;