import { Context } from 'koa'
import Link from 'src/http/models/Link'
import Visit from 'src/http/models/Visit'

export default async function (ctx: Context) {
  const { hash } = ctx.params as { hash: string }

  try {
    const linkExists = await Link.findOne({ hash_ref: hash })

    if (linkExists) {
      const visit = new Visit({ hash_ref: linkExists.hash_ref })

      await visit.save()

      ctx.redirect(linkExists.original_url)
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
