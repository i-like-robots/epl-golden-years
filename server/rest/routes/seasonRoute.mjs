import seasonModel from '../../models/seasonModel.mjs'
import seasonLinksModel from '../../models/seasonLinksModel.mjs'
import {
  seasonHatTricksUrl,
  seasonTableUrl,
  seasonTopScorersUrl,
  seasonTopAssistsUrl,
  seasonTopCleanSheetsUrl,
  seasonUrl,
} from '../urls.mjs'

export default function seasonRoute(request, response) {
  const { seasonId } = request.params
  const season = seasonModel(seasonId)

  if (season) {
    const links = seasonLinksModel(seasonId)

    response.send({
      ...season,
      table: seasonTableUrl(seasonId),
      topScorers: seasonTopScorersUrl(seasonId),
      topAssists: seasonTopAssistsUrl(seasonId),
      topCleanSheets: seasonTopCleanSheetsUrl(seasonId),
      hatTricks: seasonHatTricksUrl(seasonId),
      links: {
        previous: links.previousId ? seasonUrl(links.previousId) : null,
        next: links.nextId ? seasonUrl(links.nextId) : null,
      },
    })
  } else {
    response.code(404)
    response.send({ error: 'Season not found' })
  }
}
