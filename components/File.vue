<template>
  <div class="file">
    <div class="file-preview"></div>
    <div class="file-info">
      <v-layout align-center>
        <img :src="getFileIcon()" alt="" />
        <p class="mb-0 ml-3 body-2 font-weight-normal">
          {{ name | truncate }}
        </p>
      </v-layout>
      <p class="caption my-2">You edited {{ formatDate }}</p>
    </div>
  </div>
</template>

<script>
import Moment from 'moment';
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
  },
  computed: {
    formatDate() {
      return Moment(this.lastEdited).fromNow();
    },
  },
  methods: {
    getFileIcon() {
      if (['doc', 'docm', 'dotm', 'docx', 'docb'].includes(this.format)) {
        return '/images/document.png';
      } else if (
        ['xls', 'xlsx', 'xlsm', 'xltx', 'xltm'].includes(this.format)
      ) {
        return '/images/spreadsheet.png';
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
        return '/images/powerpoint.png';
      } else if (this.format === 'pdf') {
        return '/images/pdf.png';
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.file {
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  width: 215px;
  height: 190px;
  position: relative;
  padding: 0;

  &-preview {
    background-color: #dadce0;
    width: calc(100% + 1px);
    height: 100%;
    border-radius: 5px 5px 0 0;
  }

  &-info {
    position: absolute;
    background-color: #fff;
    bottom: -1px;
    left: -1px;
    right: -1px;
    height: 40%;
    border-radius: 0 0 5px 5px;
    border: 1px solid #dadce0;
    padding: 13px 15px;
  }
}
</style>
