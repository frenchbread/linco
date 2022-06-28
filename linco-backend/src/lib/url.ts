import { URL } from 'url'
import UniqueId from 'short-unique-id'

export function isUrlValid(url: string): boolean {
  try {
    new URL(url)

    return true
  } catch (error) {
    return false
  }
}

export function shortenUrl(url: string): {
  original_url: string
  hash_ref: string
} {
  const uri = new URL(url)

  const id = new UniqueId({ length: 6 })
  const uuid = id()

  return {
    original_url: uri.toString(),
    hash_ref: uuid
  }
}
