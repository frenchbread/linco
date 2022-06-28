import config from 'src/config'
import logger from 'src/lib/logger'
import app from './app'
import router from './routes'

export function startHttpServer(): typeof app {
  router.stack.forEach(route =>
    logger.debug(`Registered route ${route.methods} ${route.path}`)
  )

  app.listen(config.httpPort, config.httpHost, () => {
    logger.info(`Server listening on post ${config.httpPort}`)
  })

  return app
}
