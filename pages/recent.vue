<template>
  <v-container> </v-container>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  layout: 'recent',
  computed: {
    ...mapGetters(['getUser']),
  },
  mounted() {
    this.fetchRecentFiles();
  },
  methods: {
    fetchRecentFiles() {
      const user = this.getUser(this);
      this.$axios
        .get('files/recent/files', {
          params: {
            user_id: user.id,
          },
        })
        .then((response) => {
          console.log(response);
        })
        .catch((err) => {
          console.log(err.response);
        });
    },
  },
};
</script>

<style></style>
