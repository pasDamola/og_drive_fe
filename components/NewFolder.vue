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
        <v-text-field v-model="folderName" label="Folder Name" />
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn color="green darken-1" text @click="$emit('closeDialog')">
          Disagree
        </v-btn>

        <v-btn color="green darken-1" text @click="createFolder">
          Create Folder
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
  },
  data: () => ({
    folderName: 'New Folder',
  }),
  methods: {
    createFolder() {
      this.$emit('createFolder', this.folderName);
    },
  },
};
</script>

<style></style>
