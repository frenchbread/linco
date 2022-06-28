import { Commit, ActionTree, MutationTree } from 'vuex'
import { addLink, getStats, getRecent, removeLink } from '@/api'
import {
  State,
  ILink,
  ILinkRes,
  IVisitRes,
  Actions,
  Mutations
} from '@/types/store'

const state: State = {
  links: [],
  linksLoading: false,
  stats: [],
  statsLoading: false
}

const mutations: MutationTree<State> & Mutations = {
  INIT_LINKS(state, links) {
    state.links = links
  },
  ADD_LINK(state, link) {
    state.links.push(link)
  },
  REMOVE_LINK(state, hash) {
    const index = state.links
      .map(({ hash_ref }: ILink) => hash_ref)
      .indexOf(hash)

    state.links.splice(index, 1)
  },
  SET_LINKS_LOADING(state, isLoading) {
    state.linksLoading = isLoading
  },
  ADD_STATS(state, stats) {
    state.stats = stats
  },
  SET_STATS_LOADING(state, isLoading) {
    state.statsLoading = isLoading
  }
}

const actions: ActionTree<State, State> & Actions = {
  init_links({ commit }: { commit: Commit }) {
    commit('SET_LINKS_LOADING', true)
    getRecent()
      .then(({ status, data, error_message }: ILinkRes) => {
        if (status === 'ok') {
          commit('INIT_LINKS', data)
          commit('SET_LINKS_LOADING', false)
        } else {
          alert(error_message)
          commit('SET_LINKS_LOADING', false)
        }
      })
      .catch(err => {
        alert(err.message)
        commit('SET_LINKS_LOADING', false)
      })
  },
  add_link({ commit }: { commit: Commit }, url: string) {
    addLink(url)
      .then(({ status, data, error_message }: ILinkRes) => {
        if (status === 'ok') {
          commit('ADD_LINK', data)
        } else {
          alert(error_message)
        }
      })
      .catch((err: any) => {
        alert(err.message)

        commit('SET_LINKS_LOADING', false)
      })
  },
  remove_link({ commit }: { commit: Commit }, hash) {
    commit('SET_LINKS_LOADING', true)
    removeLink(hash)
      .then(
        ({ status, ok_message }: { status: string; ok_message: string }) => {
          if (status === 'ok') {
            commit('REMOVE_LINK', hash)

            console.log(ok_message)

            commit('SET_LINKS_LOADING', false)
          } else {
            alert('something went wrong')

            commit('SET_LINKS_LOADING', false)
          }
        }
      )
      .catch(err => {
        alert(err.message)
        commit('SET_LINKS_LOADING', false)
      })
  },
  get_stats({ commit }: { commit: Commit }, hash: string) {
    commit('SET_STATS_LOADING', true)
    return getStats(hash)
      .then(({ status, data }: IVisitRes) => {
        console.log(data)
        if (status === 'ok') {
          commit('ADD_STATS', data)
          commit('SET_STATS_LOADING', false)

          return true
        } else {
          commit('SET_STATS_LOADING', false)

          return false
        }
      })
      .catch((err: any) => {
        alert(err.message)
        commit('SET_STATS_LOADING', false)

        return false
      })
  }
}

const getters = {
  links: (state: State) => state.links,
  linksLoading: (state: State) => state.linksLoading,
  stats: (state: State) => state.stats
}

export default { state, actions, mutations, getters }
