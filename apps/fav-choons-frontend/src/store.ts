import Vue from 'vue';
import netlifyIdentity from 'netlify-identity-widget';

interface Store {
  loggedInUser: netlifyIdentity.User | null;
}

const store: Store = {
  loggedInUser: null,
};

const actions = {
  login(user: netlifyIdentity.User): void {
    store.loggedInUser = user;
  },
  logout(): void {
    store.loggedInUser = null;
  },
};

const state = Vue.observable(store);
export { state, actions };
