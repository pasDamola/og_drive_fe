<template>
  <v-layout column justify-center align-center>
    <img src="/images/logo.png" alt="Outsource Logo" width="200vh" />
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
      <v-form @submit.prevent.stop="logIn">
        <v-text-field
          v-model="user.ogId"
          label="OG-ID"
          name="id"
          type="text"
          placeholder="191852"
          prepend-icon="mdi-account-outline"
          class="mx-3 my-4"
          :rules="[rules.isNumber]"
          validate-on-blur
        />
        <div class="mx-3 my-4">
          <v-text-field
            v-model="user.password"
            name="password"
            :type="isPassword ? 'password' : 'text'"
            :append-icon="isPassword ? 'mdi-eye' : 'mdi-eye-off'"
            label="Password"
            placeholder="********"
            prepend-icon="mdi-account-lock-outline"
            @click:append="isPassword = !isPassword"
          />
          <router-link
            to="/forgot-password"
            class="forgot caption font-weight-bold float-right"
          >
            Forgot Password
          </router-link>
        </div>
        <v-btn
          depressed
          color="primary"
          min-width="150px"
          min-height="40px"
          :loading="loading"
          type="submit"
          class="my-4 mx-3"
          :disabled="!isFormValid"
          @click.stop.prevent="logIn"
        >
          Log in
        </v-btn>
      </v-form>
    </v-card>
    <p class="my-3 subtitle-2">
      Don't have an account?
      <router-link to="signup">Register here</router-link>
    </p>
  </v-layout>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data: () => ({
    isPassword: true,
    user: {
      ogId: '',
      password: '',
    },
    loading: false,
    error: {
      status: false,
      message: '',
    },
    rules: {
      isNumber: (value) => {
        return /^[0-9]+$/.test(value) || 'ID can only contain numbers';
      },
    },
  }),
  computed: {
    ...mapGetters(['isLoggedIn']),
    isFormValid() {
      return this.user.ogId && this.user.password;
    },
  },
  mounted() {
    if (this.isLoggedIn(this)) {
      this.$router.push({ path: '/' });
    }
  },
  methods: {
    logIn() {
      this.loading = true;
      this.$axios
        .post('users/login', this.user)
        .then(({ data }) => {
          this.loading = false;
          const userDetails = {
            id: data.user._id,
            ogId: data.user.ogId,
            full_name: data.user.full_name,
            username: data.user.username,
            email: data.user.email,
            department: data.user.department,
            role: data.user.role,
            picture: data.user.profile_pic,
          };
          const token = data.token;
          this.$store.dispatch('saveAuth', [userDetails, token]);
          this.$router.push({ path: '/' });
        })
        .catch((err) => {
          this.loading = false;
          this.error.status = true;
          if (err.response && err.response.data && err.response.data.message) {
            this.error.message = err.response.data.message;
          } else {
            this.error.message = 'Something went wrong. Please try again';
          }
        });
    },
  },
};
</script>
<style lang="scss" scoped></style>
