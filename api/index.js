import app from '../server/app.js'

export default async (req, res) => {
  await app.ready()
  app.server.emit('request', req, res)
}
