<template>
    <nav class="navbar navbar-expand-md navbar-light navbar-laravel">
        <div class="container">
            <router-link to="/" class="navbar-brand">Vue Firebase Auth</router-link>
            <button
                    class="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label
            >
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto"></ul>
                <ul class="navbar-nav ml-auto">
                    <li class="nav-item"><router-link class="nav-link" to="/">Home</router-link></li>
                    <li class="nav-item"><router-link class="nav-link" to="/events">Events</router-link></li>
                    <template v-if="user.loggedIn">
                        <li class="nav-item"><div class="nav-link">{{user.data.displayName}}</div></li>
                        <li class="nav-item">
                            <a class="nav-link" @click.prevent="signOut">Sign out</a>
                        </li>
                    </template>
                    <template v-else>
                        <li class="nav-item">
                            <router-link to="/login" class="nav-link">Login</router-link>
                        </li>
                    </template>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script>
    import { mapGetters } from 'vuex'
    import firebase from "firebase"

    export default {
        computed: {
            ...mapGetters({
                user: "user"
            })
        },
        methods: {
            signOut() {
                firebase
                    .auth()
                    .signOut()
                    .then(() => {
                        this.$store.dispatch("fetchUser", null);
                        this.$store.dispatch("initGapi", null);
                        this.$store.commit("set_events", []);
                        if(this.$router.history.current.name !== "home") {
                            this.$router.replace({name: "home"})
                        }
                    })
                    .catch(err => {
                        console.error(err)
                    })
            }
        }
    }
</script>
