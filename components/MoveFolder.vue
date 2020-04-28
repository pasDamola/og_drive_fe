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
          :items="getFolders"
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
          @click="moveFolder"
          :disabled="!folder"
        >
          Create
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
    ...mapGetters(['getFolders']),
  },
  methods: {
    moveFolder() {
      this.$emit('moveFolder', this.folder);
    },
  },
};
</script>

<style></style>
