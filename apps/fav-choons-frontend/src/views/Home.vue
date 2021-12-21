<template>
  <div>
    <h1 class="text-lg">Users</h1>
    <ul v-if="!loading && !errored" class="grid gap-2 grid-cols-2">
      <li
        class="rounded shadow bg-white text-md p-4"
        v-for="user in users"
        :key="user.username"
      >
        <router-link
          :to="{
            name: 'User',
            params: { username: user.username },
          }"
          >{{ user.username }}</router-link
        >
      </li>
    </ul>
    <p v-if="errored">Sorry, could not fetch data. Please try again later.</p>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { DataLoading } from '../types';
import { AllUsers, AllUsersResponse } from '@fav-choons/types';
import axios, { AxiosResponse } from 'axios';

interface Data extends DataLoading {
  users: AllUsers['users'];
}

export default Vue.extend({
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
        this.users = response.data.users;
      })
      .catch((error) => {
        console.log(error);
        this.errored = true;
      })
      .finally(() => (this.loading = false));
  },
});
</script>
