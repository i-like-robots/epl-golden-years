const fastify = require('fastify')
const swagger = require('@fastify/swagger')
const router = require('./router')

const app = fastify({
  logger: true,
})

app.register(swagger, {
  openapi: {
    info: {
      title: 'EPL Golden Years - OpenAPI',
    },
    tags: [
      { name: 'player', description: 'Everything about players' },
      { name: 'season', description: 'Everything about seasons' },
      { name: 'team', description: 'Everything about teams' },
    ],
    schemes: ['http'],
    produces: ['application/json'],
    exposeRoute: true,
  },
})

app.register(router)

app.get('/swagger', (_, response) => {
  response.send(app.swagger())
})

module.exports = app
