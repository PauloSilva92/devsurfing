const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const _advert = {
	user_id : String,
	text : String,
	tags : [String]
};

const advertSchema = Schema(_advert);

module.exports = advertSchema;