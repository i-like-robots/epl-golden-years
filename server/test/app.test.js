const { after, before, describe, test } = require('node:test')
const assert = require('node:assert')
const Ajv = require('ajv')
const addFormats = require('ajv-formats')
const app = require('../app')
const schemas = require('../schemas')

describe('App', () => {
  const ajv = new Ajv({ strict: false })

  addFormats(ajv)

  const validateRoute = async (path, schema, statusCode) => {
    const response = await app.inject({
      method: 'GET',
      url: path,
    })

    ajv.validate(schema.response[statusCode], response.json())

    assert.equal(response.statusCode, statusCode)
    assert.equal(ajv.errors, null)

    return response
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
      const response = await validateRoute('/players', schemas.playersSchema, 200)
      const data = response.json()

      assert.equal(data.length, 2105)
    })

    test('OK - with name filter', async () => {
      const response = await validateRoute('/players?name=tony', schemas.playersSchema, 200)
      const data = response.json()

      assert.equal(data.length, 23)
    })

    test('OK - with position filter', async () => {
      const response = await validateRoute('/players?position=D', schemas.playersSchema, 200)
      const data = response.json()

      assert.equal(data.length, 680)
    })

    test('Invalid Request', async () => {
      await validateRoute('/players?name=@', schemas.playersSchema, 400)
      await validateRoute('/players?position=X', schemas.playersSchema, 400)
    })
  })

  describe('/players/:playerId', () => {
    test('OK', async () => {
      await validateRoute('/players/kevin-phillips-240a', schemas.playerSchema, 200)
    })

    test('Not Found', async () => {
      await validateRoute('/players/joe-bloggs-1234', schemas.playerSchema, 404)
    })
  })

  describe('/players/:playerId/album', () => {
    test('OK', async () => {
      await validateRoute('/players/kevin-phillips-240a/album', schemas.playerAlbumSchema, 200)
    })

    test('Not Found', async () => {
      await validateRoute('/players/joe-bloggs-1234/album', schemas.playerAlbumSchema, 404)
    })
  })

  describe('/players/:playerId/statistics', () => {
    test('OK', async () => {
      await validateRoute('/players/kevin-phillips-240a/statistics', schemas.playerStatsSchema, 200)
    })

    test('Not Found', async () => {
      await validateRoute('/players/joe-bloggs-1234/statistics', schemas.playerStatsSchema, 404)
    })
  })

  describe('/teams', () => {
    test('OK', async () => {
      const response = await validateRoute('/teams', schemas.teamsSchema, 200)
      const data = response.json()

      assert.equal(data.length, 34)
    })

    test('OK - with name filter', async () => {
      const response = await validateRoute('/teams?name=man', schemas.teamsSchema, 200)
      const data = response.json()

      assert.equal(data.length, 2)
    })

    test('Invalid Request', async () => {
      await validateRoute('/teams?name=@', schemas.teamsSchema, 400)
    })
  })

  describe('/teams/:teamId', () => {
    test('OK', async () => {
      await validateRoute('/teams/cov', schemas.teamSchema, 200)
    })

    test('Not Found', async () => {
      await validateRoute('/teams/abc', schemas.teamSchema, 404)
    })
  })

  describe('/teams/:teamId/squads', () => {
    test('OK', async () => {
      await validateRoute('/teams/cov/squads', schemas.teamSquadsSchema, 200)
    })

    test('Not Found', async () => {
      await validateRoute('/teams/abc/squads', schemas.teamSquadsSchema, 404)
    })
  })

  describe('/teams/:teamId/squads/1994-1995', () => {
    test('OK', async () => {
      await validateRoute('/teams/cov/squads/1994-1995', schemas.teamSquadSchema, 200)
    })

    test('Not Found', async () => {
      await validateRoute('/teams/abc/squads/1994-1995', schemas.teamSquadSchema, 404)
    })
  })

  describe('/teams/:teamId/statistics', () => {
    test('OK', async () => {
      await validateRoute('/teams/cov/statistics', schemas.teamStatsSchema, 200)
    })

    test('Not Found', async () => {
      await validateRoute('/teams/abc/statistics', schemas.teamStatsSchema, 404)
    })
  })

  describe('/seasons', () => {
    test('OK', async () => {
      const response = await validateRoute('/seasons', schemas.seasonsSchema, 200)
      const data = response.json()

      assert.equal(data.length, 10)
    })

    test('OK - with team filter', async () => {
      const response = await validateRoute('/seasons?team=shu', schemas.seasonsSchema, 200)
      const data = response.json()

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
      const response = await validateRoute('/managers', schemas.managersSchema, 200)
      const data = response.json()

      assert.equal(data.length, 98)
    })

    test('OK - with name filter', async () => {
      const response = await validateRoute('/managers?name=tony', schemas.managersSchema, 200)
      const data = response.json()

      assert.equal(data.length, 2)
    })

    test('Invalid Request', async () => {
      await validateRoute('/managers?name=@', schemas.managersSchema, 400)
    })
  })

  describe('/managers/:managerId', () => {
    test('OK', async () => {
      await validateRoute('/managers/terry-venables-2dba', schemas.managerSchema, 200)
    })

    test('Not Found', async () => {
      await validateRoute('/managers/joe-bloggs-1234', schemas.managerSchema, 404)
    })
  })
})
