<template>
  <div class="folder">
    <v-layout align-center justify-space-between>
      <v-icon
        v-if="checked"
        size="20"
        color="primary"
        @click.prevent="checked = false"
      >
        mdi-checkbox-marked-circle-outline
      </v-icon>
      <v-icon v-else size="20" @click.prevent="checked = true">
        mdi-circle-outline
      </v-icon>
      <v-icon size="20">mdi-dots-vertical</v-icon>
    </v-layout>
    <img src="/images/folder.png" alt="Folder icon" />
    <p>{{ folderName }}</p>
    <v-layout align-center justify-space-between class="folder-details">
      <p>1 MB</p>
      <p>{{ formatDate }}</p>
    </v-layout>
  </div>
</template>

<script>
import Moment from 'moment';

export default {
  props: {
    folderName: {
      type: String,
      default: '',
    },
    lastUpdated: {
      type: String,
      default: '',
    },
  },
  data: () => ({
    checked: false,
  }),
  computed: {
    formatDate() {
      return Moment(this.lastUpdated).fromNow();
    },
  },
};
</script>

<style lang="scss" scoped>
.folder {
  border-radius: 5px;
  width: 215px;
  height: 220px;
  position: relative;
  padding: 20px;
  margin: 0 auto;
  background-color: #fff;
  text-align: center;
  img {
    margin-top: 10px;
    width: 80px;
  }

  > p {
    font-size: 14px;
    opacity: 0.9;
    margin-bottom: 20px;
  }

  &-details {
    opacity: 0.7;
    p {
      font-size: 134x;
    }
  }
}

.font-weight-medium {
  opacity: 0.8;
}
</style>
