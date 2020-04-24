<template>
  <v-container> Hello {{ $route.params.name }} </v-container>
</template>

<script>
export default {
  layout: 'drive',
  data: () => ({
    routeName: '',
  }),
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

<style></style>
