<template>
    <div class="row justify-content-center">
        <form class="col-10">
            <h4>Filter events</h4>
            <div class="form-group mt-4">
                <label>Choose the date range:</label>
                <VueCtkDateTimePicker format="DD/MM/YYYY" :label="'Select range'" :auto-close="true" :range="true" v-model="range" />
            </div>
        </form>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                range: {
                    start: null,
                    end: null
                },
            }
        },
        watch: {
            range(value) {
                this.$store.commit('FILTER_EVENTS', {
                    start: value ? value.start : null,
                    end: value ? value.end : null
                });
            }
        }
    }
</script>

<style scoped>
    button {
        width: 100%;
    }
    .btn-block {
        text-align: right;
    }
    .form-group {
        display: flex;
        align-items: baseline;
        justify-content: space-between;
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
