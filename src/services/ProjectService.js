import client from './http'

const resourceName = '/projects'

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
  },
  getEmployees(id) {
    return client.get(`${resourceName}/${id}/employees`)
  },
  addEmployee(projectId, employeeId) {
    return client.put(`${resourceName}/${projectId}/employees/${employeeId}`)
  },
  removeEmployee(projectId, employeeId) {
    return client.delete(`${resourceName}/${projectId}/employees/${employeeId}`)
  }
}
