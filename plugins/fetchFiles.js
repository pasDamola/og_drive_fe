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
  },
};

Vue.mixin(mixin);
