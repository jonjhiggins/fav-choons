<template>
  <div>
    <h1>
      <router-link
        :to="{
          name: 'User',
          params: { username },
        }"
        >{{ username }}</router-link
      >'s tracks on {{ date }}
    </h1>
    <ul v-if="!loading && !errored">
      <li v-for="track in tracks" :key="track.title">
        {{ track.artist }} - {{ track.title }}
      </li>
    </ul>
    <p v-if="errored">Sorry, could not fetch data. Please try again later.</p>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import axios, { AxiosResponse } from 'axios';
import { Track, UserDateResponse } from '@fav-choons/types';
import { DataLoading } from '../types';

interface Data extends DataLoading {
  tracks: Track[];
}

export default Vue.extend({
  name: 'User',
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
        this.tracks = response.data.tracks;
      })
      .catch((error) => {
        console.log(error);
        this.errored = true;
      })
      .finally(() => (this.loading = false));
  },
});
</script>
