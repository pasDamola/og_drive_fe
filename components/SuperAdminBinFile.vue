<template>
  <div class="file">
    <v-layout align-center justify-space-between>
      <v-icon
        v-if="checked"
        v-show="!hideOptions"
        size="20"
        color="primary"
        @click="checked = false"
      >
        mdi-checkbox-marked-circle-outline
      </v-icon>
      <v-icon v-else v-show="!hideOptions" size="20" @click="checked = true">
        mdi-circle-outline
      </v-icon>
      <v-spacer v-if="hideOptions" />
      <v-menu offset-y>
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on">
            <v-icon size="20">mdi-dots-vertical</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item v-if="!hideOptions" @click="$emit('revert', fileId)">
            <v-list-item-content>Revert</v-list-item-content>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-layout>
    <img :src="getFileIcon()" :alt="`${format} icon`" @click="customDblClick" />
    <p>{{ name | truncate }}</p>
    <v-layout align-center justify-space-between class="file-details nowrap">
      <p class="ellipsis">{{ handleSize }} KB</p>
      <p class="ellipsis">{{ formatDate }}</p>
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
    hideOptions: {
      type: Boolean,
      default: false,
    },
    size: {
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
    handleSize() {
      return parseInt(this.size / 1000);
    },
  },
  watch: {
    checked(val) {
      this.$emit('filesSelected', val);
    },
  },
  methods: {
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

.ellipsis {
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: 0.8rem;
}
</style>
