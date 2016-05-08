const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const _message = {
	messages : [{
		user_id : String,
		text : String,
		sent_at : {type : Date, default : Date.now}
	}],
	user_id : String,
	sent_id : String
}

const messageSchema = Schema(_message);

module.exports = messageSchema;