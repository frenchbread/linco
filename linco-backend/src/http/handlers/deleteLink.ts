import { Context } from 'koa'
import Link from 'src/http/models/Link'
import Visit from 'src/http/models/Visit'

export default async function (ctx: Context) {
  const { hash } = ctx.params as { hash: string }

  try {
    const link = await Link.findOne({ hash_ref: hash })

    if (link) {
      const links = await Link.remove({ _id: link._id })
      const visits = await Visit.remove({ hash_ref: link.hash_ref })

      ctx.body = {
        status: 'ok',
        ok_message: `Removed ${links.deletedCount} links & ${visits.deletedCount} visit records.`
      }
    } else {
      ctx.body = {
        status: 'err',
        error_message: 'Such link does not exist'
      }
    }
  } catch (err: any) {
    ctx.body = {
      status: 'err',
      error_message: err.message
    }
  }
}
