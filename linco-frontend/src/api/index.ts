import axios from 'axios'

const api = axios.create({
  baseURL: process.env.VUE_APP_PUB_DOMAIN_EXAMPLE
})

export function addLink(url: string) {
  return api.post(`/shorten?url=${url}`).then(({ data }) => data)
}

export function removeLink(hash: string) {
  return api.delete(`/${hash}`).then(({ data }) => data)
}

export function getRecent() {
  return api.get(`/recent`).then(({ data }) => data)
}

export function getStats(hash: string) {
  return api.get(`/stats?hash=${hash}`).then(({ data }) => data)
}
