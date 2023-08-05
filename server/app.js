const fastify = require('fastify')
const restRouter = require('./routers/rest')
const graphqlRouter = require('./routers/graphql')

const app = fastify({
  logger: { level: process.env.LOG_LEVEL || 'info' },
})

app.register(restRouter, { prefix: '/rest' })

app.register(graphqlRouter, { prefix: '/graphql' })

module.exports = app
