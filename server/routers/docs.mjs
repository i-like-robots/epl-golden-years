import fs from 'fs'
import path from 'path'

function resolveFile(fileName) {
  return path.join(__dirname, '..', 'static', fileName)
}

export default function docsRouter(app, _, done) {
  app.get('/graphiql-ui', (_, response) => {
    const stream = fs.createReadStream(resolveFile('graphiql-ui.html'))

    response.type('text/html')
    response.send(stream)
  })

  app.get('/swagger-ui', (_, response) => {
    const stream = fs.createReadStream(resolveFile('swagger-ui.html'))

    response.type('text/html')
    response.send(stream)
  })

  done()
}
