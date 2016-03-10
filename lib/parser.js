'use strict';

let _ = require('lodash');
let path = require('path');
let helpers  = require('./helpers');
let compiler = require('./compiler');

module.exports.parse = function (swagger, options, version) {
  if (!swagger) { throw Error('Parser expects swagger documentation in the form of a string, path, or object'); }

  options = options || {};
  if (!options.location && _.isString(swagger) && swagger.indexOf('{') < 0 && swagger.indexOf('.json') >= 0) {
    options.location = path.parse(helpers.pathToAbsolute(process.cwd(), swagger)).dir;
  } else if (swagger._origin_) {
    options.location = path.parse(swagger._origin_).dir;
  }

  swagger = helpers.inpterpretSwagger(swagger);
  let compile = compiler(version || swagger.swagger);
  return compile(swagger, options);
};
