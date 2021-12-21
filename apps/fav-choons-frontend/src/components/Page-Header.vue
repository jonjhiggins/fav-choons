<template>
  <h1 class="text-lg mb-6">{{ heading }}</h1>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'Page-Header',
  props: {
    heading: String,
  },
});
</script>
