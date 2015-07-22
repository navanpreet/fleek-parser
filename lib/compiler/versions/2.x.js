'use strict'

var BaseSwagger = require('./../swagger');

Swagger = function () {
  BaseSwagger.apply(this, arguments);
}

Swagger.prototype = new BaseSwagger;
