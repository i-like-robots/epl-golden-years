const app = require('./app')

app.listen({ port: process.env.PORT || 3000 }, (error) => {
  if (error) {
    app.log.error(error)
    process.exit(1)
  }

  app.log.info('App is listening at http://localhost:3000')
})
