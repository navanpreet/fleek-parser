'use strict'

let helpers  = require('./helpers');
let _        = require('lodash');
let compiler = require('./compiler');

module.exports.parse = function (swagger, options, version) {
  if (!swagger) { throw Error('Parser expects swagger documentation in the form of a string, path, or object'); }
  swagger     = helpers.inpterpretSwagger(swagger);
  let compile = compiler(version || swagger.swagger);
  return compile(swagger, options);
}
