const Schema = require('./schema/user-schema');
const Model = require('./model/user-model')('User',Schema);

module.exports = Model;