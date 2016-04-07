const Schema = require('./schema/user-schema');
const Model = require('./model/user-model')('User',Schema);

console.log(Model);
module.exports = Model;