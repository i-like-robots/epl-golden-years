const fastify = require('fastify')
const docsRouter = require('./routers/docs')
const restRouter = require('./routers/rest')
const graphqlRouter = require('./routers/graphql')

const app = fastify({
  logger: { level: process.env.LOG_LEVEL || 'info' },
})

app.register(docsRouter, { prefix: '/docs' })

app.register(restRouter, { prefix: '/rest' })

app.register(graphqlRouter, { prefix: '/graphql' })

module.exports = app
