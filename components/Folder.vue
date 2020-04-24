<template>
  <div class="folder">
    <v-icon class="mr-5">mdi-folder-account</v-icon>
    <p class="mb-0 body-2 font-weight-medium">{{ folderName }}</p>
  </div>
</template>

<script>
export default {
  props: {
    folderName: {
      type: String,
      default: '',
    },
  },
};
</script>

<style lang="scss" scoped>
.folder {
  margin: 0 auto;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  width: 215px;
  height: 50px;
  position: relative;
  display: flex;
  align-items: center;
  padding: 0 16px;
}

.font-weight-medium {
  opacity: 0.8;
}
</style>
