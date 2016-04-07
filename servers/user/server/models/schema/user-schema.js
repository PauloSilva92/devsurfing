const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const _user = {
	name : {
		firstname : require('../fields/firstname-field.js'),
		lastname : require('../fields/lastname-field.js')
	},
	email : require('../fields/email-field.js'),
	password : require('../fields/password-field.js'),
	username : require('../fields/username-field.js'),
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

module.exports = userSchema;

// mongoose.connect('mongodb://localhost/test');

// const model = mongoose.model('User',userSchema);

// const obj = {
// 	name : {
// 		firstname : "Paulo",
// 		lastname : "Silva"
// 	},
// 	email : "paulo@paulo.com",
// 	password : "123abc",
// 	username : "paulosilva92",
// 	adress : {
// 		city : "Torres",
// 		state : "RS",
// 		country : "Brasil"
// 	},
// 	followers : [],
// 	following : [],
// };

// model.create(obj, (err,data)=>{
// 	if (err)return console.log(err);
// 	console.log(data);
// });