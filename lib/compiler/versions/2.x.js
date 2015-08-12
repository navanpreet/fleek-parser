'use strict'

var BaseSwagger = require('./../swagger');

let Swagger = function (docs) {
  BaseSwagger.call(this, docs);
  this.parserVersion = '2.x';
}

Swagger.prototype = BaseSwagger;

module.exports = Swagger;
