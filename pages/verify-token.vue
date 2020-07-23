<template>
  <v-layout column justify-center align-center>
    <h1 class="title text-uppercase my-3">Sign into OG Drive</h1>
    <v-card max-width="100%" width="400">
      <v-alert
        v-if="error.status"
        v-model="error.status"
        type="error"
        dismissible
      >
        {{ error.message }}
      </v-alert>
      <v-alert v-else v-model="success.status" type="success" dismissible>
        {{ success.message }}
      </v-alert>
      <v-form @submit.prevent.stop="logIn">
        <v-text-field
          v-model="user.token"
          label="Token"
          name="id"
          type="text"
          placeholder="*****"
          prepend-icon="mdi-account-outline"
          class="mx-3 my-4"
          validate-on-blur
        />
        <v-btn
          depressed
          color="primary"
          min-width="150px"
          min-height="40px"
          :loading="loading"
          type="submit"
          class="my-4 mx-3"
          @click.stop.prevent="verifyUser"
        >
          Verify account
        </v-btn>
      </v-form>
    </v-card>
    <p class="my-3 subtitle-2">
      <router-link v-if="success.status" to="login">
        Proceed to Login
      </router-link>
    </p>
  </v-layout>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data: () => ({
    isPassword: true,
    user: {
      token: '',
      email: '',
    },
    error: {
      status: false,
      message: '',
    },
    success: {
      status: false,
      message: '',
    },
  }),
  computed: {
    ...mapGetters(['getUser']),
  },
  mounted() {
    // const user = this.getUser(this);
  },
  methods: {
    verifyUser() {
      let user = JSON.parse(localStorage.getItem('user'));
      this.loading = true;
      console.log(user);
      this.user.email = user.email;
      this.$axios
        .post('users/verified', this.user)
        .then(() => {
          this.loading = false;
          this.success.status = true;
          this.success.message =
            'Successfully verified, please proceed to Login';
        })
        .catch((err) => {
          console.log(err);
          this.error.message = err.response.message;
          this.error.status = true;
          this.loading = false;
        });
    },
    login() {
      this.$router.push({ path: '/login' });
    },
  },
};
</script>

<style></style>
