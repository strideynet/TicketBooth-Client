import api from '@/helpers/api'

export default {
  name: 'admin',
  namespaced: true,
  state: {
    orders: [],
    participants: [],
    users: [],
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
    }
  },
  actions: {
    login: ({ commit, dispatch, state }, auth) => {
      return api.post('/auth', auth)
        .then(res => {
          commit('setJWT', res.data.token)
        })
    }
  }
}
