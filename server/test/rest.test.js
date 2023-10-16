import { after, before, describe, test } from 'node:test'
import assert from 'node:assert'
import jsonDiff from 'json-diff'
import urlJoin from 'url-join'
import snap from 'snappy-snaps'
import app from '../app.js'

async function validateRoute(path, statusCode = 200) {
  const url = urlJoin('/rest', path)

  const response = await app.inject({
    method: 'GET',
    url,
  })

  const data = response.json()

  const expected = await snap(url, data)
  const diff = jsonDiff.diffString(expected, data, { color: false })

  assert.equal(response.statusCode, statusCode)
  assert.equal(diff.length, 0, diff)

  return data
}

describe('Rest API', () => {
  before(async () => {
    await app.ready()
  })

  after(async () => {
    await app.close()
  })

  describe('/', () => {
    test('OK', async () => {
      await validateRoute('/', 200)
    })
  })

  describe('/players', () => {
    test('OK', async () => {
      const data = await validateRoute('/players', 200)
      assert.equal(data.length, 2105)
    })

    test('OK - with name filter', async () => {
      const data = await validateRoute('/players?name=tony', 200)
      assert.equal(data.length, 23)
    })

    test('OK - with position filter', async () => {
      const data = await validateRoute('/players?position=G', 200)
      assert.equal(data.length, 210)
    })

    test('Invalid Request', async () => {
      await validateRoute('/players?name=@', 400)
      await validateRoute('/players?position=X', 400)
    })
  })

  describe('/players/:playerId', () => {
    test('OK', async () => {
      await validateRoute('/players/kevin-phillips-b8f6', 200)
    })

    test('Not Found', async () => {
      await validateRoute('/players/joe-bloggs-1234', 404)
    })
  })

  describe('/players/:playerId/album', () => {
    test('OK', async () => {
      await validateRoute('/players/kevin-phillips-b8f6/album', 200)
    })

    test('Not Found', async () => {
      await validateRoute('/players/joe-bloggs-1234/album', 404)
    })
  })

  describe('/players/:playerId/stats', () => {
    test('OK', async () => {
      await validateRoute('/players/kevin-phillips-b8f6/stats', 200)
    })

    test('Not Found', async () => {
      await validateRoute('/players/joe-bloggs-1234/stats', 404)
    })
  })

  describe('/teams', () => {
    test('OK', async () => {
      const data = await validateRoute('/teams', 200)
      assert.equal(data.length, 34)
    })

    test('OK - with name filter', async () => {
      const data = await validateRoute('/teams?name=man', 200)
      assert.equal(data.length, 2)
    })

    test('Invalid Request', async () => {
      await validateRoute('/teams?name=@', 400)
    })
  })

  describe('/teams/:teamId', () => {
    test('OK', async () => {
      await validateRoute('/teams/shu', 200)
    })

    test('Not Found', async () => {
      await validateRoute('/teams/abc', 404)
    })
  })

  describe('/teams/:teamId/squads', () => {
    test('OK', async () => {
      await validateRoute('/teams/shu/squads', 200)
    })

    test('Not Found', async () => {
      await validateRoute('/teams/abc/squads', 404)
    })
  })

  describe('/teams/:teamId/squads/1993-1994', () => {
    test('OK', async () => {
      await validateRoute('/teams/shu/squads/1993-1994', 200)
    })

    test('Not Found', async () => {
      await validateRoute('/teams/abc/squads/1993-1994', 404)
    })
  })

  describe('/teams/:teamId/stats', () => {
    test('OK', async () => {
      await validateRoute('/teams/shu/stats', 200)
    })

    test('Not Found', async () => {
      await validateRoute('/teams/abc/stats', 404)
    })
  })

  describe('/seasons', () => {
    test('OK', async () => {
      const data = await validateRoute('/seasons', 200)

      assert.equal(data.length, 10)
    })

    test('OK - with team filter', async () => {
      const data = await validateRoute('/seasons?team=shu', 200)

      assert.equal(data.length, 2)
    })

    test('Invalid Request', async () => {
      await validateRoute('/seasons?team=@', 400)
    })
  })

  describe('/seasons/:seasonId', () => {
    test('OK', async () => {
      await validateRoute('/seasons/1994-1995', 200)
    })

    test('Not Found', async () => {
      await validateRoute('/seasons/2008-2009', 404)
    })
  })

  describe('/seasons/:seasonId/hat-tricks', () => {
    test('OK', async () => {
      await validateRoute('/seasons/1994-1995/hat-tricks', 200)
    })

    test('Not Found', async () => {
      await validateRoute('/seasons/2008-2009/hat-tricks', 404)
    })
  })

  describe('/seasons/:seasonId/table', () => {
    test('OK', async () => {
      await validateRoute('/seasons/1994-1995/table', 200)
    })

    test('Not Found', async () => {
      await validateRoute('/seasons/2008-2009/table', 404)
    })
  })

  describe('/seasons/:seasonId/top-assists', () => {
    test('OK', async () => {
      await validateRoute('/seasons/1994-1995/top-assists', 200)
    })

    test('Not Found', async () => {
      await validateRoute('/seasons/2008-2009/top-assists', 404)
    })
  })

  describe('/seasons/:seasonId/top-clean-sheets', () => {
    test('OK', async () => {
      await validateRoute(
        '/seasons/1994-1995/top-clean-sheets',

        200
      )
    })

    test('Not Found', async () => {
      await validateRoute(
        '/seasons/2008-2009/top-clean-sheets',

        404
      )
    })
  })

  describe('/seasons/:seasonId/top-scorers', () => {
    test('OK', async () => {
      await validateRoute('/seasons/1994-1995/top-scorers', 200)
    })

    test('Not Found', async () => {
      await validateRoute('/seasons/2008-2009/top-scorers', 404)
    })
  })

  describe('/managers', () => {
    test('OK', async () => {
      const data = await validateRoute('/managers', 200)
      assert.equal(data.length, 98)
    })

    test('OK - with name filter', async () => {
      const data = await validateRoute('/managers?name=tony', 200)
      assert.equal(data.length, 2)
    })

    test('Invalid Request', async () => {
      await validateRoute('/managers?name=@', 400)
    })
  })

  describe('/managers/:managerId', () => {
    test('OK', async () => {
      await validateRoute('/managers/terry-venables-6af0', 200)
    })

    test('Not Found', async () => {
      await validateRoute('/managers/joe-bloggs-1234', 404)
    })
  })
})
