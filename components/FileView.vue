<template>
  <div grid-list-md class="my-drive">
    <v-navigation-drawer
      v-model="showDrawer"
      temporary
      right
      app
      fixed
      clipped
      overlay-opacity="0.2"
      width="300px"
      class="py-10"
    >
      <Loader v-if="loadingDetails" />
      <v-layout v-else column justify-center align-center class="fill-height">
        <img :src="fileDetails.icon" alt="" width="100px" />
        <ul class="pl-0 file-details">
          <li class="my-2">
            <b>File Name: </b>
            {{ fileDetails.name }}
          </li>
          <li class="my-2">
            <b>File Owner: </b>
            {{ fileDetails.owner }}
          </li>
          <li class="my-2">
            <b>Updated: </b>
            {{ fileDetails.lastUpdated }}
          </li>
        </ul>
        <v-layout class="file-actions px-8" row justify-space-between>
          <v-tooltip top>
            <template v-slot:activator="{ on }">
              <a :href="fileDetails.link" target="_blank" download v-on="on">
                <v-icon color="primary" dark>
                  mdi-cloud-download-outline
                </v-icon>
              </a>
            </template>
            <span>Download</span>
          </v-tooltip>

          <v-tooltip top>
            <template v-slot:activator="{ on }">
              <a :href="fileDetails.link" target="_blank" v-on="on">
                <v-icon color="primary" dark>
                  mdi-open-in-new
                </v-icon>
              </a>
            </template>
            <span>Open</span>
          </v-tooltip>
        </v-layout>
      </v-layout>
    </v-navigation-drawer>
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
        :file-id="file._id"
        :size="file.file_size"
        :last-edited="file.updatedAt"
        class="my-2"
        @filesSelected="handleMultipleFiles($event, file)"
        @deleteFile="deleteFile"
        @viewDetails="showFileDetails"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Moment from 'moment';
import Loader from '@/components/Loader';
import File from '@/components/File';
import Folder from '@/components/Folder';
import { EventBus } from '../plugins/eventBus';

export default {
  layout: 'drive',
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
    showDrawer: false,
    loadingDetails: false,
    fileDetails: '',
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
    deleteFile(e) {
      this.loading = true;
      this.$axios
        .delete('/files', { data: { file_id: e } })
        .then(() => {
          this.getFolderDetails();
          this.loading = false;
        })
        .catch((err) => {
          this.loading = false;
          this.error.status = true;
          this.error.message = err.response.data.message;
        });
    },
    getFolderDetails() {
      if (this.$route.params.name !== undefined) {
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
            this.emitFileLength();
          })
          .catch(() => {
            this.loading = false;
            // console.log(err.response);
          });
      }
    },
    showFileDetails([e, icon]) {
      let fileDetails = {};
      this.showDrawer = true;
      this.loadingDetails = true;
      fileDetails.icon = icon;
      this.$axios.get(`files/${e}`).then(({ data }) => {
        this.loadingDetails = false;
        fileDetails.name = data.file.filename;
        fileDetails.lastUpdated = Moment(data.file.updatedAt).fromNow();
        fileDetails.owner = data.file.user_id.full_name;
        fileDetails.link = data.file.file_url;
        this.fileDetails = fileDetails;
      });
    },
    emitFileLength() {
      const subFolders = this.getFolders.filter(
        (folder) => folder.parent_dir === this.$route.params.name
      );
      const length = subFolders.length + this.allFiles.length;
      EventBus.$emit('fileLength', length);
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

.file-details {
  list-style-type: none;
}

.file-actions {
  width: 100%;
  max-height: 50px;
  a {
    height: fit-content;
    text-decoration: none;
  }
}
</style>
