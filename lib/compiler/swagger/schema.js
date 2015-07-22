'use strict'

const base = {
  swagger             : '',
  host                : '',
  schemes             : [],
  basePath            : '',
  consumes            : [],
  produces            : [],
  securityDefinitions : {},
  paths               : {
    _PATH_ : {
      _METHOD_ : {
        description : '',
        tags        : [],
        consumes    : [],
        produces    : [],
        responses   : {},
        security    : [],
        parameters  : []
      }
    }
  },
  definitions         : {
    _DEFINITION_NAME_: {
      type      : '',
      required  : [],
      properties: {}
    }
  }
  info                : {
    title       : '',
    description : '',
    version     : ''
  }
}

const methods = {
    description: '',
    tags       : [],
    consumes   : [],
    produces   : [],
    responses  : {},
    security   : [],
    parameters : []
}

const defiinition = {
  type      : '',
  required  : [],
  properties: {}
}

module.exports = {
  base       : base,
  methods    : methods,
  definition : definition
}
