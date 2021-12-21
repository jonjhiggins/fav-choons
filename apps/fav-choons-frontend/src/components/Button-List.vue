<template>
  <ul class="grid gap-2 grid-cols-2">
    <li v-for="item in items" :key="item.heading">
      <router-link
        class="block bg-green-700 bg-opacity-50 hover:bg-green-700 text-md px-4 py-6 border-2 border-opacity-50 border-green-400 rounded-xl text-center"
        :to="{
          name: item.linkName,
          params: item.linkParams,
        }"
        >{{ item.heading }}</router-link
      >
    </li>
  </ul>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';

export interface ButtonListItem {
  heading: string;
  linkName: string;
  linkParams: Record<string, unknown>;
}

export default Vue.extend({
  name: 'Button-List',
  props: {
    items: [] as PropType<ButtonListItem[]>,
  },
});
</script>
