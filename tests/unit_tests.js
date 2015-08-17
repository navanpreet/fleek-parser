'use strict'

let mocha   = require('mocha');
let expect  = require('chai').expect;
let parse   = require('./../lib/parser');
let _       = require('lodash');

// TODO: make into unit test

let result = 'fail';
// result = swag.find('test.foo')
// result = swag.find('test.foo[0]')
// result = swag.find('test.foo[0][0]result')
// result = swag.find('test.foo[0][1]result')
// result = swag.find('test.foo[2]')
// result = swag.find('test.bar')

describe('Unit Tests', function () {

  describe('Utils', function () {

    describe('.find', function () {
      let swag   = parse('./tests/swagger.json');
      swag.test  = {
        foo : [
          [{ result : 'success 1' }, { result: 'success 2' }],
          [{ result: 'success 3' }],
          'lolno'
        ],
        bar : 'woop'
      };

      let search1 = 'test.foo';
      it('should find simple property chain `' + search1 + '`', function () {
        let result = swag.find(search1);
        expect(result).to.deep.equal(swag.test.foo);
      });

      let search2 = 'test.foo[0]';
      it('should find simple property chain ending in array `' + search2 + '`', function () {
        let result = swag.find(search2);
        expect(result).to.deep.equal(swag.test.foo[0]);
      });

      let search3 = 'test.foo[0][1].result';
      it('should find simple property chain with back to back arrays, ending in object`' + search3 + '`', function () {
        let result = swag.find(search3);
        expect(result).to.deep.equal(swag.test.foo[0][1].result);
      });

      let search4 = 'test.foo[2]';
      it('should find simple property chain ending in array `' + search4 + '`', function () {
        let result = swag.find(search4);
        expect(result).to.deep.equal(swag.test.foo[2]);
      });

      let search5 = 'custom.object';
      it('should allow target object to be passed in', function () {
        let result = swag.find(search5, { custom : { object : true } });
        expect(result).to.be.true;
      });
    });



    describe('.routeSet', function () {
      let swag   = parse('./tests/swagger.json');
      swag.test  = {
        foo : [
          [{ result : 'success 1' }, { result: 'success 2' }],
          [{ result: 'success 3' }],
          'lolno'
        ],
        bar : 'woop'
      };
      let routes = swag.routeSet();
      let shouldAllHave = function (key, type) {
        _.each(routes, function (val) {
          expect(val[key]).to.be.a(type);
        });
      }

      it('should build an array of route/method objects with expected properties', function () {
        expect(routes).to.be.an('array');
      });

      it(' has path', function () {       shouldAllHave('path', 'string'); });
      it(' has method', function () {     shouldAllHave('method', 'string'); });
      it(' has controller', function () { shouldAllHave('controller', 'string'); });
      it(' has details', function () {    shouldAllHave('details','object'); });

      console.log(routes)
    });
  });
});
