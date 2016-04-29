const Schema = require('./schema/advert-schema');
const Model = require('./model/model')('Advert',Schema);

module.exports = Model;