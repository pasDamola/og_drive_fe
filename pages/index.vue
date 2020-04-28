<template>
  <v-container grid-list-md class="my-drive">
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
      <nuxt-link
        v-for="(folder, index) in filteredFolders"
        :key="index"
        :to="`folder/${folder._id}`"
        class="link"
      >
        <Folder
          :folder-name="folder.dirname"
          class="my-2"
          :last-updated="folder.updatedAt"
        />
      </nuxt-link>
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
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex';
import File from '@/components/File';
import Folder from '@/components/Folder';
import { EventBus } from '../plugins/eventBus';

export default {
  layout: 'drive',
  components: { File, Folder },
  middleware: 'authenticated',
  data: () => ({
    tempDate: new Date(2020, 3, 22),
    searchFiles: '',
    fileTypes: ['pdf', 'Spreadsheets', 'Presentations'],
    fileType: '',
    selectedFiles: [],
  }),
  computed: {
    ...mapGetters(['getBreadCrumbs', 'getFiles', 'getFolders']),
    filteredFiles() {
      const files = this.getFiles.filter((el) => {
        return el.filename
          .toLowerCase()
          .includes(this.searchFiles.toLowerCase());
      });
      return files;
    },
    filteredFolders() {
      const folders = this.getFolders.filter((el) => {
        return el.dirname
          .toLowerCase()
          .includes(this.searchFiles.toLowerCase());
      });
      return folders;
    },
  },
  methods: {
    openFolder() {},
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
</script>

<style lang="scss" scoped>
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
