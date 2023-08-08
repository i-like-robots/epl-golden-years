const { after, before, describe, test } = require('node:test')
const assert = require('node:assert')
const Ajv = require('ajv')
const addFormats = require('ajv-formats')
const snapshot = require('data-snapshot').default
const jsonDiff = require('json-diff')
const urlJoin = require('url-join')
const app = require('../app')
const schemas = require('../rest/schemas')

describe('Rest API', () => {
  const ajv = new Ajv({ strict: false })

  addFormats(ajv)

  const validateRoute = async (path, schema, statusCode = 200) => {
    const url = urlJoin('/rest', path)

    const request = async () => {
      const response = await app.inject({
        method: 'GET',
        url,
      })

      return response.json()
    }

    const expected = await snapshot(url, request)
    const actual = await request()
    const diff = jsonDiff.diffString(expected, actual, { color: false })

    ajv.validate(schema.response[statusCode], actual)

    assert.equal(diff.length, 0, diff)
    assert.equal(ajv.errors, null, ajv.errors)

    return actual
  }

  before(async () => {
    await app.ready()
  })

  after(async () => {
    await app.close()
  })

  describe('/', () => {
    test('OK', async () => {
      await validateRoute('/', schemas.rootSchema, 200)
    })
  })

  describe('/players', () => {
    test('OK', async () => {
      const data = await validateRoute('/players', schemas.playersSchema, 200)

      assert.equal(data.length, 2105)
    })

    test('OK - with name filter', async () => {
      const data = await validateRoute('/players?name=tony', schemas.playersSchema, 200)

      assert.equal(data.length, 23)
    })

    test('OK - with position filter', async () => {
      const data = await validateRoute('/players?position=G', schemas.playersSchema, 200)

      assert.equal(data.length, 210)
    })

    test('Invalid Request', async () => {
      await validateRoute('/players?name=@', schemas.playersSchema, 400)
      await validateRoute('/players?position=X', schemas.playersSchema, 400)
    })
  })

  describe('/players/:playerId', () => {
    test('OK', async () => {
      await validateRoute('/players/kevin-phillips-b8f6', schemas.playerSchema, 200)
    })

    test('Not Found', async () => {
      await validateRoute('/players/joe-bloggs-1234', schemas.playerSchema, 404)
    })
  })

  describe('/players/:playerId/album', () => {
    test('OK', async () => {
      await validateRoute('/players/kevin-phillips-b8f6/album', schemas.playerAlbumSchema, 200)
    })

    test('Not Found', async () => {
      await validateRoute('/players/joe-bloggs-1234/album', schemas.playerAlbumSchema, 404)
    })
  })

  describe('/players/:playerId/stats', () => {
    test('OK', async () => {
      await validateRoute('/players/kevin-phillips-b8f6/stats', schemas.playerStatsSchema, 200)
    })

    test('Not Found', async () => {
      await validateRoute('/players/joe-bloggs-1234/stats', schemas.playerStatsSchema, 404)
    })
  })

  describe('/teams', () => {
    test('OK', async () => {
      const data = await validateRoute('/teams', schemas.teamsSchema, 200)

      assert.equal(data.length, 34)
    })

    test('OK - with name filter', async () => {
      const data = await validateRoute('/teams?name=man', schemas.teamsSchema, 200)

      assert.equal(data.length, 2)
    })

    test('Invalid Request', async () => {
      await validateRoute('/teams?name=@', schemas.teamsSchema, 400)
    })
  })

  describe('/teams/:teamId', () => {
    test('OK', async () => {
      await validateRoute('/teams/shu', schemas.teamSchema, 200)
    })

    test('Not Found', async () => {
      await validateRoute('/teams/abc', schemas.teamSchema, 404)
    })
  })

  describe('/teams/:teamId/squads', () => {
    test('OK', async () => {
      await validateRoute('/teams/shu/squads', schemas.teamSquadsSchema, 200)
    })

    test('Not Found', async () => {
      await validateRoute('/teams/abc/squads', schemas.teamSquadsSchema, 404)
    })
  })

  describe('/teams/:teamId/squads/1993-1994', () => {
    test('OK', async () => {
      await validateRoute('/teams/shu/squads/1993-1994', schemas.teamSquadSchema, 200)
    })

    test('Not Found', async () => {
      await validateRoute('/teams/abc/squads/1993-1994', schemas.teamSquadSchema, 404)
    })
  })

  describe('/teams/:teamId/stats', () => {
    test('OK', async () => {
      await validateRoute('/teams/shu/stats', schemas.teamStatsSchema, 200)
    })

    test('Not Found', async () => {
      await validateRoute('/teams/abc/stats', schemas.teamStatsSchema, 404)
    })
  })

  describe('/seasons', () => {
    test('OK', async () => {
      const data = await validateRoute('/seasons', schemas.seasonsSchema, 200)

      assert.equal(data.length, 10)
    })

    test('OK - with team filter', async () => {
      const data = await validateRoute('/seasons?team=shu', schemas.seasonsSchema, 200)

      assert.equal(data.length, 2)
    })

    test('Invalid Request', async () => {
      await validateRoute('/seasons?team=@', schemas.seasonsSchema, 400)
    })
  })

  describe('/seasons/:seasonId', () => {
    test('OK', async () => {
      await validateRoute('/seasons/1994-1995', schemas.seasonSchema, 200)
    })

    test('Not Found', async () => {
      await validateRoute('/seasons/2008-2009', schemas.seasonSchema, 404)
    })
  })

  describe('/seasons/:seasonId/hat-tricks', () => {
    test('OK', async () => {
      await validateRoute('/seasons/1994-1995/hat-tricks', schemas.seasonHatTricksSchema, 200)
    })

    test('Not Found', async () => {
      await validateRoute('/seasons/2008-2009/hat-tricks', schemas.seasonHatTricksSchema, 404)
    })
  })

  describe('/seasons/:seasonId/table', () => {
    test('OK', async () => {
      await validateRoute('/seasons/1994-1995/table', schemas.seasonTableSchema, 200)
    })

    test('Not Found', async () => {
      await validateRoute('/seasons/2008-2009/table', schemas.seasonTableSchema, 404)
    })
  })

  describe('/seasons/:seasonId/top-assists', () => {
    test('OK', async () => {
      await validateRoute('/seasons/1994-1995/top-assists', schemas.seasonTopAssistsSchema, 200)
    })

    test('Not Found', async () => {
      await validateRoute('/seasons/2008-2009/top-assists', schemas.seasonTopAssistsSchema, 404)
    })
  })

  describe('/seasons/:seasonId/top-clean-sheets', () => {
    test('OK', async () => {
      await validateRoute(
        '/seasons/1994-1995/top-clean-sheets',
        schemas.seasonTopCleanSheetsSchema,
        200
      )
    })

    test('Not Found', async () => {
      await validateRoute(
        '/seasons/2008-2009/top-clean-sheets',
        schemas.seasonTopCleanSheetsSchema,
        404
      )
    })
  })

  describe('/seasons/:seasonId/top-scorers', () => {
    test('OK', async () => {
      await validateRoute('/seasons/1994-1995/top-scorers', schemas.seasonTopScorersSchema, 200)
    })

    test('Not Found', async () => {
      await validateRoute('/seasons/2008-2009/top-scorers', schemas.seasonTopScorersSchema, 404)
    })
  })

  describe('/managers', () => {
    test('OK', async () => {
      const data = await validateRoute('/managers', schemas.managersSchema, 200)

      assert.equal(data.length, 98)
    })

    test('OK - with name filter', async () => {
      const data = await validateRoute('/managers?name=tony', schemas.managersSchema, 200)

      assert.equal(data.length, 2)
    })

    test('Invalid Request', async () => {
      await validateRoute('/managers?name=@', schemas.managersSchema, 400)
    })
  })

  describe('/managers/:managerId', () => {
    test('OK', async () => {
      await validateRoute('/managers/terry-venables-6af0', schemas.managerSchema, 200)
    })

    test('Not Found', async () => {
      await validateRoute('/managers/joe-bloggs-1234', schemas.managerSchema, 404)
    })
  })
})
