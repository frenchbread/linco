import { Commit } from 'vuex'

export type State = {
  links: ILink[]
  linksLoading: boolean
  stats: IVisit[]
  statsLoading: boolean
}

export type IVisitRes = {
  status: string
  data?: IVisit[]
  error_message?: string
}

type IVisit = {
  _id: string
  count: number
  hash: string
}

export type Mutations<S = State> = {
  INIT_LINKS(state: S, links: ILink[]): void
  ADD_LINK(state: S, link: ILink): void
  REMOVE_LINK(state: S, hash: string): void
  SET_LINKS_LOADING(state: S, isLoading: boolean): void
  ADD_STATS(state: S, stats: IVisit[]): void
  SET_STATS_LOADING(state: S, isLoading: boolean): void
}

export type Actions<C = Commit> = {
  init_links({ commit }: { commit: C }): void
  add_link({ commit }: { commit: C }, link: string): void
  get_stats({ commit }: { commit: C }, url: string): void
  remove_link({ commit }: { commit: C }, hash: string): void
}

export type ILink = {
  hash_ref: string
  original_url: string
  shorten_url: string
}

export type ILinkRes = {
  status: string
  data?: ILink
  error_message?: string
}
