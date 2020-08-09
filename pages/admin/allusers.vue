<template>
  <v-container>
    <v-virtual-scroll :items="allUsers.users" :item-height="50" height="300">
      <v-data-table
        :headers="headers"
        :items="allUsers.users"
        class="elevation-1"
        :search="search"
        height="70vh"
        fixed-header
      >
        <template v-slot:top>
          <v-toolbar flat color="white">
            <v-toolbar-title>All Users</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
            ></v-text-field>
            <v-dialog v-model="dialog" max-width="500px">
              <v-card>
                <v-card-title>
                  <span class="headline">{{ formTitle }}</span>
                </v-card-title>

                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.fullName"
                          label="Full Name"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.username"
                          label="Username"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.newOgId"
                          label="OGID"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.email"
                          label="Email"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.department"
                          label="Department"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="close">
                    Cancel
                  </v-btn>
                  <v-btn
                    color="blue darken-1"
                    text
                    :loading="loading"
                    @click="save"
                  >
                    Save
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <v-dialog v-model="deleteDialog" max-width="500px">
              <v-card>
                <v-card-title>
                  <span class="headline">Delete User</span>
                </v-card-title>

                <v-card-text>
                  <v-container>
                    <v-row>
                      Are you sure you want to delete this user?
                    </v-row>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="close">
                    Cancel
                  </v-btn>
                  <v-btn
                    color="red darken-1"
                    text
                    :loading="loading"
                    @click="deleteUser"
                  >
                    Delete
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <v-dialog v-model="adminDialog" max-width="500px">
              <v-card>
                <v-card-title>
                  <span class="headline">Give Admin Privileges</span>
                </v-card-title>

                <v-card-text>
                  <v-container>
                    <v-row>
                      Are you sure you want to make this user an admin?
                    </v-row>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="close">
                    Cancel
                  </v-btn>
                  <v-btn
                    color="green darken-1"
                    text
                    :loading="loading"
                    @click="makeAdmin"
                  >
                    Yes!
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <v-dialog v-model="blockDialog" max-width="500px">
              <v-card>
                <v-card-title>
                  <span class="headline">Remove Admin Privileges</span>
                </v-card-title>

                <v-card-text>
                  <v-container>
                    <v-row>
                      Are you sure you want to remove admin privileges?
                    </v-row>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="close">
                    Cancel
                  </v-btn>
                  <v-btn
                    color="green darken-1"
                    text
                    :loading="loading"
                    @click="removeAdmin"
                  >
                    Yes!
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-icon
            color="yellow"
            title="Edit User"
            small
            class="mr-2"
            @click="editItem(item)"
          >
            mdi-pencil
          </v-icon>
          <v-icon
            color="red"
            title="Delete User"
            small
            @click="deleteItem(item)"
          >
            mdi-delete
          </v-icon>
          <v-icon
            v-if="item.role == 'user'"
            color="green"
            title="Give Admin privileges"
            small
            @click="admin(item)"
          >
            mdi-account
          </v-icon>
          <v-icon
            v-if="item.role == 'admin'"
            color="orange"
            title="Block Admin privileges"
            small
            @click="block(item)"
          >
            mdi-block-helper
          </v-icon>
          <v-icon
            color="black"
            title="Login to User account"
            small
            @click="userLogin(item)"
          >
            mdi-eye
          </v-icon>
        </template>
      </v-data-table>
    </v-virtual-scroll>
    <Loader v-if="loading" />
    <v-snackbar v-if="error.status" v-model="error.status" :timeout="5000">
      {{ error.message }}
      <v-btn color="pink" text @click="error.status = false">
        Close
      </v-btn>
    </v-snackbar>
    <v-snackbar v-if="success.status" v-model="success.status" :timeout="5000">
      {{ success.message }}
      <v-btn color="green" text @click="success.status = false">
        Close
      </v-btn>
    </v-snackbar>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  layout: 'admin',
  data: () => ({
    dialog: false,
    search: '',
    deleteDialog: false,
    adminDialog: false,
    blockDialog: false,
    loading: false,
    headers: [
      {
        text: 'Full Name',
        align: 'start',
        sortable: false,
        value: 'full_name',
      },
      { text: 'Department', value: 'department' },
      { text: 'OGID', value: 'ogId' },
      { text: 'Role', value: 'role' },
      { text: 'Username', value: 'username' },
      { text: 'Actions', value: 'actions', sortable: false },
    ],
    desserts: [],
    editedIndex: -1,
    error: { status: false, message: '' },
    alertError: { status: false, message: '' },
    success: { status: false, message: '' },
    editedItem: {
      username: '',
      newogId: '',
      email: '',
      department: '',
      fullName: '',
    },
    adminItem: {},
    deletedItem: {},
    removeItem: {},
  }),
  computed: {
    allUsers() {
      return this.$store.state.allUsers;
    },
    ...mapGetters(['getUsers', 'getFiles', 'isLoggedIn', 'getFolders']),
    formTitle() {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item';
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
  },
  mounted() {
    const token = this.isLoggedIn(this);
    this.$axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    this.fetchUsers();
  },
  methods: {
    editItem(item) {
      this.editedIndex = this.$store.state.allUsers.users.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    async userLogin(item) {
      localStorage.setItem('currentUserId', item._id);
      this.loading = true;
      try {
        const response = await this.$axios.get(`admin/user/${item.ogId}`);
        if (response) {
          this.loading = false;
          this.$store.commit('LOAD_USER_DETAILS', response.data);
          this.$router.push({ path: `/admin/user/${item.ogId}` });
          this.success.message = response.data.message;
          return Promise.resolve(response.data);
        }
      } catch (error) {
        this.loading = false;
        this.error.status = true;
        if (error.response && error.response.data.message) {
          this.error.message = error.response.data.message;
        } else {
          this.error.message = 'Something went wrong';
        }
        this.fetchUsers();
      }
      //this.close();
    },
    deleteItem(item) {
      // const index = this.$store.state.allUsers.users.indexOf(item);
      // console.log(index);
      this.deletedItem = Object.assign({}, item);
      this.deleteDialog = true;
    },
    admin(item) {
      this.adminItem = Object.assign({}, item);
      this.adminDialog = true;
    },

    block(item) {
      this.removeItem = Object.assign({}, item);
      this.blockDialog = true;
    },

    // userLogin(item){
    //   this.loginItem = Object.assign({}, item);
    // },

    close() {
      this.dialog = false;
      this.deleteDialog = false;
      this.adminDialog = false;
      this.blockDialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },

    async save() {
      this.loading = true;
      try {
        const response = await this.$axios.patch(
          `admin/updateUser/${this.editedItem.ogId}`,
          this.editedItem
        );
        if (response) {
          this.loading = false;
          this.$store.commit('LOAD_ALL_USERS', response.data);
          this.fetchUsers();
          this.dialog = false;
          this.success.status = true;
          this.success.message = response.data.message;
          return Promise.resolve(response.data);
        }
      } catch (error) {
        this.loading = false;
        this.error.status = true;
        if (error.response && error.response.data.message) {
          this.error.message = error.response.data.message;
        } else {
          this.error.message = 'Something went wrong';
        }
        this.fetchUsers();
      }
      //this.close();
    },

    async deleteUser() {
      const token = this.isLoggedIn(this);
      this.loading = true;
      try {
        const response = await this.$axios.delete('admin/user', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          data: {
            user_id: this.deletedItem._id,
          },
        });
        if (response) {
          this.loading = false;
          this.success.status = true;
          this.success.message = response.data.message;
          this.$store.commit('LOAD_ALL_USERS', response.data);
          this.fetchUsers();
          this.deleteDialog = false;
          return Promise.resolve(response.data);
        }
      } catch (error) {
        this.loading = false;
        this.error.status = true;
        if (error.response && error.response.data.message) {
          this.error.message = error.response.data.message;
        } else {
          this.error.message = 'Something went wrong';
        }
        this.fetchUsers();
      }
      //this.close();
    },
    async makeAdmin() {
      this.loading = true;
      try {
        const response = await this.$axios.patch(
          `admin/makeAdmin/${this.adminItem.ogId}`,
          this.adminItem
        );
        if (response) {
          this.loading = false;
          this.success.status = true;
          this.success.message = response.data.message;
          this.$store.commit('LOAD_ALL_USERS', response.data);
          this.fetchUsers();
          this.adminDialog = false;
        }
      } catch (error) {
        this.loading = false;
        this.error.status = true;
        if (error.response && error.response.data.message) {
          this.error.message = error.response.data.message;
        } else {
          this.error.message = 'Something went wrong';
        }
        this.fetchUsers();
      }
      //this.close();
    },
    async removeAdmin() {
      this.loading = true;
      try {
        const response = await this.$axios.patch(
          `admin/removeAdmin/${this.removeItem.ogId}`,
          this.removeItem
        );
        if (response) {
          this.loading = false;
          this.success.status = true;
          this.success.message = response.data.message;
          this.$store.commit('LOAD_ALL_USERS', response.data);
          this.fetchUsers();
          this.blockDialog = false;
          return Promise.resolve(response.data);
        }
      } catch (error) {
        this.loading = false;
        this.error.status = true;
        if (error.response && error.response.data.message) {
          this.error.message = error.response.data.message;
        } else {
          this.error.message = 'Something went wrong';
        }
        this.fetchUsers();
      }
      //this.close();
    },
  },
};
</script>

<style></style>
