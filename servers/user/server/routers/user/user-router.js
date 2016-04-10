const router = require('express').Router();
const user = require('../../controllers/user-controller');


/*const obj = {
	name : {
		firstname : "Paulo",
		lastname : "Silva"
	},
	email : "paulo@paulo.com",
	password : "123abc",
	adress : {
		city : "Torres",
		state : "RS",
		country : "Brasil"
	},
	followers : [],
	following : [],
};*/


router.post('/save',(req,res)=>{
	const _user = req.body;
	user.save(_user,(err, data)=>{
		if(err){
			res.json(err);
		}else{
			res.json(data).status(201);
		};
	})
});

module.exports = router;