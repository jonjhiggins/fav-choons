<template>
  <div>
    <page-header heading="Users"></page-header>
    <button-list v-if="!loading && !errored" :items="users"></button-list>
    <p v-if="errored">Sorry, could not fetch data. Please try again later.</p>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { DataLoading } from '../types';
import { AllUsersResponse } from '@fav-choons/types';
import axios, { AxiosResponse } from 'axios';
import PageHeader from '../components/Page-Header.vue';
import ButtonList, { ButtonListItem } from '../components/Button-List.vue';

interface Data extends DataLoading {
  users: ButtonListItem[];
}

export default Vue.extend({
  components: { 'page-header': PageHeader, 'button-list': ButtonList },
  name: 'Home',
  data: (): Data => ({
    users: [],
    loading: true,
    errored: false,
  }),
  mounted: function () {
    axios
      .get(`${API_URL}/users`)
      .then(({ data: response }: AxiosResponse<AllUsersResponse>) => {
        if (!response.ok) {
          this.errored = true;
          console.log(response.error);
          return;
        }
        if (!response.data.users) {
          this.errored = true;
          return;
        }
        this.users = response.data.users.map((user) => ({
          heading: user.username,
          linkName: 'User',
          linkParams: { username: user.username },
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
