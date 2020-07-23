<template>
  <v-layout v-if="success.status == true" justify-center align-center column>
    Your account has been verified. Please proceed to Login
    <v-btn color="primary" @click="login">Proceed to Login</v-btn>
  </v-layout>
  <v-layout v-else justify-center align-center column>
    Your account has not been verified. Please recheck your mail or there is a
    possible network error
  </v-layout>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data: () => ({
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
    ...mapGetters(['getUserToken']),
    id() {
      return this.$route.params.id;
    },
  },
  mounted() {
    this.verifyUser(this.id);
  },
  methods: {
    verifyUser(id) {
      this.$axios
        .post('users/verified', id)
        .then(() => {
          this.success.status = true;
        })
        .catch((err) => {
          console.log(err);
          this.error.status = true;
        });
    },
    login() {
      this.$router.push({ path: '/login' });
    },
  },
};
</script>

<style></style>
