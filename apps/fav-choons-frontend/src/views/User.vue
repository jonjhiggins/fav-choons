<template>
  <div>
    <page-header :heading="username + '\'s profile'"></page-header>
    <button-list
      :items="dates"
      v-if="!loading && !errored && dates.length > 0"
    ></button-list>
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
import PageHeader from '../components/Page-Header.vue';
import ButtonList, { ButtonListItem } from '../components/Button-List.vue';

interface Data extends DataLoading {
  dates: ButtonListItem[];
}

export default Vue.extend({
  components: { 'page-header': PageHeader, 'button-list': ButtonList },
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
        this.dates = response.data.dates.map((date) => ({
          heading: date,
          linkName: 'Day',
          linkParams: { username: this.username, date },
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
