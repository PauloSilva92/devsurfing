message :{
	messages : [{
		user_id : String,
		text : String,
		sent_at : {type : Date, default : Date.now}
	}],
	user_id : String,
	sent_id : String
}
 

advert : {
	user_id : String,
	text : String,
	tags : [String]
}


"/message/save" - PUT
"/message/get/:user_id" - GET


"/advert/save" - POST
"/advert/save" - PUT
"/advert/get/:user_id" - GET
"/advert/delete/:user_id" - DELETE