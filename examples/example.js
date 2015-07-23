'use strict'

let parse       = require('./../lib/parser');
let swaggerJson = require('./swagger.json');

let swag = parse('./examples/swagger.json');
// let result = parse(process.cwd() + '/examples/swagger.json');
// let result = parse(swaggerJson);

console.log(typeof swag)
console.log(swag.constructor.name)
console.log(swag)

swag.test = {
  foo : [
    [{
      result : 'success 1'
    },{
      result: 'success 2'
    }],
    [{
      result: 'success 3'
    }],
    'lolno'
  ],
  bar : 'woop'
};

// TODO: make into unit test

let result = 'fail';
console.log()
console.log('= test.foo ==============')
result = swag.find('test.foo')
console.log()
console.log(result)
console.log()
console.log('= test.foo[0] ==============')
result = swag.find('test.foo[0]')
console.log()
console.log(result)
console.log()
console.log('= test.foo[0][0]result ==============')
result = swag.find('test.foo[0][0]result')
console.log()
console.log(result)
console.log()
console.log('= test.foo[0][1]result ==============')
result = swag.find('test.foo[0][1]result')
console.log()
console.log(result)
console.log()
console.log('= test.foo[2] ==============')
result = swag.find('test.foo[2]')
console.log()
console.log(result)
console.log()
console.log('= test.bar ==============')
result = swag.find('test.bar')
console.log()
console.log(result)
console.log()
console.log('========================')
console.log()
