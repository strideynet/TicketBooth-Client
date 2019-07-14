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
    deleteParticipant: (state, participant) => {
      state.participants = state.participants.filter(val => val.id !== participant.id)
    },
    updateParticipant: (state, participant) => {
      state.participants = [
        ...state.participants.filter(val => val.id !== participant.id),
        participant
      ]
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
    login: async ({ commit }, auth) => {
      const res = await api.post('/auth', auth)

      commit('setJWT', res.data.token)
    },
    fetchOrders: async ({ commit }) => {
      commit('startLoading', 'fetch orders')

      const res = await api.get('/orders')

      commit('setOrders', res.data)
      commit('stopLoading', 'fetch orders')
    },
    fetchParticipants: async ({ commit }) => {
      commit('startLoading', 'fetch participants')

      const res = await api.get('/participants')

      commit('setParticipants', res.data)
      commit('stopLoading', 'fetch participants')
    },
    deleteParticipant: async ({ commit }, participant) => {
      await api.delete(`/participants/${participant.id}`)
      commit('deleteParticipant', participant)
    },
    patchParticipant: async ({ commit }, participant) => {
      const res = await api.patch(`/participants/${participant.id}`, participant)
      commit('updateParticipant', res.data)
    },
    fetchAllData: ({ dispatch }) => {
      return Promise.all([dispatch('fetchOrders'), dispatch('fetchParticipants')])
    }
  },
  getters: {
    isAnythingLoading: state => state.loading.length > 0
  }
}
