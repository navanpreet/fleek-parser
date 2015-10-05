'use strict'

let parser       = require('./../lib/parser');
let swaggerJson = require('./swagger.json');

let swag = parser.parse('./examples/swagger.json');

// let result = parse(process.cwd() + '/examples/swagger.json');
// let result = parse(swaggerJson);

console.log()
console.log(JSON.stringify(swag.definitions, null, '  '));
