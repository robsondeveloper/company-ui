<template>
  <div>
    <b-card header="Produto">
      <b-form @submit.prevent="save" v-if="show">
        <b-form-group label="Nome" label-for="name">
          <b-form-input id="name" v-model="form.name" required></b-form-input>
        </b-form-group>

        <b-form-group label="Descrição" label-for="description">
          <b-form-input
            id="description"
            v-model="form.description"
          ></b-form-input>
        </b-form-group>

        <b-form-group label="Preço" label-for="price">
          <money
            v-model="form.price"
            v-bind="money"
            id="price"
            class="form-control"
          ></money>
        </b-form-group>

        <b-form-group label="Foto" label-for="file">
          <b-form-file
            id="file"
            v-model="form.file"
            accept="image/*"
            placeholder="Escolha um arquivo ou solte-o aqui..."
            drop-placeholder="Solte o arquivo aqui..."
          ></b-form-file>
        </b-form-group>

        <b-form-group label="Ativo" label-for="active">
          <b-form-radio-group
            id="active"
            v-model="form.active"
            :options="options"
            name="active"
            required
          ></b-form-radio-group>
        </b-form-group>

        <b-button type="submit" variant="primary">Salvar</b-button>
      </b-form>
    </b-card>

    <b-table striped :items="products" :fields="fields" caption-top>
      <template v-slot:table-caption>Produtos</template>
      <template v-slot:cell(actionUpdate)="data" style="width:150px">
        <b-button variant="info" @click="update(data.item)"
          ><b-icon icon="pencil"></b-icon
        ></b-button>
      </template>
      <template v-slot:cell(actionRemove)="data" style="width:150px">
        <b-button variant="danger" @click="remove(data.item.id)"
          ><b-icon icon="trash"></b-icon
        ></b-button>
      </template>
    </b-table>
  </div>
</template>

<script>
import ProductService from '@/services/ProductService'
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
        { key: 'description', label: 'Descrição' },
        { key: 'price', label: 'Preço' },
        { key: 'photo', label: 'Foto' },
        { key: 'active', label: 'Ativo' },
        { key: 'actionUpdate', label: '' },
        { key: 'actionRemove', label: '' }
      ],
      products: [],
      options: [
        { text: 'SIM', value: true },
        { text: 'NÃO', value: false }
      ],
      form: {
        id: null,
        name: '',
        description: '',
        price: '',
        file: null,
        active: null
      },
      money: {
        decimal: ',',
        thousands: '.',
        prefix: 'R$ ',
        precision: 2
      }
    }
  },
  created() {
    this.getAll()
  },
  methods: {
    getAll() {
      ProductService.getAll().then(response => (this.products = response.data))
    },
    save() {
      if (this.form.price <= 0 || this.form.price > 999999.99) {
        Swal.fire('', 'Preço com valor inválido', 'error')
        return
      }
      if (this.form.file && !this.form.file.type.startsWith('image')) {
        Swal.fire(
          '',
          'extensão de arquivo inválida, selecione uma imagem',
          'error'
        )
        return
      }
      let formData = new FormData()
      formData.append('id', this.form.id)
      formData.append('name', this.form.name)
      formData.append('price', this.form.price)
      if (this.form.file) {
        formData.append('file', this.form.file)
      }
      formData.append('active', this.form.active)

      if (this.form.id) {
        ProductService.update(this.form.id, formData)
          .then(response => this.init('Produto atualizado.'))
          .catch(error => Swal.fire('', error.response.data.message, 'error'))
      } else {
        ProductService.create(formData)
          .then(response => this.init('Produto criado.'))
          .catch(error => Swal.fire('', error.response.data.message, 'error'))
      }
    },
    update(product) {
      this.form.id = product.id
      this.form.name = product.name
      this.form.description = product.description
      this.form.price = product.price
      this.form.active = product.active
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
          ProductService.delete(id).then(response =>
            this.init('Produto deletado.')
          )
        }
      })
    },
    resetForm() {
      this.form.id = null
      this.form.name = ''
      this.form.description = ''
      this.form.price = ''
      this.form.file = null
      this.form.active = null
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

<style>
.custom-file-input:lang(pt-br) ~ .custom-file-label::after {
  content: 'Procurar';
}
</style>
