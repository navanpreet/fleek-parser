'use strict'

let _           = require('lodash');
let jsonRefs    = require('json-refs');
let deasync     = require('deasync');
let resolveRefs = deasync(jsonRefs.resolveRefs)

const schema = require('./schema');

function Swagger (obj) {
  let self           = this;
  //self._original_    = _.clone(obj, true);
  self.parserVersion = 'Generic';

  // resolve relative links
  var obj = resolveRefs(obj);
  // build definitions
	_.extend(this, obj);

	this.setRouteValidationMap();
	this.setSanitizedRoutes();
	this.setControllers();	
	return this;

}

Swagger.prototype.setControllers		 = function(){
	var controllers = {};

  _.each(this.paths, function (controllerConfig, controllerPath) {
    controllers = _.merge(controllers, constructController(controllerConfig, controllerPath));
  });

	function constructController(controllerConfig, controllerPath){
		var method                                       = _.keys(controllerConfig)[0];
		var methodObj                                    = {};
		methodObj[method]                                = controllerConfig[method];
		var routeObj                                     = {};
		routeObj[controllerPath]                         = methodObj;
	 	var controllerFile                               = {}
		controllerFile[controllerConfig[method].tags[0]] = routeObj;
		
		return controllerFile;	
	}	
	this.controllers = controllers;
}

Swagger.prototype.setSanitizedRoutes = function(){
	var routes = [];

  _.each(this.paths, function (pathConfig, pathRoute) {
    _.each(pathConfig, constructPathObj(pathRoute));
  });

  function constructPathObj (pathRoute) {
    return function (endpointConfig, methodType) {
      try {
        if (_.isString(pathRoute) && _.isString(methodType) && _.isString(endpointConfig.tags[0])) {
          routes.push({
            path         : pathRoute,
            method       : methodType.toLowerCase(),
            controller   : endpointConfig.tags[0],
            authRequired : !!(_.includes(endpointConfig.tags, 'authenticated')),
            restricted   : !!(_.includes(endpointConfig.tags, 'restricted')),
            details      : endpointConfig
          });
        } else {
          throw new Error('Invalid route configuration');
        }
      } catch (e) {
        console.error('Ignored route: (' + methodType + ' ' + pathRoute + ') because of error');
    	}
  	}
	}
	this.sanitizedRoutes =  routes;
}


Swagger.prototype.setRouteValidationMap = function () {
  var routeMap = {};

  _.each(this.paths, function (pathConfig, pathRoute) {
    _.each(pathConfig, constructPathObj(pathRoute));
  });

  function constructPathObj (pathRoute) {
    return function (endpointConfig, methodType) {
      try {
        if (_.isString(pathRoute) && _.isString(methodType) && _.isString(endpointConfig.tags[0])) {
          routeMap[pathRoute] = routeMap[pathRoute]  || {};
          routeMap[pathRoute][methodType.toLowerCase()] = endpointConfig.parameters || [];


        } else {
          throw new Error('Invalid route configuration');
        }
      } catch (e) {
        console.error('Ignored route: (' + methodType + ' ' + pathRoute + ') because of error');
        console.error(e.stack);
      }
    }
  }

	this.routeValidationMap = routeMap;
}

module.exports = Swagger;
