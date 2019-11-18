<template>
    <div class="event">
        <div class="card">
            <div class="card-header">
                Event #{{this.id}}
            </div>
            <div class="card-body">
                <form @submit.prevent="submit">
                    <div class="form-group">
                        <label>Summary:</label>
                        <input class="form-control" type="text" v-model="summary" />
                    </div>
                    <div class="form-group">
                        <label>Description:</label>
                        <textarea rows="3" class="form-control" v-model="description"></textarea>
                    </div>
                    <div class="form-group">
                        <label>All day: </label>
                        <input type="checkbox" v-model="allDay">
                    </div>
                    <div class="form-group">
                        <label>Start:</label>
                        <VueCtkDateTimePicker format="YYYY-MM-DDThh:mm:ss" v-model="start" />
                    </div>
                    <div class="form-group">
                        <label>End:</label>
                        <VueCtkDateTimePicker format="YYYY-MM-DDThh:mm:ss" v-model="end" />
                    </div>
                </form>
                <div class="btn-container">
                    <button @click="removeEvent" class="btn btn-danger">Remove event</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import store from '../store'

    export default {
        props: ["id"],
        data() {
            return {
                start: null,
                end: null,
                startInit: false,
                endInit: false
            }
        },
        beforeCreate: function() {
            if(!store.getters.allEvents.length) {
                this.$router.replace({name: "home"});
            }
        },
        mounted: function () {
            if(this.id) {
                let event = store.getters.getEventById(this.id);
                this.start = event ? (event.start.dateTime || event.start.date): '';
                this.end = event ? (event.end.dateTime || event.end.date): '';
            }
        },
        methods: {
            removeEvent() {
                if(this.id) {
                    store.dispatch('removeEvent', this.id).then(()=> {
                        this.$router.replace({name: "events"});
                    });
                }
            }
        },
        watch: {
            start: function (newVal, oldVal) {
                if(!newVal) {
                    this.start = oldVal;
                    return
                }
                if(this.start > this.end) {
                    this.start = oldVal
                } else {
                    if(newVal.indexOf("T") !== -1 && (this.start.indexOf("T") !== -1 || this.end.indexOf("T") !== -1) && this.startInit) {
                        store.dispatch('updateEvent', {
                            id: this.id,
                            key: "start",
                            value: newVal
                        });
                    }
                }
                this.startInit = true;
            },
            end: function (newVal, oldVal) {
                if(!newVal) {
                    this.end = oldVal;
                    return
                }
                if(this.start > this.end) {
                    this.end = oldVal
                } else {
                    if(newVal.indexOf("T") !== -1 && (this.start.indexOf("T") !== -1 || this.end.indexOf("T") !== -1) && this.endInit) {
                        store.dispatch('updateEvent', {
                            id: this.id,
                            key: "end",
                            value: newVal
                        });
                    }
                }
                this.endInit = true;
            }
        },
        computed: {
            summary: {
                get: function() {
                    let event = store.getters.getEventById(this.id);
                    return event ? event.summary: ''
                },
                set: function(value) {
                    store.dispatch('updateEvent', {
                        id: this.id,
                        key: "summary",
                        value
                    });
                }
            },
            description: {
                get: function() {
                    let event = store.getters.getEventById(this.id);
                    return event ? event.description: ''
                },
                set: function(value) {
                    store.dispatch('updateEvent', {
                        id: this.id,
                        key: "description",
                        value
                    });
                }
            },
            allDay: {
                get: function () {
                    return this.start && this.end && this.start.indexOf("T") === -1  && this.end.indexOf("T") === -1
                },
                set: function(value) {
                    if(value) {
                        this.start = this.start.split("T")[0];
                        this.end = this.end.split("T")[0];
                    }

                    store.dispatch('updateEvent', {
                        id: this.id,
                        key: "allDay",
                        value
                    });
                }
            }
        }
    }
</script>

<style scoped>
    .btn-container {
        text-align: end;
    }
    .event {
        max-width: 600px;
        margin: 0 auto;
        margin-top: 50px;
    }
    .form-group {
        display: flex;
        align-items: baseline;
        justify-content: space-between;
    }
    input, textarea {
        max-width: 70%;
    }
    .msg {
        color: #e40a0a;
        margin: 1rem 0;
    }
    .date-time-picker {
        max-width: 70%;
        margin: 0;
    }
</style>
