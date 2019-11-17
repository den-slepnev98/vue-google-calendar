<template>
    <div class="event">
        <div class="card">
            <div class="card-header">
                Event # {{this.id}}
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
                        <label>Start:</label>
                        <VueCtkDateTimePicker format="YYYY-MM-DD hh:mm:ss" v-model="start" />
                    </div>
                    <div class="form-group">
                        <label>End:</label>
                        <VueCtkDateTimePicker format="YYYY-MM-DD hh:mm:ss" v-model="end" />
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
    import store from '../store'

    export default {
        props: ["id"],
        computed: {
            summary: {
                get: function() {
                    let event = store.getters.getEventById(this.id);
                    return event ? event.summary: ''
                },
                set: (value) => {

                }
            },
            description: {
                get: function() {
                    let event = store.getters.getEventById(this.id);
                    return event ? event.description: ''
                },
                set: (value) => {

                }
            },
            start: {
                get: function() {
                    let event = store.getters.getEventById(this.id);
                    return event ? (event.start.dateTime || event.start.date): ''
                },
                set: (value) => {

                }
            },
            end: {
                get: function() {
                    let event = store.getters.getEventById(this.id);
                    return event ? (event.end.dateTime || event.end.date): ''
                },
                set: (value) => {

                }
            }
        },
        methods: {
            submit() {

            }
        }
    }
</script>

<style scoped>
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
