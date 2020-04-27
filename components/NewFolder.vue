<template>
  <v-dialog
    :value="showDialog"
    max-width="360"
    @click:outside="$emit('closeDialog')"
  >
    <v-card>
      <v-card-title class="headline">
        Create New Folder
      </v-card-title>

      <v-card-text>
        <v-text-field
          id="newFolder"
          ref="folderName"
          v-model="folderName"
          label="Folder Name"
        />
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn color="darken-1" text @click="$emit('closeDialog')">
          Cancel
        </v-btn>

        <v-btn color="primary px-5" :loading="isLoading" @click="createFolder">
          Create
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
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
    folderName: 'New Folder',
  }),
  watch: {
    showDialog(val) {
      if (val) {
        setTimeout(() => {
          document.querySelector('#newFolder').select();
        }, 0);
      }
    },
  },
  methods: {
    createFolder() {
      this.$emit('createFolder', this.folderName);
    },
  },
};
</script>

<style></style>
