<template>
  <div>
    <b-table striped :items="departments" :fields="fields">
      <template v-slot:cell(actions)="row">
        <b-button variant="info" class="mr-3" @click="update(row.item)"
          ><b-icon icon="pencil"></b-icon
        ></b-button>
        <b-button variant="danger" @click="remove(row.item.id)"
          ><b-icon icon="trash"></b-icon
        ></b-button>
      </template>
    </b-table>

    <b-form @submit.prevent="save" v-if="show">
      <b-form-group label="Nome" label-for="name">
        <b-form-input id="name" v-model="form.name" required></b-form-input>
      </b-form-group>

      <b-form-group label="Número" label-for="number">
        <b-form-input id="number" v-model="form.number" required></b-form-input>
      </b-form-group>

      <b-button type="submit" variant="primary">Salvar</b-button>
    </b-form>
  </div>
</template>

<script>
import DepartmentService from '@/services/DepartmentService'
import Swal from 'sweetalert2'

export default {
  data() {
    return {
      show: true,
      fields: [
        { key: 'name', label: 'Nome' },
        { key: 'number', label: 'Número' },
        { key: 'actions', label: '' }
      ],
      departments: [],
      form: {
        id: null,
        name: '',
        number: null
      }
    }
  },
  created() {
    this.getAll()
  },
  methods: {
    getAll() {
      DepartmentService.getAll().then(response => {
        this.departments = response.data
      })
    },
    save() {
      if (this.form.id) {
        DepartmentService.update(this.form.id, this.form).then(response => {
          this.init('Departamento atualizado.')
        })
      } else {
        DepartmentService.create(this.form).then(response => {
          this.init('Departamento criado.')
        })
      }
    },
    update(department) {
      this.form = JSON.parse(JSON.stringify(department))
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
          DepartmentService.delete(id).then(response => {
            this.init('Departamento deletado.')
          })
        }
      })
    },
    resetForm() {
      this.form.id = null
      this.form.name = ''
      this.form.number = null
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
