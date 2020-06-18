import client from './http'

const resourceName = '/employees'

export default {
  getAll() {
    return client.get(resourceName)
  }
}
