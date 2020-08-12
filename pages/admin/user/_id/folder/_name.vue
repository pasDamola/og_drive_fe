<template>
  <v-container grid-list-md class="my-drive">
    <Loader v-if="loading" />
    <file-view :key="fileKey" @folderName="saveFolderName" />
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex';
import Loader from '@/components/Loader';
import FileView from '@/components/SuperFileView';

export default {
  layout: 'adminDrive',
  components: { Loader, FileView },
  data: () => ({
    routeName: '',
    loading: false,
    searchFiles: '',
    fileTypes: ['pdf', 'Spreadsheets', 'Presentations'],
    fileType: '',
    selectedFiles: [],
    allFiles: [],
    allFolders: [],
    level: '',
    fileKey: 'hello',
    folderName: '',
  }),
  computed: {
    ...mapGetters([
      'getBreadCrumbs',
      'getFolders',
      'isLoggedIn',
      'getUser',
      'getUserFolders',
      'getUserDirectories',
    ]),
    filteredFiles() {
      const files = this.allFiles.filter((el) => {
        return el.filename
          .toLowerCase()
          .includes(this.searchFiles.toLowerCase());
      });
      return files;
    },
    filteredFolders() {
      const routeName = this.routeName;
      const subFolders = this.getUserDirectories.filter(
        (folder) => folder.parent_dir === routeName
      );
      return subFolders;
    },
  },
  watch: {
    '$route.params.name'() {
      this.fileKey += 1;
      this.routeName = this.$route.params.name;
    },
  },
  mounted() {
    const token = this.isLoggedIn(this);
    this.$axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    this.routeName = this.$route.params.name;
    this.$store.dispatch('fetchUser', this.$route.params.id).then(() => {
      const userInView = this.$store.getters.getUserDetails;
      this.fetchUserFiles(userInView.user._id, 0);
      this.$store.dispatch('fetchUserFolders', userInView.user._id);
    });
  },
  methods: {
    saveFolderName(e) {
      this.folderName = e;
    },
  },
  head() {
    return {
      title: this.folderName,
    };
  },
};
</script>

<style lang="scss" scoped>
.toolbar::v-deep {
  min-height: 100px;
  .v-toolbar__content {
    display: block;
    padding: 0;
  }
}

.count {
  margin-bottom: 0;
  margin-left: 5px;
  font-size: 1.5em;
  opacity: 0.7;
}

.shadow::v-deep {
  .v-input__slot {
    // box-shadow: 0px 3px 1px -2px rgba(68, 86, 108, 0.2),
    //   0px 2px 2px 0px rgba(68, 86, 108, 0.14),
    //   0px 1px 5px 0px rgba(68, 86, 108, 0) !important;
    box-shadow: 1px 4px 7px rgba(68, 86, 108, 0.1) !important;
  }
}
</style>
