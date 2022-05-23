import axios from 'axios'

export default axios.create({
  baseURL: 'http://localhost:3001/search',
  timeout: 1000,
  headers: { 'Content-Type': 'application/json' },
})