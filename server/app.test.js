const { after, before, describe, test } = require('node:test')
const assert = require('node:assert')
const Ajv = require('ajv')
const addFormats = require('ajv-formats')
const app = require('./app')
const schemas = require('./schemas')

describe('App', () => {
  const ajv = new Ajv({ strict: false })

  addFormats(ajv)

  const validateRoute = async (path, schema, statusCode) => {
    const response = await app.inject({
      method: 'GET',
      url: path,
    })

    assert.equal(response.statusCode, statusCode)

    const valid = ajv.validate(schema.response[statusCode], response.json())

    if (!valid) {
      console.error('Errors: ', ajv.errors)
    }

    assert.ok(valid)
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
      await validateRoute('/players', schemas.playersSchema, 200)
    })

    test('OK - with filters', async () => {
      await validateRoute('/players', schemas.playersSchema, 200)
    })

    test('Invalid Request', async () => {
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
      await validateRoute('/teams', schemas.teamsSchema, 200)
    })

    test('OK - with filters', async () => {
      await validateRoute('/teams?name=a', schemas.teamsSchema, 200)
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
      await validateRoute('/seasons', schemas.seasonsSchema, 200)
    })

    test('OK - with filters', async () => {
      await validateRoute('/seasons?team=cov', schemas.seasonsSchema, 200)
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
})
