const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const _user = {
	name : {
		firstname : require('../fields/firstname-field.js'),
		lastname : require('../fields/lastname-field.js')
	},
	email : require('../fields/email-field.js'),
	password : require('../fields/password-field.js'),
	adress : {
		city : require('../fields/city-field.js'),
		state : require('../fields/state-field.js'),
		country : require('../fields/country-field.js')
	},
	followers : [String],
	following : [String],
	created_at : require('../fields/created_at-field.js')
};


const userSchema = new Schema(_user);

userSchema.methods.genToken = (_id,email, name)=>{
	const user = {
		_id : _id,
		email : email,
		name: name
	};
	return jwt.sign(user, 'zipute');
} 
userSchema.methods.validPass = function(password){
	return bcrypt.compareSync(password, this.password);	
};
userSchema.methods.genPass = (v)=> bcrypt.hashSync(v,bcrypt.genSaltSync(9));
userSchema.methods.veriToken = function(token){
	return jwt.verify(token,'zipute');
};
module.exports = userSchema;

// mongoose.connect('mongodb://localhost/test');

// const model = mongoose.model('User',userSchema);



// model.create(obj, (err,data)=>{
// 	if (err)return console.log(err);
// 	console.log(data);
// });