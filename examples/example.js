'use strict'

let parse       = require('./../lib/parser');
let swaggerJson = require('./swagger.json');

let result = parse();
// let result = parse('./swagger.json');
// let result = parse(process.cwd() + '/examples/swagger.json');
// let result = parse(swaggerJson);
