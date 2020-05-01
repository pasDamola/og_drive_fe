<template>
  <v-container>
    <Loader v-if="isLoading" />
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
      <v-layout
        v-else
        column
        justify-space-between
        align-center
        class="fill-height"
      >
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
              <a :href="fileDetails.link" download v-on="on">
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
    <p class="font-weight-medium body-2">
      Files
    </p>
    <div class="files mb-5">
      <File
        v-for="file in files"
        :key="file.file_url"
        :format="file.file_extension"
        :name="file.filename"
        :size="file.file_size"
        :file-id="file._id"
        :last-edited="file.updatedAt"
        hide-options
        class="my-2"
        @viewDetails="showFileDetails"
      />
    </div>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex';
import Moment from 'moment';
import Loader from '@/components/Loader';
import File from '@/components/File';
import { EventBus } from '../../plugins/eventBus';

export default {
  layout: 'drive',
  components: { Loader, File },
  data: () => ({
    user: '',
    folders: [],
    files: [],
    isLoading: false,
    showDrawer: false,
    fileDetails: {},
    loadingDetails: false,
  }),
  computed: {
    ...mapGetters(['getUser', 'isLoggedIn']),
  },
  mounted() {
    const token = this.isLoggedIn(this);
    const user = this.getUser(this);
    this.user = user;
    this.$axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    this.fetchSharedFiles();
  },
  methods: {
    fetchSharedFiles() {
      this.isLoading = true;
      const data = {
        _id: this.user.id,
        user_id: this.$route.params.id,
      };
      this.$axios
        .post('users/sharers/details', data)
        .then(({ data }) => {
          this.isLoading = false;
          this.files = data.files;
          this.folders = data.directories;
          const totalFileLength = this.files.length + this.folders.length;
          EventBus.$emit('fileLength', totalFileLength);
        })
        .catch((err) => {
          throw Error(err);
        });
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
  },
};
</script>

<style lang="scss" scoped>
.files {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(215px, 215px));
  justify-content: center;
  gap: 15px;

  @media only screen and (min-width: 768px) {
    justify-content: flex-start;
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
