import Vue from 'vue';

const mixin = {
  methods: {
    fetchUserFiles(id, level) {
      this.$store
        .dispatch('fetchFiles', [id, level])
        .then((res) => {
          this.loading = false;
          console.log(res);
        })
        .catch((err) => {
          this.loading = false;
          console.log(err);
        });
    },
    fetchUsers() {
      this.$store
        .dispatch('fetchUsers')
        .then((res) => {
          this.loading = false;
          console.log(res);
        })
        .catch((err) => {
          this.loading = false;
          console.log(err);
        });
    },
    fetchAllFiles() {
      this.$store
        .dispatch('fetchTotalFiles')
        .then((res) => {
          this.loading = false;
          console.log(res);
        })
        .catch((err) => {
          this.loading = false;
          console.log(err);
        });
    },
    fetchAllDirectories() {
      this.$store
        .dispatch('fetchTotalDirectories')
        .then((res) => {
          this.loading = false;
          console.log(res);
        })
        .catch((err) => {
          this.loading = false;
          console.log(err);
        });
    },
    editUser(id) {
      this.$store
        .dispatch('editUser', id)
        .then((res) => {
          this.loading = false;
          console.log(res);
        })
        .catch((err) => {
          this.loading = false;
          console.log(err);
        });
    },
  },
};

Vue.mixin(mixin);
