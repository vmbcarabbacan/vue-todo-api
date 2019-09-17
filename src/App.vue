<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>Vuetify</span>
        <span class="font-weight-light">To-Do</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn text color="red" @click="started" v-if="isLogin == 0">
        <span class="mr-2">Get Started</span>
      </v-btn>
      <v-btn text color="red" @click="logout" v-else>
        <span class="mr-2">Logout</span>
      </v-btn>
      <started />
      <snackbar />
    </v-app-bar>

    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import started from './components/Started';
import { fb } from './firebase';
import snackbar from './components/snackbar';
export default {
  name: 'App',
  components: {
    started,
    snackbar
  },
  
  data() {
    return {

    }
  },

  created() {
    this.$store.dispatch('retrieveTodos');
  },

  methods: {
    started() {
      this.$store.commit('startedDialogCommit', true)
    },
    logout() {
      fb.auth().signOut()
      .then((result) => {
        
        this.$store.commit('openSnackbar', 'You successfully logout!')
        this.$store.commit('currentUser', null)
      }).catch((err) => {
        this.$store.commit('openSnackbar', err)
      });
    }
  },
  computed: {
    currentUser() {
      return this.$store.state.currentUser
    },
    isLogin() {
      return this.currentUser == null ? 0 : Object.keys(this.$store.state.currentUser).length
    }
  }
};
</script>
