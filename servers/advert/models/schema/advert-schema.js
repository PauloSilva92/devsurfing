const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const _advert = {
	user_id : String,
	user_name: String,
	text : String,
	tags : [String],
	adress : {
		city : {type: String, default : ""} ,
		state : {type: String, default : ""} ,
		country : {type: String, default : ""} 
	},
	created_at : {type: Date, default : Date.now}
};

const advertSchema = Schema(_advert);

module.exports = advertSchema;