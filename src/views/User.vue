<template>
  <div>
    <b-table striped :items="users" :fields="fields">
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

      <b-form-group label="Email" label-for="email">
        <b-form-input id="email" v-model="form.email" required></b-form-input>
      </b-form-group>

      <b-button type="submit" variant="primary">Salvar</b-button>
    </b-form>
  </div>
</template>

<script>
import UserService from '@/services/UserService'
import Swal from 'sweetalert2'

export default {
  data() {
    return {
      show: true,
      fields: [
        { key: 'name', label: 'Nome' },
        { key: 'email', label: 'Email' },
        { key: 'actions', label: '' }
      ],
      users: [],
      form: {
        id: null,
        name: '',
        email: ''
      }
    }
  },
  created() {
    this.getAll()
  },
  methods: {
    getAll() {
      UserService.getAll().then(response => (this.users = response.data))
    },
    save() {
      if (this.form.id) {
        UserService.update(this.form.id, this.form)
          .then(response => this.init('Usuário atualizado.'))
          .catch(error => Swal.fire('', error.response.data.message, 'error'))
      } else {
        UserService.create(this.form)
          .then(response => this.init('Usuário criado.'))
          .catch(error => Swal.fire('', error.response.data.message, 'error'))
      }
    },
    update(usuario) {
      this.form = JSON.parse(JSON.stringify(usuario))
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
          UserService.delete(id).then(response =>
            this.init('Usuário deletado.')
          )
        }
      })
    },
    resetForm() {
      this.form.id = null
      this.form.name = ''
      this.form.email = ''
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
