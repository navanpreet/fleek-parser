'use strict'

let parse       = require('./../lib/parser');
let swaggerJson = require('./swagger.json');

let swag = parse('./examples/swagger.json');

// let result = parse(process.cwd() + '/examples/swagger.json');
// let result = parse(swaggerJson);

console.log()
console.log(JSON.stringify(swag, null, '  '));
