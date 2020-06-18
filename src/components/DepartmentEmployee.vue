<template>
  <div>
    <b-card>
      <b-card-title>Departamento: {{ name }}</b-card-title>
      <b-card-body>
        <b-table striped :items="employees" :fields="fields">
          <template v-slot:cell(actions)="row">
            <b-button
              variant="danger"
              class="mr-3"
              v-b-tooltip.hover
              title="Desvincular"
              @click="remove(row.item.id)"
              ><b-icon icon="trash"></b-icon
            ></b-button>
          </template>
        </b-table>
      </b-card-body>
    </b-card>

    <b-card class="mt-3" header="Vincular Empregado ao Departamento">
      <b-form @submit.prevent="addEmployee" v-if="show">
        <b-form-group
          id="input-group-1"
          label="Empregados"
          label-for="employee"
        >
          <b-form-select
            id="employee"
            v-model="selected"
            :options="allEmployees"
            value-field="id"
            text-field="name"
            required
          >
          </b-form-select>
        </b-form-group>

        <b-button type="submit" variant="primary">Vincular Empregado</b-button>
      </b-form>
    </b-card>
  </div>
</template>

<script>
import DepartmentService from '@/services/DepartmentService'
import EmployeeService from '@/services/EmployeeService'
import Swal from 'sweetalert2'

export default {
  name: 'DepartmentEmployee',
  props: {
    id: String,
    name: String
  },
  data() {
    return {
      show: true,
      fields: [
        { key: 'id', label: 'UUID' },
        { key: 'name', label: 'Nome' },
        { key: 'actions', label: '' }
      ],
      employees: [],
      allEmployees: [],
      selected: null
    }
  },
  created() {
    this.getEmployees()
    EmployeeService.getAll().then(
      response => (this.allEmployees = response.data)
    )
  },
  methods: {
    getEmployees() {
      DepartmentService.getEmployees(this.id).then(
        response => (this.employees = response.data)
      )
    },
    addEmployee() {
      DepartmentService.addEmployee(this.id, this.selected)
        .then(response => this.init('Empregado vinculado ao Departamento.'))
        .catch(error => Swal.fire('', error.response.data.message, 'error'))
    },
    removeEmployee(employeeId) {
      DepartmentService.removeEmployee(this.id, employeeId)
        .then(response => this.init('Empregado desvinculado do Departamento.'))
        .catch(error => Swal.fire('', error.response.data.message, 'error'))
    },
    remove(employeeId) {
      Swal.fire({
        title: 'Tem certeza?',
        text: '',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'SIM',
        cancelButtonText: 'NÃO'
      }).then(result => {
        if (result.value) {
          this.removeEmployee(employeeId)
        }
      })
    },
    resetForm() {
      this.selected = null
      // Trick to reset/clear native browser form validation state
      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
    },
    init(message) {
      Swal.fire('', message, 'success')
      this.getEmployees()
      this.resetForm()
    }
  }
}
</script>

<style></style>
