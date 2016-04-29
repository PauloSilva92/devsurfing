const mongoose = require('mongoose');
const Schema = mongoose.schema;

const _advert = advert : {
	user_id : String,
	text : String,
	tags : [String]
};

const advertSchema = Schema(_advert);

module.exports = advertSchema;