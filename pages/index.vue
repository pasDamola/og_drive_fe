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
          label="Solo"
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
        v-for="(folder, index) in folders"
        :key="index"
        :to="`folder/${folder.name.toLowerCase()}`"
        class="link"
      >
        <Folder :folder-name="folder.name" class="my-2" />
      </nuxt-link>
    </div>
    <p class="font-weight-medium body-2">
      Files
    </p>
    <div class="files mb-5">
      <File
        format="xls"
        name="Letter of appreciation"
        :last-edited="tempDate.toISOString()"
        class="my-2"
      />
      <File
        format="pdf"
        name="Letter of appreciation"
        :last-edited="tempDate.toISOString()"
        class="my-2"
      />
      <File
        format="docx"
        name="Letter of appreciation"
        :last-edited="tempDate.toISOString()"
        class="my-2"
      />
      <File
        format="xls"
        name="Letter of appreciation"
        :last-edited="tempDate.toISOString()"
        class="my-2"
      />
      <File
        format="docx"
        name="Letter of appreciation"
        :last-edited="tempDate.toISOString()"
        class="my-2"
      />
      <File
        format="xls"
        name="Letter of appreciation"
        :last-edited="tempDate.toISOString()"
        class="my-2"
      />
      <File
        format="ppt"
        name="Letter of appreciation"
        :last-edited="tempDate.toISOString()"
        class="my-2"
      />
      <File
        format="docx"
        name="Letter of appreciation"
        :last-edited="tempDate.toISOString()"
        class="my-2"
      />
      <File
        format="pptx"
        name="Letter of appreciation"
        :last-edited="tempDate.toISOString()"
        class="my-2"
      />
      <File
        format="xls"
        name="Letter of appreciation"
        :last-edited="tempDate.toISOString()"
        class="my-2"
      />
      <File
        format="pdf"
        name="Letter of appreciation"
        :last-edited="tempDate.toISOString()"
        class="my-2"
      />
    </div>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex';
import File from '@/components/File';
import Folder from '@/components/Folder';

export default {
  layout: 'drive',
  components: { File, Folder },
  middleware: 'authenticated',
  data: () => ({
    tempDate: new Date(2020, 3, 22),
    searchFiles: '',
    folders: [
      {
        name: 'Football',
      },
      {
        name: 'Wrestling',
      },
      {
        name: 'Basketball',
      },
      {
        name: 'Golf',
      },
      {
        name: 'Rugby',
      },
      {
        name: 'Volleyball',
      },
      {
        name: 'Handball',
      },
      {
        name: 'Table Tennis',
      },
      {
        name: 'Badminton',
      },
    ],
    fileTypes: ['pdf', 'Spreadsheets', 'Presentations'],
    fileType: '',
  }),
  computed: {
    ...mapGetters(['getBreadCrumbs']),
  },
  methods: {
    openFolder() {},
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
  grid-template-columns: repeat(auto-fit, minmax(215px, 1fr));
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
