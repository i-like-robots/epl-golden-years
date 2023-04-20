const app = require('./app')

const port = process.env.PORT || 3000

app.listen({ port }, (error) => {
  if (error) {
    app.log.error(error)
    process.exit(1)
  }

  app.log.info(`App is listening at http://localhost:${port}`)
})
