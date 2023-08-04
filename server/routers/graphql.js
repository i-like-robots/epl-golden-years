const { printSchema } = require('graphql')
const { createHandler } = require('graphql-http/lib/use/fastify')
const { schema } = require('../graphql')

module.exports = function graphqlRouter(app, _, done) {
  const gql = printSchema(schema)
  const handler = createHandler({ schema })

  app.get('/', handler)
  app.post('/', handler)

  app.options('/', (_, response) => response.send(gql))

  done()
}
