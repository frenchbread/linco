import Koa from 'koa'

import json from 'koa-json'
import bodyparser from 'koa-bodyparser'
import cors from 'koa-cors'
import router from './routes'
import { accessLog } from './middleware/access-log'

const app = new Koa()

app.use(json())
app.use(bodyparser())
app.use(accessLog())
app.use(cors())

app.use(router.routes()).use(router.allowedMethods())

export default app
