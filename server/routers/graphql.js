import { printSchema } from 'graphql'
import { createHandler } from 'graphql-http/lib/use/fastify'
import { schema } from '../graphql/index.js'

export default async function graphqlRouter(app) {
  const gql = printSchema(schema)
  const handler = createHandler({ schema })

  app.get('/', handler)
  app.post('/', handler)

  app.options('/', (_, response) => response.send(gql))
  app.get('/schema.gql', (_, response) => response.send(gql))
}
