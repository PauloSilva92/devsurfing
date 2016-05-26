const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const _message = {
	messages : [{
		user_sent : String,
		user_id: String,
		text : String,
		sent_at : {type : Date, default : Date.now}
	}],
	sent_id : String,
	receiver_id : String
}

const messageSchema = Schema(_message);

module.exports = messageSchema;