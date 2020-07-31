import Vue from 'vue';
import { EventBus } from './eventBus';

const mixin = {
  methods: {
    verifyUser(id) {
      this.$store
        .dispatch('verifyUser', id)
        .then(() => {
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
        });
    },
    resetUser(id, email) {
      this.$store
        .dispatch('resetUser', { id, email })
        .then(() => {
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
        });
    },
    fetchUserFiles(id, level) {
      this.$store
        .dispatch('fetchFiles', [id, level])
        .then(() => {
          this.loading = false;
          EventBus.$emit('filesFetched');
        })
        .catch(() => {
          this.loading = false;
        });
    },
    fetchUserDirectories(id, level) {
      this.$store
        .dispatch('fetchDirectories', [id, level])
        .then(() => {
          this.loading = false;
          EventBus.$emit('filesFetched');
        })
        .catch(() => {
          this.loading = false;
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
    handleMultipleFolders(e, folder) {
      if (e === true) {
        this.selectedFolders.push(folder._id);
      } else {
        this.selectedFolders = this.selectedFolders.filter((el) => {
          return el !== folder._id;
        });
      }
      console.log('selectedFolders', this.selectedFolders);
      if (this.selectedFolders.length > 0) {
        EventBus.$emit('folderShowAction', this.selectedFolders);
      } else {
        EventBus.$emit('hideAction');
      }
      // this.showAction = true;
    },
    fetchUsers() {
      this.$store
        .dispatch('fetchUsers')
        .then(() => {
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
        });
    },
    fetchCampaigns() {
      this.$store
        .dispatch('fetchCampaigns')
        .then(() => {
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
        });
    },
    fetchAllFiles() {
      this.$store
        .dispatch('fetchTotalFiles')
        .then(() => {
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
        });
    },
    fetchAllDirectories() {
      this.$store
        .dispatch('fetchTotalDirectories')
        .then(() => {
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
        });
    },
    editUser(id) {
      this.$store
        .dispatch('editUser', id)
        .then(() => {
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
        });
    },
    fetchUser(id) {
      this.$store
        .dispatch('fetchUser', id)
        .then(() => {
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
        });
    },
    fetchBinFiles(id) {
      this.$store
        .dispatch('fetchBinFiles', id)
        .then(() => {
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
        });
    },
    fetchBinFolders(id) {
      this.$store
        .dispatch('fetchBinFolders', id)
        .then(() => {
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
        });
    },
    fetchRecentFiles(id) {
      this.$store
        .dispatch('fetchRecentFiles', id)
        .then(() => {
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
        });
    },
  },
};

Vue.mixin(mixin);
