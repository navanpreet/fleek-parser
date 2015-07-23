'use strict'

let _ = require('lodash');

const schema = require('./schema');

function Swagger (obj) {
  let compiled = this.compile(obj);
  // this.applyProperties(compiled); // applying schema is broken for some reason :(
  _.extend(this, obj)
  this.parserVersion = 'Generic'
}

// `.` delimited with array index support `[`INDEX`]`
Swagger.prototype.find = function (query) {
  let querySplit = (query || '').split('.');
  let result     = this;
  let depthCount = 0;

  try {
    _.each(querySplit, function (propName) {

      // check for arrays
      if (/\[\d\]/.test(propName)) {
        let leadMatch    = propName.match(/^(.*?)\[/) || [];
        let trailMatch   = propName.match(/.*\](.*)$/) || [];
        let leadingProp  = leadMatch[1];
        let trailingProp = trailMatch[1];
        let arrOnly      = propName.replace(leadingProp, '');
        arrOnly          = arrOnly.replace(trailingProp, '');
        arrOnly          = _.compact(arrOnly.replace(/\[/g, '').split(']'));

        result = result[leadingProp];
        _.each(arrOnly, function (index) { result = result[parseInt(index, 10)]; });
        result = trailingProp ? result[trailingProp] : result;

      // simple prop
      } else {
        result = result[propName];
      }
    });
  } catch (e) {
    result = undefined
  }

  return result;
}

Swagger.prototype.compile = function (obj) {
  return obj;
}

Swagger.prototype.applyProperties = function (obj) {
  let self = this;
  console.log(obj)
  console.log(schema.base)
  let recursiveApply = function (currentSelf, currentProp, currentSchema) {
    // apply defaults for the current property
    _.each(currentSchema || [], function (currentValue, currentKey) {
      currentSelf[currentKey] = currentSchema[currentKey];
    });

    // apply overrides for current property
    _.each(currentProp || [], function (currentValue, currentKey) {
      if (currentProp && (currentProp[currentKey] !== 'undefined')) {
        currentSelf[currentKey] = currentProp[currentKey];
      }
    });

    // recurse for each property
    _.each(currentSelf, function (currentValue, currentKey) {
      let schemaPropToPass  = currentSchema && (typeof currentSchema[currentKey] !== 'undefined') ? currentSchema[currentKey] : undefined;
      let currentPropToPass = currentProp && (typeof currentProp[currentKey] !== 'undefined') ? currentProp[currentKey] : undefined;

      // if the schema or obj has a value
      if (typeof schemaPropToPass !== 'undefined' || typeof currentPropToPass !== 'undefined') {
        console.log('step [' + currentKey +'] ' + currentPropToPass + ', ' + currentPropToPass)
        recursiveApply(currentSelf[currentKey], currentPropToPass, currentPropToPass);
      }
    });
  }

  recursiveApply(self, (obj || {}), schema.base);
}

module.exports = Swagger;
