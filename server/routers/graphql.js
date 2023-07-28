const { printSchema } = require('graphql')
const { createHandler } = require('graphql-http/lib/use/fastify')
const { schema } = require('../graphql')

module.exports = function graphqlRouter(app, opts, done) {
  app.all('/', createHandler({ schema }))

  const gql = printSchema(schema)

  app.get('/schema.gql', (_, response) => {
    response.send(gql)
  })

  done()
}
