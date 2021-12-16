<template>
  <div>
    <h1>{{ username }}'s profile</h1>
    <ul v-if="!loading && !errored">
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
    <p v-if="errored">Sorry, could not fetch data. Please try again later.</p>
  </div>
</template>

<script>
import Vue from 'vue';
import axios from 'axios';

export default Vue.extend({
  name: 'User',
  props: ['username'],
  data: () => ({ dates: [], loading: true, errored: false }),
  mounted: function () {
    axios
      .get(`${API_URL}/user/${this.$props.username}`)
      .then(({ data: { data } }) => {
        this.dates = data.dates;
      })
      .catch((error) => {
        console.log(error);
        this.errored = true;
      })
      .finally(() => (this.loading = false));
  },
});
</script>
