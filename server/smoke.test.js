import { describe, test } from 'node:test'
import assert from 'node:assert'
import urlJoin from 'url-join'

async function fetchEndpoint(path, options) {
  const url = urlJoin(process.env.TEST_URL, path)
  const response = await fetch(url, options)

  if (response.ok) {
    return response
  } else {
    throw new Error(`Request to ${url} returned a ${response.status}`)
  }
}

describe('Smoke test', () => {
  test('Rest API', async () => {
    const response = await fetchEndpoint('/rest')
    const data = await response.json()

    assert.equal(response.status, 200)
    assert.match(response.headers.get('Content-Type'), /application\/json/)

    assert.deepEqual(Object.keys(data).sort(), ['managers', 'players', 'seasons', 'teams'])
  })

  test('Swagger UI', async () => {
    const response = await fetchEndpoint('/docs/swagger-ui')

    assert.equal(response.status, 200)
    assert.match(response.headers.get('Content-Type'), /text\/html/)
  })

  test('GraphQL API', async () => {
    const response = await fetchEndpoint('/rest')
    const data = await response.json()

    assert.equal(response.status, 200)
    assert.match(response.headers.get('Content-Type'), /application\/json/)

    assert.equal(data.errors, undefined)
  })

  test('GraphiQL', async () => {
    const response = await fetchEndpoint('/docs/graphiql-ui')

    assert.equal(response.status, 200)
    assert.match(response.headers.get('Content-Type'), /text\/html/)
  })
})
