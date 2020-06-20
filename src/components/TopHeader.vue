<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="dark">
      <b-navbar-brand href="#">COMPANY UI</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item to="/">Página Inicial</b-nav-item>
          <b-nav-item v-if="loggedIn" to="/department"
            >Departamentos</b-nav-item
          >
          <b-nav-item v-if="loggedIn" to="/employee">Empregados</b-nav-item>
          <b-nav-item v-if="loggedIn" to="/project">Projetos</b-nav-item>
          <b-nav-item v-if="loggedIn" to="/user">Usuários</b-nav-item>
          <b-nav-item v-if="loggedIn" to="/about">Sobre</b-nav-item>
        </b-navbar-nav>

        <b-navbar-nav class="ml-auto">
          <b-nav-text v-if="loggedIn" class="mr-3">{{ name }}</b-nav-text>
          <router-link
            v-if="!loggedIn"
            to="/login"
            class="btn btn-outline-success"
            >Login</router-link
          >
          <button
            v-else
            type="button"
            class="btn btn-outline-danger"
            @click="logout"
          >
            Logout
          </button>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import { authComputed } from '@/store/helpers'

export default {
  name: 'TopHeader',
  computed: {
    ...authComputed
  },
  methods: {
    logout() {
      this.$store.dispatch('logout')
    }
  }
}
</script>

<style></style>
