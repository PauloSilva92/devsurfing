'use strict';

const bcrypt = require('bcrypt');

const _validate = (v) => v.length >= 6;
const _set = (v)=> bcrypt.hashSync(v,bcrypt.genSaltSync(9));


const Field = {
  type: String,
  validate: [_validate, 'Password needs to be 6 characters long'],
  required: true,
  set: _set
}

module.exports = Field;