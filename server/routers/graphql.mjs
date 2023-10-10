import { printSchema } from 'graphql'
import { createHandler } from 'graphql-http/lib/use/fastify.mjs'
import { schema } from '../graphql.mjs'

export default function graphqlRouter(app, _, done) {
  const gql = printSchema(schema)
  const handler = createHandler({ schema })

  app.get('/', handler)
  app.post('/', handler)

  app.options('/', (_, response) => response.send(gql))
  app.get('/schema.gql', (_, response) => response.send(gql))

  done()
}
