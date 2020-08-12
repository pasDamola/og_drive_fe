<template>
  <v-dialog
    :value="showDialog"
    max-width="360"
    @click:outside="$emit('closeDialog')"
  >
    <v-card>
      <v-card-title class="headline">
        Select Destination Folder
      </v-card-title>

      <v-card-text>
        <v-autocomplete
          v-model="folder"
          :items="allFolders"
          item-text="dirname"
          item-value="_id"
          prepend-icon="mdi-folder"
        />
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn color="darken-1" text @click="$emit('closeDialog')">
          Cancel
        </v-btn>

        <v-btn
          color="primary px-5"
          :loading="isLoading"
          :disabled="!folder"
          @click="moveFolder"
        >
          Move
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  props: {
    showDialog: {
      type: Boolean,
      default: false,
    },
    isLoading: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    folder: '',
  }),
  computed: {
    ...mapGetters(['getUserDirectories']),
    allFolders() {
      const rootFolder = {
        dirname: 'Root folder',
        _id: '0',
      };
      return [...this.getUserDirectories, rootFolder];
    },
  },
  methods: {
    moveFolder() {
      this.$emit('moveFolder', this.folder);
      this.folder = '';
    },
  },
};
</script>

<style></style>
