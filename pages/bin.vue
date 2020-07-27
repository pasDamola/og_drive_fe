<template>
  <v-container>
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
        @deleteFile="handleFileDelete"
        @viewDetails="showFileDetails"
      />
    </div>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  layout: 'bin',
  computed: {
    ...mapGetters([
      'getUsers',
      'getFiles',
      'isLoggedIn',
      'getFolders',
      'getBinFiles',
      'getUser',
    ]),
  },
  mounted() {
    const user = this.getUser(this);
    this.$store.dispatch('fetchBinFiles', user.id);
  },
};
</script>

<style></style>
