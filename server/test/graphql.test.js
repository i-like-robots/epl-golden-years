import { describe, test } from 'node:test'
import assert from 'node:assert'
import jsonDiff from 'json-diff'
import snapshot from './snapshot.js'
import app from '../app.js'

console.log({ snapshot })

async function validateQuery(query) {
  const response = await app.inject({
    method: 'POST',
    url: '/graphql',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query }),
  })

  const data = response.json()

  const operation = query.match(/^query ([a-z]+) {/i).pop()
  const expected = await snapshot(operation, async () => data)
  const diff = jsonDiff.diffString(expected, data, { color: false })

  assert.equal(response.statusCode, 200)
  assert.equal(data.errors, undefined, data.errors)
  assert.equal(diff.length, 0, diff)
}

describe('GraphQL API', () => {
  test('get manager query', async () => {
    await validateQuery(
      `query GetManagerQuery {
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

  test('list managers query', async () => {
    await validateQuery(
      `query ListManagersQuery {
        managers(name: "tony") {
          managerId
          manager {
            displayName
          }
        }
      }`
    )
  })

  test('get player query', async () => {
    await validateQuery(
      `query GetPlayerQuery {
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

  test('list players query', async () => {
    await validateQuery(
      `query ListPlayersQuery {
        players(name: "david", position: G) {
          playerId
          player {
            displayName
          }
        }
      }`
    )
  })

  test('get season query', async () => {
    await validateQuery(
      `query GetSeasonQuery {
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

  test('list seasons query', async () => {
    await validateQuery(
      `query listSeasonsQuery {
        seasons(team: "shu") {
          seasonId
          season {
            displayName
          }
        }
      }`
    )
  })

  test('get team query', async () => {
    await validateQuery(
      `query GetTeamQuery {
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

  test('list teams query', async () => {
    await validateQuery(
      `query ListTeamsQuery {
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
