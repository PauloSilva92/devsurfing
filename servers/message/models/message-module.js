const Schema = require('./schema/message-schema');
const Model = require('./model/model')('Message',Schema);

module.exports = Model;