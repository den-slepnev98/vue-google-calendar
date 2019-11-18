<template>
    <div class="container">
        <Loader v-if="loading" />
        <div v-else class="row justify-content-center">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-header">Login</div>
                    <div class="card-body">
                        <div v-if="error" class="alert alert-danger">{{error}}</div>
                        <form action="#" @submit.prevent="submit">
                            <div class="form-group row">
                                <label for="email" class="col-md-4 col-form-label text-md-right">Email</label>

                                <div class="col-md-6">
                                    <input
                                            id="email"
                                            type="email"
                                            class="form-control"
                                            name="email"
                                            value
                                            required
                                            autofocus
                                            v-model="form.email"
                                    />
                                </div>
                            </div>

                            <div class="form-group row mb-0">
                                <div class="col-md-10" style="text-align: right">
                                    <button type="submit" class="btn btn-primary">Login</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import firebase from "firebase";
    import store from "../store"
    import Loader from '../components/Loader'

    const provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/calendar');

    export default {
        data() {
            return {
                form: {
                    email: ""
                },
                error: null,
                loading: false
            };
        },
        components: {
            Loader
        },
        methods: {
            submit() {
                this.error = null;
                this.loading = true;
                provider.setCustomParameters({
                    'login_hint': this.form.email
                });
                firebase
                    .auth()
                    .signInWithPopup(provider)
                    .then(result => {
                        this.loading = false;
                        if(result.credential) {
                            let user = Object.assign({
                                accessToken: result.credential.accessToken
                            }, result.user);
                            store.dispatch("fetchUser", user);
                            this.initGapi(result.credential.accessToken)
                        }
                        this.$router.replace({name: "home"});
                    })
                    .catch(err => {
                        this.error = err.message;
                        this.loading = false;
                    });
            },
            initGapi(token) {
                this.$getGapiClient().then(gapi => {
                    gapi.client.setToken({
                        access_token: token
                    });
                    store.dispatch('initGapi', gapi);
                    store.dispatch('fetchEvents');
                })
            }
        }
    };
</script>
