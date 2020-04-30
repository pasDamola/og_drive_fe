<template>
  <v-dialog
    :value="showDialog"
    max-width="360"
    @click:outside="$emit('closeDialog')"
  >
    <v-card>
      <v-card-title class="headline">
        Share With
      </v-card-title>

      <v-card-text>
        <v-autocomplete
          v-model="selectedUsers"
          :search-input.sync="search"
          :items="users"
          :loading="loading"
          item-text="full_name"
          item-value="_id"
          chips
          deletable-chips
          multiple
          prepend-icon="mdi-account"
        />
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn
          color="darken-1"
          text
          :disabled="isLoading"
          @click="$emit('closeDialog')"
        >
          Cancel
        </v-btn>

        <v-btn
          color="primary px-5"
          :loading="isLoading"
          :disabled="selectedUsers.length < 1"
          @click="share"
        >
          Share
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
    selectedUsers: '',
    search: '',
    users: [],
    loading: false,
  }),
  computed: {
    ...mapGetters(['getFolders']),
  },
  watch: {
    search(val) {
      if (val) {
        this.findUsers(val);
      }
    },
  },
  methods: {
    findUsers(user) {
      this.loading = true;
      this.$axios.get(`users/search/${user}`).then(({ data }) => {
        this.loading = false;
        this.users = data;
      });
    },
    share() {
      this.$emit('share', this.selectedUsers);
      this.selectedUsers = [];
    },
  },
};
</script>

<style></style>
