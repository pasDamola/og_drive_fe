<template>
  <v-app id="inspire">
    <new-dialog
      :show-dialog="showNewFolderDialog"
      @closeDialog="closeDialog"
      @createFolder="createFolder"
    />
    <v-navigation-drawer v-model="drawer" clipped app class="drawer">
      <v-list dense shaped>
        <v-menu>
          <template v-slot:activator="{ on }">
            <v-btn
              color="primary"
              rounded
              height="50"
              width="93%"
              class="mx-3 my-5"
              v-on="on"
            >
              <v-icon class="ml-n5 mx-5">mdi-upload</v-icon>
              Upload
            </v-btn>
          </template>
          <v-list>
            <v-list-item @click="openNewFolderDialog">
              <v-list-item-action>
                <v-icon>mdi-folder-plus-outline</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>
                  New Folder
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-divider />
            <v-list-item>
              <v-list-item-action>
                <v-icon>mdi-folder-upload-outline</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>
                  Upload Folder
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-menu>
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
              color="primary"
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
      <!-- <v-toolbar-title style="width: 260px;" class="ml-0 pl-4">
        <v-layout align-center>
          <img
            width="30px"
            src="https://www.gstatic.com/images/branding/product/1x/drive_48dp.png"
            alt="OG Drive"
            class="mr-1"
          />
          <span class="hidden-sm-and-down">OG Drive</span>
        </v-layout>
      </v-toolbar-title> -->
      <v-text-field
        :solo="pressed"
        :solo-inverted="!pressed"
        :flat="!pressed"
        hide-details
        background-color="#f8fafb"
        prepend-inner-icon="mdi-magnify"
        label="Search in drive"
        class="hidden-sm-and-down search-bar"
        color="#555"
        @focus="pressed = true"
        @blur="pressed = false"
      />
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
          <span class="hidden-sm-and-down">Abdulqudus</span>
          <v-icon>mdi-menu-down</v-icon>
        </v-layout>
      </v-btn>
    </v-app-bar>
    <v-content class="body">
      <v-container class="pb-0">
        <v-toolbar flat class="toolbar px-2" color="transparent">
          <v-toolbar-title class="px-0">
            <span class="row align-center mx-0 font-weight-black text--text">
              <h2>
                Files
              </h2>
              <p class="count">(50)</p>
            </span>
          </v-toolbar-title>
          <v-layout justify-space-between align-center>
            <v-breadcrumbs :items="getBreadCrumbs" class="px-0">
              <template v-slot:divider>
                <v-icon>mdi-chevron-right</v-icon>
              </template>
              <template v-slot:item="{ item }">
                <v-breadcrumbs-item
                  :href="item.href"
                  :disabled="item.disabled"
                  class="breadcrumb"
                >
                  <v-icon v-if="item.icon">{{ item.text }}</v-icon>
                  <span v-else>{{ item.text.toUpperCase() }}</span>
                </v-breadcrumbs-item>
              </template>
            </v-breadcrumbs>
            <div class="view">
              <v-btn
                small
                fab
                elevation="0"
                color="rgba(68, 86, 108, 0.042)"
                class="mx-2"
              >
                <v-icon size="20" color="rgba(68, 86, 108, 0.7)">
                  mdi-view-grid
                </v-icon>
              </v-btn>
              <v-btn small fab elevation="0" color="rgba(68, 86, 108, 0.042)">
                <v-icon size="23" color="rgba(68, 86, 108, 0.7)">
                  mdi-view-list
                </v-icon>
              </v-btn>
            </div>
          </v-layout>
        </v-toolbar>
      </v-container>
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex';
import NewDialog from '@/components/NewFolder';

export default {
  components: { NewDialog },
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
        icon: 'mdi-google-drive',
        text: 'My Drive',
        to: '#1',
      },
      {
        icon: 'mdi-account-multiple-outline',
        text: 'Shared with me',
        to: '#2',
      },
      {
        icon: 'mdi-clock-outline',
        text: 'Recent',
        to: '#3',
      },
      {
        icon: 'mdi-star-outline',
        text: 'Starred',
        to: '#4',
      },
      {
        icon: 'mdi-trash-can-outline',
        text: 'Bin',
        to: '#5',
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
    showNewFolderDialog: false,
    pressed: false,
  }),
  computed: {
    ...mapGetters(['getBreadCrumbs']),
  },
  methods: {
    openNewFolderDialog() {
      this.showNewFolderDialog = true;
    },
    closeDialog() {
      this.showNewFolderDialog = false;
    },
    createFolder(e) {
      console.log(e);
      this.showNewFolderDialog = false;
    },
    resetBreadCrumbs() {
      this.$store.dispatch('resetBreadCrumbs');
    },
  },
};
</script>

<style lang="scss" scoped>
.app-bar {
  border-bottom: 0.6px solid rgba(0, 0, 0, 0.2) !important;
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
