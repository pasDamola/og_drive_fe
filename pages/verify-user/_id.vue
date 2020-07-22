<template>
  <v-layout justify-center align-center column>
    Your account has been verified. Please proceed to Login
    <v-btn color="primary" @click="login">Proceed to Login</v-btn>
  </v-layout>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
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
    login() {
      this.$router.push({ path: '/login' });
    },
  },
};
</script>

<style></style>
