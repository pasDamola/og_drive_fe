import Vue from 'vue';
import { EventBus } from './eventBus';

const mixin = {
  data: () => ({
    globalSearchDirectories: null,
    globalSearchFiles: null,
  }),
  watch: {
    $route() {
      this.globalSearch = '';
      EventBus.$emit('hideAction');
    },
  },
  mounted() {
    EventBus.$on('searchFound', this.handleGlobalSearch);
    EventBus.$on('clearSearch', this.clearGlobalSearch);
  },
  methods: {
    customDblClick() {
      if (this.touchTime === 0) {
        // set first click
        this.touchTime = new Date().getTime();
      } else {
        // compare first click to this click and see if they occurred within double click threshold
        if (new Date().getTime() - this.touchTime < 800) {
          // double click occurred
          this.$emit('previewFile');
          this.touchTime = 0;
        } else {
          // not a double click so set as a new first click
          this.touchTime = new Date().getTime();
        }
      }
    },
    handleGlobalSearch(e) {
      this.globalSearchDirectories = e.directories;
      this.globalSearchFiles = e.files;
    },
    clearGlobalSearch() {
      this.globalSearchDirectories = null;
      this.globalSearchFiles = null;
    },
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
      if (this.selectedFolders.length > 0) {
        EventBus.$emit('folderShowAction', this.selectedFolders);
      } else {
        EventBus.$emit('hideAction');
      }
      // this.showAction = true;
    },
    moveFile(file) {
      this.selectedFiles = [file];
      EventBus.$emit('moveSingle', this.selectedFiles);
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
    fetchStuffToDelete() {
      this.$store
        .dispatch('fetchAdminStuffToBeDeleted')
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
