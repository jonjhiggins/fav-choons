<template>
  <div>
    <page-header :heading="username + '\'s tracks on ' + date"></page-header>
    <button-list :items="tracks" v-if="!loading && !errored"></button-list>
    <p v-if="errored">Sorry, could not fetch data. Please try again later.</p>
    <h3 class="text-md mt-6">
      <router-link
        :to="{
          name: 'User',
          params: { username },
        }"
        >{{ username }}'s profile</router-link
      >
    </h3>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import axios, { AxiosResponse } from 'axios';
import { UserDateResponse } from '@fav-choons/types';
import { DataLoading } from '../types';
import PageHeader from '../components/Page-Header.vue';
import ButtonList, { ButtonListItem } from '../components/Button-List.vue';

interface Data extends DataLoading {
  tracks: ButtonListItem[];
}

export default Vue.extend({
  name: 'Day',
  components: { 'page-header': PageHeader, 'button-list': ButtonList },
  props: { username: String, date: String },
  data: (): Data => ({ tracks: [], loading: true, errored: false }),
  mounted: function () {
    axios
      .get(`${API_URL}/user/${this.username}/${this.date}`)
      .then(({ data: response }: AxiosResponse<UserDateResponse>) => {
        if (!response.ok) {
          this.errored = true;
          console.log(response.error);
          return;
        }
        this.tracks = response.data.tracks.map((track) => ({
          heading: `${track.artist} - ${track.title}`,
          linkName: 'User',
          linkParams: { username: this.username },
        }));
      })
      .catch((error) => {
        console.log(error);
        this.errored = true;
      })
      .finally(() => (this.loading = false));
  },
});
</script>
