<template>
  <div>
    <b-table striped :items="employees" :fields="fields">
      <template v-slot:cell(actions)="row">
        <b-button variant="info" class="mr-3" @click="update(row.item)"
          ><b-icon icon="pencil"></b-icon
        ></b-button>
        <b-button variant="danger" class="mr-3" @click="remove(row.item.id)"
          ><b-icon icon="trash"></b-icon
        ></b-button>
      </template>
    </b-table>

    <b-form @submit.prevent="save" v-if="show">
      <b-form-group label="Nome" label-for="name">
        <b-form-input id="name" v-model="form.name" required></b-form-input>
      </b-form-group>

      <b-form-group label="Data de Nascimento" label-for="birth">
        <v-date-picker id="birth" v-model="form.birth" locale="pt-BR" />
      </b-form-group>

      <b-form-group label="Salário" label-for="salary">
        <money
          v-model="form.salary"
          v-bind="money"
          id="salary"
          class="form-control"
        ></money>
      </b-form-group>

      <b-button type="submit" variant="primary">Salvar</b-button>
    </b-form>
  </div>
</template>

<script>
import EmployeeService from '@/services/EmployeeService'
import Swal from 'sweetalert2'
import { Money } from 'v-money'

export default {
  components: {
    Money
  },
  data() {
    return {
      show: true,
      fields: [
        { key: 'name', label: 'Nome' },
        { key: 'birth', label: 'Nascimento' },
        { key: 'salary', label: 'Salário' },
        { key: 'actions', label: '' }
      ],
      employees: [],
      form: {
        id: null,
        name: '',
        birth: null,
        salary: ''
      },
      money: {
        decimal: ',',
        thousands: '.',
        prefix: 'R$ ',
        precision: 2,
        masked: false
      }
    }
  },
  created() {
    this.getAll()
  },
  methods: {
    getAll() {
      EmployeeService.getAll().then(
        response => (this.employees = response.data)
      )
    },
    save() {
      if (!this.form.birth) {
        Swal.fire('', 'informe sua data de nascimento', 'error')
        return
      }
      if (this.form.salary <= 0 || this.form.salary > 999999.99) {
        Swal.fire('', 'Salário com valor inválido', 'error')
        return
      }
      let formData = {
        id: this.form.id,
        name: this.form.name,
        birth: this.form.birth.toLocaleDateString('pt-BR', {}),
        salary: this.form.salary
      }
      if (this.form.id) {
        EmployeeService.update(formData.id, formData)
          .then(response => this.init('Empregado atualizado.'))
          .catch(error => Swal.fire('', error.response.data.message, 'error'))
      } else {
        EmployeeService.create(formData)
          .then(response => this.init('Empregado criado.'))
          .catch(error => Swal.fire('', error.response.data.message, 'error'))
      }
    },
    update(employee) {
      this.form.id = employee.id
      this.form.name = employee.name
      let employeeBirth = employee.birth.split('/')
      this.form.birth = new Date(
        employeeBirth[2],
        employeeBirth[1] - 1,
        employeeBirth[0]
      )
      this.form.salary = employee.salary
    },
    remove(id) {
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
          EmployeeService.delete(id)
            .then(response => this.init('Empregado deletado.'))
            .catch(error => Swal.fire('', error.response.data.message, 'error'))
        }
      })
    },
    resetForm() {
      this.form.id = null
      this.form.name = ''
      this.form.birth = null
      this.form.salary = ''
      // Trick to reset/clear native browser form validation state
      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
    },
    init(message) {
      Swal.fire('', message, 'success')
      this.getAll()
      this.resetForm()
    }
  }
}
</script>

<style></style>
