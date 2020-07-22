<template>
  <v-layout column justify-center align-center>
    <h1 class="title text-uppercase my-3">Please input your new password</h1>
    <v-card max-width="100%" width="400">
      <v-alert
        v-if="error.status"
        v-model="error.status"
        type="error"
        dismissible
      >
        {{ error.message }}
      </v-alert>
      <v-alert v-else v-model="signUpSuccess" type="success" dismissible>
        {{ success.message }}
      </v-alert>
      <v-form @submit.prevent.stop="changePassword">
        <v-text-field
          v-model="user.new_password"
          name="password"
          :type="isPassword ? 'password' : 'text'"
          :append-icon="isPassword ? 'mdi-eye' : 'mdi-eye-off'"
          label="Password"
          placeholder="********"
          prepend-icon="mdi-account-lock-outline"
          @click:append="isPassword = !isPassword"
        />
        <v-btn
          depressed
          color="primary"
          min-width="150px"
          min-height="40px"
          :loading="loading"
          type="submit"
          class="my-4 mx-3"
          @click.stop.prevent="changePassword"
        >
          Change Password
        </v-btn>
      </v-form>
    </v-card>

    <router-link
      v-if="signUpSuccess"
      to="/login"
      class="forgot caption font-weight-bold float-right"
    >
      Login
    </router-link>
  </v-layout>
</template>
<script>
import { mapGetters } from 'vuex';

export default {
  data: () => ({
    isPassword: true,
    signUpSuccess: false,
    user: {
      new_password: '',
      token: '',
    },
    loading: false,
    error: {
      status: false,
      message: '',
    },
    success: {
      message: '',
    },
  }),
  computed: {
    ...mapGetters(['getResetToken']),
    id() {
      return this.$route.params.token;
    },
  },
  mounted() {
    this.resetUser(this.id);
  },
  methods: {
    changePassword() {
      this.loading = true;
      this.user.token = this.id;
      this.$axios
        .post('users/reset-password', this.user)
        .then(() => {
          this.loading = false;
          this.signUpSuccess = true;
          this.success.message =
            'Success changing password! You are being redirected to Login';
          //this.login();
        })
        .catch((err) => {
          this.loading = false;
          console.log(err.response);
        });

      //   this.$router.push({ path: '/login' });
    },
    login() {
      this.$router.push({ path: '/login' });
    },
  },
};
</script>

<style></style>
