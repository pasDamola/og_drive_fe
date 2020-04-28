import Vue from 'vue';
import { EventBus } from './eventBus';

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
  },
};

Vue.mixin(mixin);
