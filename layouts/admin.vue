<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" clipped app class="drawer">
      <v-list dense shaped>
        <template v-for="item in items">
          <v-row v-if="item.heading" :key="item.heading" align="center">
            <v-col cols="6">
              <v-subheader v-if="item.heading">
                {{ item.heading }}
              </v-subheader>
            </v-col>
            <v-col cols="6" class="text-center">
              <a href="#!" class="body-2 black--text">EDIT</a>
            </v-col>
          </v-row>
          <v-list-group
            v-else-if="item.children"
            :key="item.text"
            v-model="item.model"
            :prepend-icon="item.model ? item.icon : item['icon-alt']"
            append-icon=""
            color="primary"
          >
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title>
                  {{ item.text }}
                </v-list-item-title>
              </v-list-item-content>
            </template>
            <v-list-item
              v-for="(child, i) in item.children"
              :key="i"
              link
              :to="item.to"
            >
              <v-list-item-action v-if="child.icon">
                <v-icon>{{ child.icon }}</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>
                  {{ child.text }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>
          <v-list-item
            v-else
            :key="item.text"
            link
            :to="item.to"
            color="primary"
          >
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>
                {{ item.text }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      app
      color="white"
      class="app-bar"
      elevation="0"
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-spacer />
      <v-badge color="red" content="6" dot class="mx-5">
        <v-icon>mdi-bell-outline</v-icon>
      </v-badge>
      <v-divider vertical />
      <v-btn text large>
        <v-layout align-center>
          <v-avatar size="35px" item class="mx-2">
            <v-img
              src="https://lh3.googleusercontent.com/-ykrfI9pPAck/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucl91N61xVEOki3ANxwkYEEZd5HgGA.CMID/s64-c/photo.jpg"
              alt="Vuetify"
            />
          </v-avatar>
          <span class="hidden-sm-and-down">{{ getUser.username }}</span>
          <v-icon>mdi-menu-down</v-icon>
        </v-layout>
      </v-btn>
    </v-app-bar>
    <v-content class="body">
      <v-container class="pb-0"> </v-container>
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  props: {
    source: {
      type: String,
      default: '',
    },
  },
  data: () => ({
    dialog: false,
    drawer: null,
    items: [
      {
        icon: 'mdi-view-dashboard',
        text: 'Dashboard',
        to: '/admin',
      },
      {
        icon: 'mdi-account',
        text: 'User Accounts',
        to: '/admin/allusers',
      },
      // {
      //   icon: 'mdi-chevron-up',
      //   'icon-alt': 'mdi-chevron-down',
      //   text: 'Labels',
      //   model: true,
      //   children: [{ icon: 'mdi-plus', text: 'Create label' }],
      // },
      // {
      //   icon: 'mdi-chevron-up',
      //   'icon-alt': 'mdi-chevron-down',
      //   text: 'More',
      //   model: false,
      //   children: [
      //     { text: 'Import' },
      //     { text: 'Export' },
      //     { text: 'Print' },
      //     { text: 'Undo changes' },
      //     { text: 'Other contacts' },
      //   ],
      // },
      // { icon: 'mdi-settings', text: 'Settings' },
      // { icon: 'mdi-message', text: 'Send feedback' },
      // { icon: 'mdi-help-circle', text: 'Help' },
      // { icon: 'mdi-cellphone-link', text: 'App downloads' },
      // { icon: 'mdi-keyboard', text: 'Go to the old version' },
    ],
    loading: false,
    buttonLoading: false,
    showNewFolderDialog: false,
    pressed: false,
    error: { status: false, message: '' },
  }),
  computed: {
    getUser() {
      console.log(this.$store.getters.getUser);
      return this.$store.getters.getUser;
    },
    ...mapGetters(['getBreadCrumbs', 'isLoggedIn', 'getUser']),
  },
  mounted() {
    console.log('Mounted');
    const token = this.isLoggedIn(this);
    const user = this.getUser(this);
    console.log(user);
    this.$axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    this.loading = true;
    this.fetchUserFiles(user.id, 0);
  },
  methods: {
    openNewFolderDialog() {
      this.showNewFolderDialog = true;
    },
    closeDialog() {
      this.showNewFolderDialog = false;
    },
    createFolder(e) {
      this.buttonLoading = true;
      const user = this.getUser(this);
      const data = {
        dirname: e,
        user_id: user.id,
        level: 0,
      };
      this.$axios
        .post('directory/create', data)
        .then(({ data }) => {
          console.log(data);
          this.buttonLoading = false;
          this.loading = true;
          this.fetchUserFiles(user.id, 0);
        })
        .catch((err) => {
          this.buttonLoading = false;
          console.log(err.response);
        });
      this.showNewFolderDialog = false;
    },
    resetBreadCrumbs() {
      this.$store.dispatch('resetBreadCrumbs');
    },
    handleFileUpload(e) {
      this.loading = true;
      const user = JSON.parse(JSON.stringify(this.$cookies.get('user')));
      const file = e.target.files;
      const formData = new FormData();
      formData.set('user_id', user.id);
      if (file && file[0]) {
        formData.set('file', file[0]);
        this.$axios
          .post('files/upload/single', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
          })
          .then((res) => {
            console.log(res);
            this.fetchUserFiles(user.id, 0);
          })
          .catch((err) => {
            this.loading = false;
            this.error.status = true;
            this.error.message = err.response.data.message;
          });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.app-bar {
  border-bottom: 0.6px solid rgba(0, 0, 0, 0.2) !important;
}

#file-upload {
  width: 0.1px;
  height: 0.1px;
  position: absolute;
  opacity: 0;

  + label {
    cursor: pointer;
  }

  &:hover + label,
  &:focus + label {
    background-color: rgba($color: #000000, $alpha: 0.03);
  }
}

.drawer::v-deep {
  box-shadow: 0px 2px 5px rgba($color: #000000, $alpha: 0.17);
  .v-navigation-drawer__border {
    width: 0px;
  }
}

.breadcrumb::v-deep {
  a.v-breadcrumbs__item {
    color: rgba($color: #000000, $alpha: 0.87);
  }
}

.toolbar::v-deep {
  min-height: 100px;
  .v-toolbar__content {
    display: block;
    padding: 0;
    height: 100%;
  }
}

.count {
  margin-bottom: 0;
  margin-left: 5px;
  font-size: 1.5em;
  opacity: 0.7;
}

.search-bar {
  max-width: 400px;
}

.body {
  background-color: rgba(68, 86, 108, 0.042);
}
</style>
