<template>
  <div>
    <b-row align-h="center">
      <b-col md="6">
        <b-form @submit.prevent="login">
          <b-form-group label="Email" label-for="email">
            <b-form-input
              id="email"
              v-model="email"
              type="email"
              required
            ></b-form-input>
          </b-form-group>

          <b-form-group label="Senha" label-for="password">
            <b-form-input
              id="password"
              v-model="password"
              type="password"
              required
            ></b-form-input>
          </b-form-group>

          <b-button type="submit" size="lg">Login</b-button>

          <b-alert :show="show" variant="danger" class="mt-3">{{
            error
          }}</b-alert>
        </b-form>
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      error: null,
      show: false
    }
  },
  methods: {
    login() {
      this.$store
        .dispatch('login', {
          username: this.email,
          password: this.password
        })
        .then(() => {
          this.$router.push({ name: 'Home' })
        })
        .catch(error => {
          this.error = error.response.data.message
          this.show = true
        })
    }
  }
}
</script>

<style></style>
