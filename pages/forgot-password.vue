<template>
  <v-layout column justify-center align-center>
    <h1 class="title text-uppercase my-3">Please input your email address</h1>
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
      <v-form @submit.prevent.stop="sendMail">
        <v-text-field
          v-model="user.email"
          label="Email"
          name="id"
          type="text"
          placeholder="example@outsourceglobal.com"
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
          @click.stop.prevent="sendMail"
        >
          Send Reset Link
        </v-btn>
      </v-form>
    </v-card>
  </v-layout>
</template>
<script>
export default {
  data: () => ({
    signUpSuccess: false,
    user: {
      email: '',
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
    isFormValid() {
      return this.user.ogId && this.user.password;
    },
  },
  methods: {
    sendMail() {
      this.loading = true;
      this.$axios
        .post('users/reset-request', this.user)
        .then(() => {
          this.loading = false;
          this.signUpSuccess = true;
          this.success.message =
            'A link has been sent to your email address, please check your email address!';
        })
        .catch(() => {
          this.loading = false;
        });
    },
  },
  head() {
    return {
      title: 'Reset Password',
    };
  },
};
</script>
<style lang="scss" scoped></style>
