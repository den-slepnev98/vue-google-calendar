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
            <label>Start:</label>
            <VueCtkDateTimePicker format="YYYY-MM-DD hh:mm:ss" v-model="start" />
        </div>
        <div class="form-group">
            <label>End:</label>
            <VueCtkDateTimePicker format="YYYY-MM-DD hh:mm:ss" v-model="end" />
        </div>
        <div class="msg">
            {{this.msg}}
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
                msg: ''
            }
        },
        components: {
            datetime
        },
        methods: {
            submit() {
                if(this.start <= this.end) {
                    this.$store.dispatch('insertEvent', {
                        summary: this.summary,
                        description: this.description,
                        start: {
                            dateTime: this.start.split(" ").join("T"),
                            timeZone: "Europe/Kiev"
                        },
                        end: {
                            dateTime: this.end.split(" ").join("T"),
                            timeZone: "Europe/Kiev"
                        },
                        id: Date.now()
                    });
                    this.summary = this.start = this.end = this.msg = this.description = '';
                    this.$emit('close-modal', true);
                } else {
                    this.msg = "Start date must be less or equal than end date"
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
