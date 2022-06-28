import { Context } from 'koa'
import { isUrlValid, shortenUrl } from 'src/lib/url'
import Link from 'src/http/models/Link'

export default async function (ctx: Context) {
  const { url } = ctx.query as { url: string }

  if (isUrlValid(url)) {
    const { original_url, hash_ref } = shortenUrl(url)

    const link = new Link({ original_url, hash_ref })

    try {
      const newLink = await link.save()

      ctx.body = {
        status: 'ok',
        data: {
          hash_ref: newLink.hash_ref,
          // shorten_url: new URL(newLink.hash_ref, config.pubHostExample),
          original_url: newLink.original_url
        }
      }
    } catch (err: any) {
      ctx.body = {
        status: 'err',
        error_message: err.message
      }
    }
  } else {
    ctx.body = {
      status: 'err',
      error_message: 'Incorrect URL format'
    }
  }
}
