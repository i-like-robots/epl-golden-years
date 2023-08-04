const { describe, test } = require('node:test')
const assert = require('node:assert')
const snapshot = require('./lib/snapshot')
const app = require('../app')

describe('GraphQL API', () => {
  const validateQuery = async (operation, query) => {
    const response = await app.inject({
      method: 'POST',
      url: '/graphql',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
    })

    const data = response.json()

    assert.equal(response.statusCode, 200)
    assert.equal(data.errors, undefined)

    const name = `graphql--${operation}`
    await snapshot(data, name)

    return response
  }

  test('get manager query', async (ctx) => {
    await validateQuery(
      ctx.name,
      `{
        manager(managerId: "terry-venables-6af0") {
          displayName
          history {
            seasonId
            season {
              displayName
            }
            teamId
          }
        }
      }`
    )
  })

  test('list managers query', async (ctx) => {
    await validateQuery(
      ctx.name,
      `{
        managers(name: "tony") {
          managerId
          manager {
            displayName
          }
        }
      }`
    )
  })

  test('get player query', async (ctx) => {
    await validateQuery(
      ctx.name,
      `{
        player(playerId: "kevin-phillips-b8f6") {
          displayName
          positionName
          positionCode
          dateOfBirth
          countryCode
          countryName
          history {
            seasonId
            season {
              displayName
            }
            teamId
          }
          album {
            seasonId
            season {
              displayName
            }
            teamId
            sticker
          }
          stats {
            total {
              appearances
              goals
            }
            history {
              seasonId
              season {
                displayName
              }
              appearances
              goals
            }
          }
        }
      }`
    )
  })

  test('list players query', async (ctx) => {
    await validateQuery(
      ctx.name,
      `{
        players(name: "david", position: G) {
          playerId
          player {
            displayName
            positionName
            stats {
              total {
                goals
              }
            }
          }
        }
      }`
    )
  })

  test('get season query', async (ctx) => {
    await validateQuery(
      ctx.name,
      `{
        season(seasonId: "1994-1995") {
          displayName
          ball
          start
          end
          hatTricks {
            playerId
            player {
              displayName
            }
            homeTeamId
            awayTeamId
            date
          }
          table {
            rank
            teamId
            points
          }
          topAssists {
            playerId
            player {
              displayName
            }
            assists
          }
          topCleanSheets {
            playerId
            player {
              displayName
            }
            cleanSheets
          }
          topScorers {
            playerId
            player {
              displayName
            }
            goals
          }
        }
      }`
    )
  })

  test('list seasons query', async (ctx) => {
    await validateQuery(
      ctx.name,
      `{
        seasons(team: "shu") {
          seasonId
          season {
            displayName
          }
        }
      }`
    )
  })

  test('get team query', async (ctx) => {
    await validateQuery(
      ctx.name,
      `{
        team(teamId: "shu") {
          optaId
          name
          city
          grounds
          seasons {
            seasonId
            season {
              start
              end
            }
          }
          stats {
            total {
              played
              wins
              draws
              losses
            }
            history {
              seasonId
              season {
                shortName
              }
              wins
              draws
              losses
              for
              against
            }
          }
          squads {
            seasonId
            season {
              start
              end
            }
            players {
              playerId
              appearances
              goals
            }
            managers {
              managerId
              manager {
                displayName
              }
            }
          }
        }
      }`
    )
  })

  test('list teams query', async (ctx) => {
    await validateQuery(
      ctx.name,
      `{
        teams(name: "man") {
          teamId
          team {
            name
            grounds
          }
        }
      }`
    )
  })
})
