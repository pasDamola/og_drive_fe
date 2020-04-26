<template>
  <v-container>Hello {{ $route.params.name }}</v-container>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  layout: 'drive',
  data: () => ({
    routeName: '',
  }),
  computed: {
    ...mapGetters(['getBreadCrumbs']),
  },
  mounted() {
    this.routeName = this.$route.params.name;
    this.$store.dispatch('addBreadCrumbs', {
      text: this.$route.params.name,
      href: `folder/${this.$route.params.name}`,
      disabled: true,
    });
  },
  beforeDestroy() {
    this.$store.dispatch('removeBreadCrumb', `folder/${this.routeName}`);
  },
};
</script>

<style lang="scss" scoped>
.toolbar::v-deep {
  min-height: 100px;
  .v-toolbar__content {
    display: block;
    padding: 0;
  }
}

.count {
  margin-bottom: 0;
  margin-left: 5px;
  font-size: 1.5em;
  opacity: 0.7;
}
</style>
