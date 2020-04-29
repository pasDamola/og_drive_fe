<template>
  <div grid-list-md class="my-drive">
    <Loader v-if="loading" />
    <v-layout align-center justify-space-between row wrap>
      <v-flex sm12 md2>
        <v-select
          v-model="fileType"
          :items="fileTypes"
          label="All Types"
          solo
          dense
          class="shadow"
        ></v-select>
      </v-flex>
      <v-flex sm12 md3>
        <v-text-field
          v-model="searchFiles"
          label="Search Files"
          single-line
          solo
          prepend-inner-icon="mdi-magnify"
          dense
          class="shadow"
        ></v-text-field>
      </v-flex>
    </v-layout>
    <p class="font-weight-medium body-2">
      Folders
    </p>
    <div class="files mb-5">
      <Folder
        v-for="(folder, index) in filteredFolders"
        :key="index"
        :folder-name="folder.dirname"
        :folder-id="folder._id"
        class="my-2"
        :last-updated="folder.updatedAt"
        @deleteFolder="deleteFolder"
      />
    </div>
    <p class="font-weight-medium body-2">
      Files
    </p>
    <div class="files mb-5">
      <File
        v-for="file in filteredFiles"
        :key="file.file_url"
        :format="file.file_extension"
        :name="file.filename"
        :last-edited="file.updatedAt"
        class="my-2"
        @filesSelected="handleMultipleFiles($event, file)"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Loader from '@/components/Loader';
import File from '@/components/File';
import Folder from '@/components/Folder';
import { EventBus } from '../plugins/eventBus';

export default {
  layout: 'Drive',
  components: { File, Folder, Loader },
  props: {
    folders: {
      type: Array,
      default: () => {},
    },
    fileKey: {
      type: String,
      default: '',
    },
  },
  data: () => ({
    routeName: '',
    loading: false,
    searchFiles: '',
    fileTypes: ['pdf', 'Spreadsheets', 'Presentations'],
    fileType: '',
    selectedFiles: [],
    allFiles: [],
  }),
  computed: {
    ...mapGetters(['getFolders', 'isLoggedIn']),
    filteredFiles() {
      const files = this.allFiles.filter((el) => {
        return el.filename
          .toLowerCase()
          .includes(this.searchFiles.toLowerCase());
      });
      return files;
    },
    filteredFolders() {
      const subFolders = this.getFolders.filter(
        (folder) => folder.parent_dir === this.$route.params.name
      );
      const folders = subFolders.filter((el) => {
        return el.dirname
          .toLowerCase()
          .includes(this.searchFiles.toLowerCase());
      });
      return folders;
    },
  },
  mounted() {
    const token = this.isLoggedIn(this);
    this.$axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    this.getFolderDetails();
    console.log('Mounted');
    EventBus.$on('addedNewFile', this.getFolderDetails);
  },
  beforeDestroy() {
    this.$store.dispatch(
      'removeBreadCrumb',
      `/folder/${this.$route.params.name}`
    );
  },
  methods: {
    deleteFolder(e) {
      this.loading = true;
      const user = this.getUser(this);
      this.$axios
        .delete(`directory/deleteDirectory/${e}`)
        .then(() => {
          EventBus.$emit('hideAction');
          this.getFolderDetails();
          this.$store.dispatch('fetchFolders', user.id);
        })
        .catch((err) => {
          EventBus.$emit('hideAction');
          this.loading = false;
          this.error.status = true;
          this.error.message = err.response.data.message;
        });
    },
    getFolderDetails() {
      this.loading = true;
      this.$axios
        .get(`directory/${this.$route.params.name}`)
        .then(({ data }) => {
          this.loading = false;
          this.$store.dispatch('addBreadCrumbs', {
            text: data.directory.dirname,
            href: `/folder/${this.$route.params.name}`,
            disabled: true,
          });
          this.$store.dispatch('saveCurrentLevel', data.directory.level);
          this.allFiles = data.files;
        })
        .catch((err) => {
          this.loading = false;
          console.log(err.response);
        });
    },
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

.my-drive {
  padding: 20px;
  height: calc(100vh - 16vh);
  padding-bottom: 50px;
  position: relative;
  overflow-y: auto;
  .link {
    text-decoration: none;
    color: rgba($color: #000000, $alpha: 0.87);
  }
}

.files {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(215px, 215px));
  justify-content: center;
  gap: 15px;

  @media only screen and (min-width: 768px) {
    justify-content: flex-start;
  }
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
