<template>
  <div class="file">
    <v-layout align-center justify-space-between>
      <v-icon v-if="checked" size="20" color="primary" @click="checked = false">
        mdi-checkbox-marked-circle-outline
      </v-icon>
      <v-icon v-else size="20" @click="checked = true">
        mdi-circle-outline
      </v-icon>
      <v-menu offset-y>
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on">
            <v-icon size="20">mdi-dots-vertical</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item @click="$emit('deleteFile', [fileId, name])">
            <v-list-item-content>Delete File</v-list-item-content>
          </v-list-item>
          <v-list-item @click="$emit('viewDetails', [fileId, getFileIcon()])">
            <v-list-item-content>View Details</v-list-item-content>
          </v-list-item>
          <v-list-item @click="shareFile">
            <v-list-item-content>Share</v-list-item-content>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-layout>
    <img :src="getFileIcon()" :alt="`${format} icon`" />
    <p>{{ name | truncate }}</p>
    <v-layout align-center justify-space-between class="file-details">
      <p>1 MB</p>
      <p>{{ formatDate }}</p>
    </v-layout>
  </div>
</template>

<script>
import Moment from 'moment';
import { EventBus } from '../plugins/eventBus';

export default {
  filters: {
    truncate(val) {
      if (val && val.length > 20) {
        return `${val.slice(0, 20)}...`;
      }
      return val;
    },
  },
  props: {
    format: {
      type: String,
      default: '',
    },
    name: {
      type: String,
      default: '',
    },
    lastEdited: {
      type: String,
      default: '',
    },
    fileId: {
      type: String,
      default: '',
    },
  },
  data: () => ({
    checked: false,
  }),
  computed: {
    formatDate() {
      return Moment(this.lastEdited).fromNow();
    },
  },
  watch: {
    checked(val) {
      this.$emit('filesSelected', val);
    },
  },
  methods: {
    getFileIcon() {
      if (['doc', 'docm', 'dotm', 'docx', 'docb'].includes(this.format)) {
        return '/images/docs.png';
      } else if (
        ['xls', 'xlsx', 'xlsm', 'xltx', 'xltm'].includes(this.format)
      ) {
        return '/images/sheet.png';
      } else if (
        [
          'pptx',
          'pptm',
          'ppt',
          'pptm',
          'ppsx',
          'sldm',
          'potx',
          'ppam',
        ].includes(this.format)
      ) {
        return '/images/slides.png';
      } else if (this.format === 'pdf') {
        return '/images/pdf.png';
      } else if (this.format === 'html') {
        return '/images/html.png';
      } else if (this.format === 'png') {
        return '/images/png.png';
      }
    },
    shareFile() {
      EventBus.$emit('shareFile', this.fileId);
    },
  },
};
</script>

<style lang="scss" scoped>
.file {
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
