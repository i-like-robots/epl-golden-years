const { describe, test } = require('node:test')
const assert = require('node:assert')
const snapshot = require('data-snapshot').default
const jsonDiff = require('json-diff')
const app = require('../app')

describe('GraphQL API', () => {
  const validateQuery = async (testName, query) => {
    async function fetch () {
      const response = await app.inject({
        method: 'POST',
        url: '/graphql',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
      })

      return response.json()
    }

    const expected = await snapshot(testName, () => fetch())
    const actual = await fetch()
    const diff = jsonDiff.diffString(expected, actual, { color: false })

    assert.equal(actual.errors, undefined, actual.errors)
    assert.equal(diff.length, 0, diff)
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
            team {
              name
            }
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
            team {
              name
            }
          }
          album {
            seasonId
            season {
              displayName
            }
            teamId
            team {
              name
            }
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
            homeTeam {
              name
            }
            awayTeamId
            awayTeam {
              name
            }
            date
          }
          table {
            rank
            teamId
            team {
              name
            }
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
              displayName
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
              displayName
            }
            players {
              playerId
              player {
                displayName
              }
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
          }
        }
      }`
    )
  })
})
