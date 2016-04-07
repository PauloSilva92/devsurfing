'use strict';

const mongoose = require('mongoose');

const Model = function(modelName, schema){

	return mongoose.model(modelName, schema);
};

module.exports = Model;