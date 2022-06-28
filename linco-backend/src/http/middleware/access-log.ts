import { Middleware } from 'koa'
import { format } from 'util'
import { hrtime } from 'process'
import prettyHrtime from 'pretty-hrtime'
import logger from 'src/lib/logger'

const accessLogLogger = logger.getChildLogger({
  displayFilePath: 'hidden'
})

export function accessLog(): Middleware {
  return async (ctx, next) => {
    const start = hrtime()
    try {
      await next()
    } finally {
      const duration = hrtime(start)
      const logFormat = `%s - '%s %s' %s %s - %s`

      accessLogLogger.info(
        format(
          logFormat,
          ctx.ip,
          ctx.method,
          ctx.path,
          ctx.status,
          ctx.length ?? '-',
          prettyHrtime(duration, { precise: true })
        )
      )
    }
  }
}
