import axios from 'axios'

let api = axios.create({
  baseURL: 'http://localhost:8081/api'
})

export default api
