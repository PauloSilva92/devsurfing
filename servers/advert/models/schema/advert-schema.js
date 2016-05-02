const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const _advert = {
	user_id : String,
	text : String,
	tags : [String],
	adress : {
		city : {type: String, default : ""} ,
		state : {type: String, default : ""} ,
		country : {type: String, default : ""} 
	}
};

const advertSchema = Schema(_advert);

module.exports = advertSchema;