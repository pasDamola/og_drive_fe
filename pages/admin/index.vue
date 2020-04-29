<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="6" lg="3">
        <Card
          color="info"
          icon="mdi-account"
          :title="`${allUsers.totalUsers} Users`"
          sub-icon="mdi-clock"
          sub-text="Just Updated"
        />
      </v-col>

      <v-col cols="12" sm="6" lg="3">
        <Card
          color="primary"
          icon="mdi-folder"
          :title="`${allDirectories.length} Folders`"
          sub-icon="mdi-tag"
          sub-text="Tracked from Google Analytics"
        />
      </v-col>

      <v-col cols="12" sm="6" lg="3">
        <Card
          color="success"
          icon="mdi-file"
          :title="`${allFiles.length} Files`"
          value="$ 34,245"
          sub-icon="mdi-calendar"
          sub-text="Last 24 Hours"
        />
      </v-col>

      <v-col cols="12" sm="6" lg="3">
        <Card
          color="orange"
          icon="mdi-sofa"
          title="Bookings"
          value="184"
          sub-icon="mdi-alert"
          sub-icon-color="red"
          sub-text="Get More Space..."
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Card from '@/components/Card';
import { mapGetters } from 'vuex';

export default {
  components: { Card },
  layout: 'admin',
  computed: {
    allUsers() {
      return this.$store.state.allUsers;
    },
    allFiles() {
      return this.$store.state.totalFiles;
    },
    allDirectories() {
      return this.$store.state.totalDirectories;
    },
    ...mapGetters([
      'getUsers',
      'getFiles',
      'isLoggedIn',
      'getFolders',
      'getTotalFiles',
      'getTotalDirectories',
    ]),
  },
  mounted() {
    const token = this.isLoggedIn(this);
    this.$axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    this.fetchUsers();
    this.fetchAllFiles();
    this.fetchAllDirectories();
  },
};
</script>
