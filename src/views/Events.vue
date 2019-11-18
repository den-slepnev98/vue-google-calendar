<template>
    <div class="events">
        <div v-if="user.loggedIn">
            <h2>{{header}}</h2>
            <Modal />
            <div class="col-12" v-if="allowFilter">
                <FilterEvents />
            </div>
            <ul v-if="allEvents.length">
                <EventItem
                        v-for="event in allEvents"
                        v-bind:event="event"
                />
            </ul>
            <p v-else>No events</p>
        </div>
        <h3 v-else>Not authorized</h3>
    </div>
</template>

<script>
    import EventItem from "../components/EventItem";
    import Modal from "../components/Modal";
    import FilterEvents from "../components/FilterEvents";
    import {mapGetters} from 'vuex'

    export default {
        components: {
            EventItem,
            Modal,
            FilterEvents
        },
        computed: {
            allEvents() {
                if(this.$router.history.current.name === "events") {
                    return this.$store.getters.allEvents
                } else {
                    return this.$store.getters.nearestEvents
                }
            },
            ...mapGetters({
                user: "user"
            }),
            allowFilter: function () {
                return this.$router.history.current.name === "events"
            },
            header: function () {
                return this.$router.history.current.name === "events" ? "All events" : "The nearest events"
            }
        }
    }
</script>

<style>
    ul {
        list-style: none;
        padding: 0;
        margin: 0;
        max-height: 500px;
        overflow-y: auto;
    }
    .events {
        max-width: 1200px;
        margin: 0 auto;
    }
</style>
