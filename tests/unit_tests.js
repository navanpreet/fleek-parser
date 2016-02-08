'use strict'

let mocha   = require('mocha');
let expect  = require('chai').expect;
let parser  = require('./../lib/parser');
let _       = require('lodash');

describe('Unit Tests', function () {

  describe('Utils', function () {

    describe('.find', function () {
      let swag   = parser.parse('./tests/swagger.json');
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
      let spec          = require('./swagger.json');
      let swag          = parser.parse(spec);
      let routes        = swag.routeSet();
      let shouldAllHave = function (key, type) {
        _.each(routes, function (val) {
          expect(val[key]).to.be.a(type);
        });
      }

      it('should build an array of route/method objects with expected properties', function () {
        expect(routes).to.be.an('array');
      });

      describe('.path', function () {
        it('is string', function () { shouldAllHave('path', 'string'); });
        it('should have converted params', function () {
          let specPaths = _.keys(spec.paths);
          expect(specPaths).to.contain('/user/{id}');
          expect(specPaths).to.not.contain('/user/:id');

          let parsedPaths = _.map(routes, function (route) { return route.path; });
          expect(parsedPaths).to.contain('/user/:id');
          expect(parsedPaths).to.not.contain('/user/{id}');
        });
      });
      describe('.method', function () { it('is string', function () { shouldAllHave('method', 'string'); }); });
      describe('.controller', function () { it('is string', function () { shouldAllHave('controller', 'string'); }); });
      describe('.details', function () { it('is object', function () { shouldAllHave('details','object'); }); });
      describe('.is', function () {
        it('is function', function () { shouldAllHave('is','function'); });
        it('returns a boolean', function () {
          _.each(routes, function (route) {
            expect(route.is('authenticated')).to.be.a('boolean');
          });
        });
      });
    });
  });
});
