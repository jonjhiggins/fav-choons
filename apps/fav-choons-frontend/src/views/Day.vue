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
      <li v-for="track in tracks" :key="track.track">
        {{ track.artist }} - {{ track.track }}
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
  props: ['username', 'date'],
  data: () => ({ tracks: [], loading: true, errored: false }),
  mounted: function () {
    axios
      .get(`${API_URL}/user/${this.$props.username}/${this.$props.date}`)
      .then(({ data: { data } }) => {
        this.tracks = data.tracks;
      })
      .catch((error) => {
        console.log(error);
        this.errored = true;
      })
      .finally(() => (this.loading = false));
  },
});
</script>
