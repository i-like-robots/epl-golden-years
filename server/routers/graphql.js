const { printSchema } = require('graphql')
const { createHandler } = require('graphql-http/lib/use/fastify')
const { schema } = require('../graphql')

module.exports = function graphqlRouter(app, opts, done) {
  const gql = printSchema(schema)

  app.get('/', createHandler({ schema }))
  app.post('/', createHandler({ schema }))

  app.options('/', (_, response) => response.send(gql))

  done()
}
