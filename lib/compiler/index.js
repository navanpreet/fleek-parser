'use strict'

let helpers = require('./../helpers');
let _       = require('lodash');

module.expoerts = function (version) {
  version = _.isString(version) ? parseFloat(version) : version;

  // version to compiler mapping
  if (version >= 2 && version < 3) { return require('2.x'); }

  throw Error('Swagger version ' + version + ' not supported');
}
