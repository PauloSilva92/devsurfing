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

userSchema.methods.genToken = (email, name)=>{
	const user = {
		email : email,
		name: name
	};
	return jwt.sign(user, process.env.SEGREDO);
} 
userSchema.methods.validPass = (password)=> bcrypt.compareSync(password, this.password);

module.exports = userSchema;

// mongoose.connect('mongodb://localhost/test');

// const model = mongoose.model('User',userSchema);



// model.create(obj, (err,data)=>{
// 	if (err)return console.log(err);
// 	console.log(data);
// });