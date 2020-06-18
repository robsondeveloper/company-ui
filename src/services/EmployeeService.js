import client from './http'

const resourceName = '/employees'

export default {
  getAll() {
    return client.get(resourceName)
  },
  create(data) {
    return client.post(resourceName, data)
  },
  update(id, data) {
    return client.put(`${resourceName}/${id}`, data)
  },
  delete(id) {
    return client.delete(`${resourceName}/${id}`)
  }
}
