import fastify from 'fastify'
import docsRouter from './routers/docs.js'
import restRouter from './routers/rest.js'
import graphqlRouter from './routers/graphql.js'

const app = fastify({
  logger: { level: process.env.LOG_LEVEL || 'info' },
})

app.register(docsRouter, { prefix: '/docs' })

app.register(restRouter, { prefix: '/rest' })

app.register(graphqlRouter, { prefix: '/graphql' })

export default app
