<template>
    <form  @submit.prevent="submit">
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
        <div v-if="errors.length" class="alert alert-danger">
            <ul>
                <li v-for="error in errors">{{ error }}</li>
            </ul>
        </div>
        <button class="btn btn-success" type="submit">Create event</button>
    </form>
</template>

<script>
    import datetime from 'vuejs-datetimepicker'

    export default {
        data() {
            return {
                summary: '',
                description: '',
                start: '',
                end: '',
                allDay: false,
                errors: []
            }
        },
        watch: {
            allDay(val) {
                if(val) {
                    this.start = this.start.split("T")[0];
                    this.end = this.end.split("T")[0];
                }
            },
            start(val) {
                if(this.allDay) {
                    this.start = val.split("T")[0]
                }
            },
            end(val) {
                if(this.allDay) {
                    this.end = val.split("T")[0]
                }
            }
        },
        components: {
            datetime
        },
        methods: {
            submit() {
                this.errors = [];
                if(!this.summary) {
                    this.errors.push("Summary is required");
                }
                if(!this.start) {
                    this.errors.push("Start is required");
                }
                if(!this.end) {
                    this.errors.push("End is required");
                }
                if(this.start > this.end) {
                    this.errors.push("Start date must be less or equal than end date")
                }
                if(!this.errors.length) {
                    let newEvent = {
                        summary: this.summary,
                        description: this.description,
                        start: {
                            timeZone: "Europe/Kiev"
                        },
                        end: {
                            timeZone: "Europe/Kiev"
                        },
                        id: Date.now()
                    };
                    if(this.allDay) {
                        newEvent.start.date = this.start;
                        newEvent.end.date = this.end;
                    } else {
                        newEvent.start.dateTime = this.start;
                        newEvent.end.dateTime = this.end;
                    }
                    this.$store.dispatch('insertEvent', newEvent);
                    this.summary = this.start = this.end = this.msg = this.description = '';
                    this.allDay = false;
                    this.$emit('close-modal', true);
                }
            }
        }
    }
</script>

<style scoped>
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
