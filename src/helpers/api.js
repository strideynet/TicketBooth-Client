import axios from 'axios'
import store from '../store'

let api = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? 'https://api.bigbikebash.org.uk/api' : 'http://localhost:8081/api'
})

api.interceptors.request.use((config) => {
  if (store.state.admin.jwt) {
    config.headers['Authorization'] = 'Bearer ' + store.state.admin.jwt
  }

  return config
})

export default api
