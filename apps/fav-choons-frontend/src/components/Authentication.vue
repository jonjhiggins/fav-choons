<template>
  <div>
    <span v-if="loggedInUser === null">
      <button @click="login">Login</button> |
      <button @click="signup">Signup</button>
    </span>
    <span v-else>
      Logged in as {{ loggedInUser.user_metadata.full_name }} |
      <button @click="logout">Logout</button>
    </span>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import netlifyIdentity, { currentUser } from 'netlify-identity-widget';
import axios from 'axios';
import { state, actions } from '../store';

export default Vue.extend({
  name: 'Authentication',
  computed: {
    loggedInUser: () => state.loggedInUser,
  },
  mounted: async () => {
    netlifyIdentity.on('login', actions.login);
    netlifyIdentity.on('init', async (user: netlifyIdentity.User | null) => {
      if (user) {
        actions.login(user);
      }
      console.log(user?.token?.access_token);
      const currentUser = netlifyIdentity.currentUser();
      if (currentUser) {
        console.log(currentUser.token?.access_token);
      }
      const auth = await axios(
        '/.netlify/functions/auth',
        !!user && user.token
          ? {
              headers: {
                Authorization: 'Bearer ' + user?.token?.access_token,
              },
            }
          : undefined
      );
      console.log(auth.data);
    });
    netlifyIdentity.on('logout', actions.logout);
    netlifyIdentity.init();
  },
  methods: {
    login: () => netlifyIdentity.open('login'),
    logout: () => netlifyIdentity.logout(),
    signup: () => netlifyIdentity.open('signup'),
  },
});
</script>

function axios(arg0: string) { throw new Error('Function not implemented.'); }
function axios(arg0: string) { throw new Error('Function not implemented.'); }
