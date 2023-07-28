const fastify = require('fastify')
const restAPI = require('./routers/rest-api')
const graphql = require('./routers/graphql')

const app = fastify({
  logger: { level: process.env.LOG_LEVEL || 'info' },
})

app.register(restAPI)

app.register(graphql, { prefix: '/graphql' })

app.get('/swagger', (_, response) => {
  response.send(app.swagger())
})

module.exports = app
