import axios from 'axios'

const client = axios.create({
  baseURL:
    process.env.NODE_ENV === 'production'
      ? 'https://lms-api-hrk.herokuapp.com'
      : 'http://localhost:8080',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

export default client
