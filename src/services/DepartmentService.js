import client from './http'

const resourceName = '/departments'

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
  addEmployee(departmentId, employeeId) {
    return client.put(`${resourceName}/${departmentId}/employees/${employeeId}`)
  },
  removeEmployee(departmentId, employeeId) {
    return client.delete(
      `${resourceName}/${departmentId}/employees/${employeeId}`
    )
  }
}
