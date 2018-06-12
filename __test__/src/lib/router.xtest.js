'use strict';

let router = require('../../../src/lib/router.js');
//let app = require('../../../src/app');
//let superagent = require('superagent');
describe('Router', () => {
  it('registers routes of multiple types', () => {
    router.get('/', () => true);
    router.put('/', () => true);
    router.post('/', () => true);
    router.delete('/', () => true);
    expect( router.routes.GET['/']).toBeDefined();
    expect( router.routes.PUT['/']).toBeDefined();
    expect( router.routes.POST['/']).toBeDefined();
    expect( router.routes.DELETE['/']).toBeDefined();
  });

  it('can create multiple routes of the same type', () => {
    router.routes.GET = {};
    router.get('/a', () => true);
    router.get('/b', () => true);
    router.get('/c', () => true);
    expect( Object.keys(router.routes.GET).length ).toEqual(3);
  });

  it('can route get requests', () => {
    let expected = 'get/test';
    router.get('/test', () => expected);
    let req = { method: 'GET', url: 'http://localhost/test?john=bald' };
    let res = {};
    return router.route(req,res)
      .then( result => expect(result).toEqual(expected));
  });
  it('can route get requests', () => {
    let expected = 'get/api/v1/books';
    router.get('/api/v1/books', () => expected);
    let req = { method: 'GET', url: 'http://localhost/api/v1/books?id=1234' };
    let res = {};
    return router.route(req,res)
      .then( result => {
        console.log(result);
        expect(result).toEqual(expected);});
  });

  
});