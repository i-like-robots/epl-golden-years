const fastify = require('fastify')
const swagger = require('@fastify/swagger')
const router = require('./router')
const { metaSchema } = require('./schemas')

const app = fastify({
  logger: { level: process.env.LOG_LEVEL || 'info' },
})

app.register(swagger, {
  openapi: metaSchema,
})

app.register(router)

app.get('/swagger', (_, response) => {
  response.send(app.swagger())
})

module.exports = app
