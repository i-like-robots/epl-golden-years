import fs from 'fs'
import url from 'url'
import path from 'path'

function resolveFile(fileName) {
  const dirname = url.fileURLToPath(path.dirname(import.meta.url))
  return path.join(dirname, '..', 'static', fileName)
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
