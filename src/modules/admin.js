import api from '@/helpers/api'

export default {
  name: 'admin',
  namespaced: true,
  state: {
    orders: [],
    participants: [],
    users: [],
    loading: [],
    jwt: null
  },
  mutations: {
    setOrders: (state, orders) => {
      state.orders = orders
    },
    setParticipants: (state, participants) => {
      state.participants = participants
    },
    setUsers: (state, users) => {
      state.users = users
    },
    setJWT: (state, jwt) => {
      state.jwt = jwt
    },
    startLoading: (state, loader) => {
      const index = state.loading.indexOf(loader)

      if (index === -1) {
        state.loading.push(loader)
      }
    },
    stopLoading: (state, loader) => {
      const index = state.loading.indexOf(loader)

      if (index > -1) {
        state.loading.splice(index, 1)
      }
    }
  },
  actions: {
    login: ({ commit }, auth) => {
      return api.post('/auth', auth)
        .then(res => {
          commit('setJWT', res.data.token)
        })
    },
    fetchOrders: ({ commit }) => {
      commit('startLoading', 'fetch orders')

      return api.get('/orders')
        .then(res => {
          commit('setOrders', res.data)
          commit('stopLoading', 'fetch orders')
        })
    },
    fetchParticipants: ({ commit }) => {
      commit('startLoading', 'fetch participants')

      return api.get('/participants')
        .then(res => {
          commit('setParticipants', res.data)
          commit('stopLoading', 'fetch participants')
        })
    },
    fetchAllData: ({ dispatch }) => {
      return Promise.all([dispatch('fetchOrders'), dispatch('fetchParticipants')])
    }
  },
  getters: {
    isAnythingLoading: state => state.loading.length > 0
  }
}
