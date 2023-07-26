const fastify = require('fastify')
const restAPI = require('./routers/rest-api')

const app = fastify({
  logger: { level: process.env.LOG_LEVEL || 'info' },
})

app.register(restAPI)

app.get('/swagger', (_, response) => {
  response.send(app.swagger())
})

module.exports = app
