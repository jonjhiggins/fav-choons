<template>
  <div>
    <page-header heading="Add Day"></page-header>
    Date: {{ date }}
    <form>
      <fieldset>
        <label for="track-artist">Artist</label>
        <input
          type="text"
          name="track-artist"
          class="block rounded p-1 text-black"
        />
        <label for="track-title">Title</label>
        <input
          type="text"
          name="track-title"
          id="track-title"
          class="block rounded p-1 text-black"
        />
      </fieldset>
      <button type="submit">Submit</button>
    </form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import PageHeader from '../components/Page-Header.vue';
import { format } from 'date-fns';
import { dateFormat } from '@fav-choons/constants';

export default Vue.extend({
  components: { 'page-header': PageHeader },
  computed: {
    date: (): string => format(new Date(), dateFormat),
  },
});
</script>
