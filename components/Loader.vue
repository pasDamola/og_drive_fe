<template>
  <div class="text-center">
    <v-overlay :z-index="10" opacity="0.2">
      <v-btn icon @click="overlay = false">
        <v-progress-circular
          indeterminate
          color="primary"
          size="50"
        ></v-progress-circular>
      </v-btn>
    </v-overlay>
  </div>
</template>

<script>
export default {};
</script>
