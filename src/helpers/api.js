import axios from 'axios'

let api = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? 'https://api.tickets.bigbikebash.org.uk/api' : 'http://localhost:8081/api'
})

export default api
