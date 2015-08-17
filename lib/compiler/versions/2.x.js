'use strict'

let BaseSwagger = require('./../swagger');
let _           = require('lodash');

let Swagger = function (docs) {
  BaseSwagger.call(this, docs);
  this.parserVersion = '2.x';
}

Swagger.prototype = Object.create(BaseSwagger.prototype);


//
// Swagger.routeSet()
//
Swagger.prototype.routeSet = function () {
  let routes = [];

  _.each(this.paths || [], function (pathConfig, pathRoute) {
    _.each(pathConfig, function (actionConfig, methodType) {
      try {
        routes.push({
          path         : pathRoute,
          method       : methodType.toLowerCase(),
          controller   : (actionConfig.tags || [])[0] || null,
          details      : actionConfig,
          is           : function (query) {
            !!(_.includes(actionConfig.tags || [], query));
          }
        });
      } catch (e) {
        console.log(e)
        throw Error('Invalid route configuration');
      }
    });
  });

  return routes;
};


module.exports = Swagger;
