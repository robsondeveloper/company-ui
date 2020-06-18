import axios from 'axios'
import Swal from 'sweetalert2'

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

client.interceptors.response.use(
  response => response, // simply return the response
  error => {
    if (error.response.status === 401) {
      // if we catch a 401 error
      this.$store.dispatch('logout') // force a log out
    }
    /// Swal.fire('', error.response.data.message, 'error')
    return Promise.reject(error) // reject the Promise, with the error as the reason
  }
)

export default client
