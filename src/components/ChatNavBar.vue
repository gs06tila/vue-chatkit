<template>
    <b-navbar id="chat-navbar" toggleable="md" type="dark" variant="info">
        <b-navbar-brand href="#">
            Vue Chat
        </b-navbar-brand>
        <b-navbar-nav class="ml-auto">
            <b-nav-text>{{ user.name }} | </b-nav-text>
            <b-nav-item href="#" active>Logout</b-nav-item>
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
                this.$router.push({path: '/'});
                this.logout();
            },
            //gets called when page refresh occurs. If state user.username has been set (user has not logged out), the state reconnect is set to true
            unload() {
                if (this.user.username) {
                    //user hasn´t logged out
                    this.setReconnect(true);
                }
            }
        },
        //Gets called every time chatnavbar.vue has just finished rendering.
        mounted() {
            window.addEventListener('beforeunload', this.unload);
            if(this.reconnect) {
                this.login(this.user.username);
            }
        }
    }
</script>

<style>
    #chat-navbar {
        margin-bottom: 15px;
    }
</style>
