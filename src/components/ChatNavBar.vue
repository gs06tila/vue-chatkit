<template>
  <b-navbar id="chat-navbar" toggleable="md" type="dark" variant="info">
    <b-navbar-brand href="#">
      Vue Chat
    </b-navbar-brand>
    <b-navbar-nav class="ml-auto">
      <b-nav-text>{{ user.name }} | </b-nav-text>
      <b-nav-item href="#" @click="onLogout" active>Logout</b-nav-item>
    </b-navbar-nav>
  </b-navbar>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'

export default {
  name: 'ChatNavBar',
  computed: {
    ...mapState([
      'user',
      'reconnect'
    ])
  },
  methods: {
    ...mapActions([
      'logout',
      'login'
    ]),
    ...mapMutations([
      'setReconnect'
    ]),
    onLogout() {
      this.$router.push({ path: '/' });
      this.logout();
    },
    //Unload When a page refresh occurs, this method gets called. It checks first the state user.username has been set. If it has, it means the user has not logged out. The state reconnect is set to true
    unload() {
      if(this.user.username) {
        this.login(this.user.username);
      }
    }
  },
  mounted() {
    //mounted. This method gets called every time ChatNavbar.vue has just finished rendering. It first assigns a handler to an event listener that gets called just before the page unloads. It also does a check if state.reconnect has been set to true. If so, then the login procedure is executed, thus reconnecting our chat application back to our ChatKit service.
    window.addEventListener('beforeinload', this.unload);
  }
}
</script>

<style>
  #chat-navbar {
    margin-bottom: 15px;
  }
</style>