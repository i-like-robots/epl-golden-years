const fastify = require('fastify')
const swagger = require('@fastify/swagger')
const router = require('./router')
const { metaSchema } = require('./schemas')

const app = fastify({
  logger: true,
})

app.register(swagger, {
  openapi: metaSchema,
})

app.register(router)

app.get('/swagger', (_, response) => {
  response.send(app.swagger())
})

module.exports = app
