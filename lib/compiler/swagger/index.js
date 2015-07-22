'use strict'

let _ = require('lodash');

const schema = require('./schema');

let Swagger = function (obj) {
  let compiled = this.compile(obj);
  this.applyProperties(compile);
}

Swagger.prototype.find = function () {

}

Swagger.prototype.applyProperties = function (obj) {
  let self = this;
  let recursiveApply = function (currentSelf, currentProp, currentSchema) {
    _.each(surrentSchema, function (currentValue, currentKey) {
      if (currentProp && currentProp[key]) {
        currentSelf[key] = currentProp[key];
      } else if (currentSchema && currentSchema[key]) {
        currentSelf[key] = currentSchema[key];
      }

      if (currentSelf[key]) {
        recursiveApply(currentSelf[key], currentProp && currentProp[key], currentSchema && currentSchema[key]);
      }
    });

    _.each(currentProp, function (currentValue, currentKey) {
      if (currentProp && currentProp[key]) {
        currentSelf[key] = currentProp[key];
      } else if (currentSchema && currentSchema[key]) {
        currentSelf[key] = currentSchema[key];
      }

      if (currentSelf[key]) {
        recursiveApply(currentSelf[key], currentProp && currentProp[key], currentSchema && currentSchema[key]);
      }
    });
  }

  recursiveApply(obj, schema);
}

module.exports = Swagger;
