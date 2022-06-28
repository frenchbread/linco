import Router from 'koa-router'
import shortenUrl from './handlers/shortenUrl'
import redirect from './handlers/redirect'
import getStats from './handlers/getStats'
import getRecent from './handlers/getRecent'
import deleteLink from './handlers/deleteLink'

const router = new Router()

router.get('/', ctx => {
  ctx.body = {
    status: 'ok'
  }
})

router.post('/shorten', shortenUrl)

router.get('/recent', getRecent)

router.get('/stats', getStats)

router.get('/:hash', redirect)

router.delete('/:hash', deleteLink)

export default router
