import { Context } from 'koa'
import Link from 'src/http/models/Link'

export default async function (ctx: Context) {
  try {
    const links = await Link.find().sort({ created_at: -1 }) // .limit(15)

    ctx.body = {
      status: 'ok',
      data: links
    }
  } catch (err: any) {
    ctx.body = {
      status: 'err',
      error_message: err.message
    }
  }
}
