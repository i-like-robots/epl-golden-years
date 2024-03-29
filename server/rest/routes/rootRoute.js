import { playersUrl, teamsUrl, seasonsUrl, managersUrl } from '../urls.js'

export default function rootRoute(_, response) {
  response.send({
    players: playersUrl(),
    teams: teamsUrl(),
    seasons: seasonsUrl(),
    managers: managersUrl(),
  })
}
