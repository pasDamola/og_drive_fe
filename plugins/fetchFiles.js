import Vue from 'vue';
import { EventBus } from './eventBus';

const mixin = {
  methods: {
    fetchUserFiles(id, level) {
      this.$store
        .dispatch('fetchFiles', [id, level])
        .then(() => {
          this.loading = false;
          EventBus.$emit('filesFetched');
        })
        .catch((err) => {
          this.loading = false;
          console.log(err);
        });
    },
    handleMultipleFiles(e, file) {
      if (e === true) {
        this.selectedFiles.push(file._id);
      } else {
        this.selectedFiles = this.selectedFiles.filter((el) => {
          return el !== file._id;
        });
      }
      if (this.selectedFiles.length > 0) {
        EventBus.$emit('showAction', this.selectedFiles);
      } else {
        EventBus.$emit('hideAction');
      }
      // this.showAction = true;
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
