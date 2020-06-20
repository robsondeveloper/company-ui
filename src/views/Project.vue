<template>
  <div>
    <b-table striped :items="projects" :fields="fields">
      <template v-slot:cell(actions)="row">
        <b-button variant="info" class="mr-3" @click="update(row.item)"
          ><b-icon icon="pencil"></b-icon
        ></b-button>
        <b-button variant="danger" class="mr-3" @click="remove(row.item.id)"
          ><b-icon icon="trash"></b-icon
        ></b-button>
        <router-link
          :to="{
            name: 'ProjectEmployee',
            params: { id: row.item.id, name: row.item.name }
          }"
        >
          <b-button variant="primary" v-b-tooltip.hover title="Empregados"
            ><b-icon icon="people-fill"></b-icon
          ></b-button>
        </router-link>
      </template>
    </b-table>

    <b-form @submit.prevent="save" v-if="show">
      <b-form-group label="Nome" label-for="name">
        <b-form-input id="name" v-model="form.name" required></b-form-input>
      </b-form-group>

      <b-form-group label="Código" label-for="code">
        <b-form-input
          id="code"
          v-model.trim="form.code"
          placeholder="3 a 8 caracteres"
          required
        ></b-form-input>
      </b-form-group>

      <b-button type="submit" variant="primary">Salvar</b-button>
    </b-form>
  </div>
</template>

<script>
import ProjectService from '@/services/ProjectService'
import Swal from 'sweetalert2'

export default {
  data() {
    return {
      show: true,
      fields: [
        { key: 'name', label: 'Nome' },
        { key: 'code', label: 'Código' },
        { key: 'actions', label: '' }
      ],
      projects: [],
      form: {
        id: null,
        name: '',
        code: ''
      }
    }
  },
  created() {
    this.getAll()
  },
  methods: {
    getAll() {
      ProjectService.getAll().then(response => (this.projects = response.data))
    },
    save() {
      if (this.form.code.length < 3 || this.form.code.length > 8) {
        Swal.fire('', 'Código deve ter entre 3 e 8 caracteres', 'error')
        return
      }
      if (this.form.id) {
        ProjectService.update(this.form.id, this.form)
          .then(response => this.init('Projeto atualizado.'))
          .catch(error => Swal.fire('', error.response.data.message, 'error'))
      } else {
        ProjectService.create(this.form)
          .then(response => this.init('Projeto criado.'))
          .catch(error => Swal.fire('', error.response.data.message, 'error'))
      }
    },
    update(project) {
      this.form = JSON.parse(JSON.stringify(project))
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
          ProjectService.delete(id).then(response =>
            this.init('Projeto deletado.')
          )
        }
      })
    },
    resetForm() {
      this.form.id = null
      this.form.name = ''
      this.form.code = ''
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
