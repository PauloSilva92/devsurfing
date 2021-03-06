'use strict';

const _set = (v)=> v.charAt(0).toUpperCase() + v.slice(1);
const _get = (v)=> v.charAt(0).toUpperCase() + v.slice(1);
const _validate = (v)=> v.length > 2;

const Field = {
	type : String,
	set : _set,
	required : true,
	validate : [ _validate, 'Invalid Name' ],
	trim : true
};

module.exports = Field;
