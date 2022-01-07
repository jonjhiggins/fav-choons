<template>
  <div id="app" class="p-6 font-mono max-w-xl mx-auto">
    <div class="max-w-xl mx-auto">
      <nav
        class="bg-gray-700 text-white p-6 content-center font-mono shadow-lg rounded-xl mb-6"
        id="nav"
      >
        <authentication></authentication>
        <h1 class="text-4xl text-center font-bold mt-3 mb-3">
          <router-link to="/">fav choons</router-link>
        </h1>
      </nav>
      <main
        class="bg-green-700 bg-opacity-50 text-white p-6 content-center font-mono shadow-lg rounded-xl"
      >
        <router-view />
      </main>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Authentication from './components/Authentication.vue';

export default Vue.extend({
  name: 'App',
  components: { authentication: Authentication },
});
</script>
