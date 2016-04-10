'use strict';

const _set = (v)=> v.toUpperCase();
const _get = (v)=> v;
const _validate = (v)=> v.length <= 2;

const Field = { 
	type : String,
	set : _set,
	get : _get,
	required : true,
	validate : [ _validate, 'Invalid Name' ],
	trim : true
};

module.exports = Field;