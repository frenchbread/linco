import { Context } from 'koa'
import spacetime from 'spacetime'
import Link from 'src/http/models/Link'
import Visit from 'src/http/models/Visit'

export default async function (ctx: Context) {
  const { hash } = ctx.query as { hash: string }

  if (hash) {
    try {
      const link = await Link.findOne({ hash_ref: hash })

      if (!link) {
        ctx.body = {
          status: 'err',
          error_message: 'No link with such hash'
        }

        return
      }

      console.log(spacetime().startOf('month').epoch, Date.now())

      const res = await Visit.aggregate([
        {
          $match: {
            visited_at: {
              $gte: spacetime().startOf('month').d
            },
            hash_ref: { $eq: hash }
          }
        },
        {
          $group: {
            _id: {
              $dateToString: { format: '%Y-%m-%d', date: '$visited_at' } // -%H-%M
            },
            count: { $sum: 1 },
            hash: { $first: '$hash_ref' }
          }
        }
      ])

      ctx.body = {
        status: 'ok',
        data: res
      }
    } catch (err: any) {
      ctx.body = {
        status: 'error',
        error_message: err.message
      }
    }
  } else {
    ctx.body = {
      status: 'error',
      error_message: 'Shorened URL referece was not provided'
    }
  }
}
