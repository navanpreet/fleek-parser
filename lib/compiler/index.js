'use strict'

let helpers = require('./../helpers');
let _       = require('lodash');

module.exports = function (version) {
  version = _.isString(version) ? parseFloat(version) : version;
  let getCompiler = function (v) {
    let Swagger = require('./versions/' + v)
    return function (swag) {
      return new Swagger(swag);
    };
  }

  // version to compiler mapping
  if (version >= 2 && version < 3) { return getCompiler('2.x'); }

  throw Error('Swagger version ' + version + ' not supported');
}
