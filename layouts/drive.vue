<template>
  <v-app id="inspire">
    <new-dialog
      :show-dialog="showNewFolderDialog"
      @closeDialog="closeDialog"
      @createFolder="createFolder"
    />
    <v-navigation-drawer
      v-model="drawer"
      :clipped="$vuetify.breakpoint.lgAndUp"
      app
      class="drawer"
    >
      <v-list dense shaped>
        <v-menu>
          <template v-slot:activator="{ on }">
            <v-btn
              color="white"
              rounded
              height="50"
              min-width="140"
              class="mx-3 my-5"
              v-on="on"
            >
              <img
                src="data:image/svg+xml;charset=UTF-8,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2236%22 height=%2236%22 viewBox=%220 0 36 36%22%3E%3Cpath fill=%22%2334A853%22 d=%22M16 16v14h4V20z%22/%3E%3Cpath fill=%22%234285F4%22 d=%22M30 16H20l-4 4h14z%22/%3E%3Cpath fill=%22%23FBBC05%22 d=%22M6 16v4h10l4-4z%22/%3E%3Cpath fill=%22%23EA4335%22 d=%22M20 16V6h-4v14z%22/%3E%3Cpath fill=%22none%22 d=%22M0 0h36v36H0z%22/%3E%3C/svg%3E"
                alt=""
                class="mr-3 ml-n7"
              />
              New
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
      <v-toolbar-title style="width: 260px;" class="ml-0 pl-4">
        <v-layout align-center>
          <img
            width="30px"
            src="https://www.gstatic.com/images/branding/product/1x/drive_48dp.png"
            alt="OG Drive"
            class="mr-1"
          />
          <span class="hidden-sm-and-down">OG Drive</span>
        </v-layout>
      </v-toolbar-title>
      <v-text-field
        :solo="pressed"
        :solo-inverted="!pressed"
        :flat="!pressed"
        hide-details
        prepend-inner-icon="mdi-magnify"
        label="Search in drive"
        class="hidden-sm-and-down"
        color="#555"
        @focus="pressed = true"
        @blur="pressed = false"
      />
      <v-spacer />
      <v-btn icon>
        <v-icon>mdi-bell</v-icon>
      </v-btn>
      <v-btn icon large>
        <v-avatar size="35px" item>
          <v-img
            src="https://lh3.googleusercontent.com/-ykrfI9pPAck/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucl91N61xVEOki3ANxwkYEEZd5HgGA.CMID/s64-c/photo.jpg"
            alt="Vuetify"
          />
        </v-avatar>
      </v-btn>
    </v-app-bar>
    <v-content>
      <v-container class="py-0">
        <v-toolbar flat dense class="toolbar">
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
                {{ item.text.toUpperCase() }}
              </v-breadcrumbs-item>
            </template>
          </v-breadcrumbs>
        </v-toolbar>
        <v-divider />
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
  .v-toolbar__content {
    padding-left: 5px;
  }
}
</style>
