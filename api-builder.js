module.exports = buildApi

var routes =
      { get: require('./endpoints/get')
      , post: require('./endpoints/post')
      , put: require('./endpoints/put')
      , patch: require('./endpoints/patch')
      , 'delete': require('./endpoints/delete')
      }
  , EventEmitter = require('events').EventEmitter

function buildApi(service, urlRoot, router, logger, middleware, verbs) {

  var api = new EventEmitter()

  if (!Array.isArray(middleware) && typeof middleware !== 'function') throw new Error('Middleware is not defined')

  // Support all verbs by default
  if (!Array.isArray(verbs)) verbs = [ 'get', 'post', 'put', 'patch', 'delete' ]

  // Create endpoints
  verbs.forEach(function (verb) {
    routes[verb](service, urlRoot, router, logger, middleware, api.emit.bind(api))
  })

  return api

}
