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
          :items="foundUsers"
          :loading="loading"
          item-text="username"
          item-value="_id"
          chips
          cache-items
          deletable-chips
          hide-no-data
          multiple
          prepend-icon="mdi-account"
          return-object
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
    ...mapGetters(['getFolders', 'isLoggedIn']),
    foundUsers() {
      return this.users || [];
    },
  },
  watch: {
    search(val) {
      if (val) {
        this.findUsers(val);
      }
    },
  },
  mounted() {
    const token = this.isLoggedIn(this);
    this.$axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  methods: {
    findUsers(user) {
      this.loading = true;
      this.$axios.post('users/search', { username: user }).then(({ data }) => {
        this.loading = false;
        this.users = data.users;
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
