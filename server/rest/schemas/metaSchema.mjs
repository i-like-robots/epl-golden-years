import { API_URL } from '../../lib/constants.mjs'

export default {
  info: {
    title: 'EPL Golden Years - OpenAPI',
    description:
      'A free and open API to explore data from the first 10 years of The Premier League.',
  },
  servers: [{ url: API_URL }],
  tags: [
    { name: 'player', description: 'Everything about players' },
    { name: 'season', description: 'Everything about seasons' },
    { name: 'team', description: 'Everything about teams' },
    { name: 'manager', description: 'Everything about managers' },
  ],
  schemes: ['http'],
  produces: ['application/json'],
  exposeRoute: true,
}
