<template>
  <div>
    <h1>{{ username }}'s profile</h1>
    <ul v-if="!loading && !errored && dates.length > 0">
      <li v-for="date in dates" :key="date">
        <router-link
          :to="{
            name: 'Day',
            params: { username, date },
          }"
          >{{ date }}</router-link
        >
      </li>
    </ul>
    <p v-if="!loading && !errored && dates.length === 0">
      Sorry, could not find any dates for user {{ username }}.
    </p>
    <p v-if="errored">Sorry, could not fetch data. Please try again later.</p>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import axios, { AxiosResponse } from 'axios';
import { UserResponse, Dates } from '@fav-choons/types';
import { DataLoading } from '../types';

interface Data extends DataLoading {
  dates: Dates;
}

export default Vue.extend({
  name: 'User',
  props: { username: String },
  data: (): Data => ({ dates: [], loading: true, errored: false }),
  mounted: function () {
    axios
      .get(`${API_URL}/user/${this.username}`)
      .then(({ data: response }: AxiosResponse<UserResponse>) => {
        if (response.ok === false) {
          this.errored = true;
          console.log(response.error);
          return;
        }
        this.dates = response.data.dates;
      })
      .catch((error) => {
        console.log(error);
        this.errored = true;
      })
      .finally(() => (this.loading = false));
  },
});
</script>
