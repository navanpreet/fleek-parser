'use strict'

var BaseSwagger = require('./../swagger');

let Swagger = function (docs) {
  BaseSwagger.call(this, docs);
  this.parserVersion = '2.x';
}

Swagger.prototype = Object.create(BaseSwagger.prototype);

console.log(Swagger)
module.exports = Swagger;
