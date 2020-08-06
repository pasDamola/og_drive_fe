<template>
  <v-overlay :value="show" class="relative" opacity="0.7">
    <v-btn icon fixed top right @click="$emit('hide')">
      <v-icon>mdi-close</v-icon>
    </v-btn>
    <div class="frame">
      <iframe :src="previewUrl" frameborder="0"></iframe>
    </div>
    <div class="details text-center">
      <h3>{{ data.filename }}</h3>
      <span>
        Last Modified {{ data.updatedAt | date }} - {{ data.file_size | size }}
      </span>
      <a
        class="white--text no-underline font-weight-bold"
        :href="data.file_url"
        download
      >
        Download File
      </a>
    </div>
  </v-overlay>
</template>

<script>
import Moment from 'moment';

export default {
  filters: {
    date(val) {
      if (val) {
        return Moment(val).format('MMMM Do YYYY');
      }
      return null;
    },
    size(val) {
      if (val) {
        const kb = val / 1000;
        let size = '';
        if (parseInt(kb, 10) >= 1000) {
          size = `${(kb / 1000).toFixed(1)}MB`;
        } else {
          size = `${kb.toFixed(1)}KB`;
        }
        return size;
      }
      return null;
    },
  },
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    data: {
      type: Object,
      default: () => {},
    },
  },
  data: () => ({
    overlay: false,
    previewUrl: '',
  }),
  mounted() {
    if (this.data.isImage) {
      this.previewUrl = this.data.file_url;
    } else {
      this.previewUrl = `https://docs.google.com/viewer?embedded=true&url=${this.data.file_url}`;
    }
  },
};
</script>

<style lang="scss" scoped>
.frame {
  width: 1000px;
  max-width: calc(100vw - 20px);
  margin: 0 auto;
  box-sizing: border-box;
  height: 70vh;
  max-height: 1000px;
  border: 1px solid green;
  position: relative;

  iframe::v-deep {
    width: 100%;
    height: 100%;
    body {
      background-color: red;
      img {
        width: 100%;
      }
    }
  }
}
</style>
