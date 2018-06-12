'use strict';

const parser = require('./parser.js');

const router = module.exports = {};

// This object will hold our routing table
router.routes = {};

// This is the list of REST Verbs we will accept requests for
const methods = ['GET','PUT','PATCH','POST','DELETE'];

methods.forEach( (method) => {
  router.routes.GET = {};
  router.routes.POST = {};
  router.routes.PUT = {};
  router.routes.DELETE = {};
  router.routes[method] = {};
  router[method.toLowerCase()] = function(path, callback) {
    router.routes[method][path] = callback;
  };

});


router.route = (req,res) => {

  return parser(req)
    .then(req => {
      // Determine which of the things in the routing table matches us
      // i.e. if the request is for http://localhost/foo
      // We would look for this:  router.routes.GET['/foo'] and then run the function that's assigned
      let handler = router.routes[req.method][req.parsed.pathname];
      // If we have one, run the function contained within
      if (handler) {
        return handler(req,res);
      }
      else{ 
        console.log('no route');
        res.statusCode = 404;
        res.statusMessage = 'Not Found';
        res.write(`Resource Not Found (${req.parsed.pathname})`);
        res.end();
      }
    })
    // Otherwise, bug out with an error
    .catch(err => {
      //console.error('NOT_FOUND', req.parsed.pathname);
      //res.writeHead(400);
      res.status = 404;
      res.statusMessage = 'Not Found';
      res.write(`Resource Not Found (${req.parsed.pathname})`);
      res.end();
    });

};