<template>
    <li>
        <span>
            {{event.summary}}
            <a href="#" v-if="fullInfo" @click.prevent="openEvent(event.id)">Show details</a>
        </span>
        {{event.start.dateTime | moment("DD/MM/YYYY, h:mm a") || event.start.date | moment("DD/MM/YYYY")}}
        - {{event.end.dateTime | moment("DD/MM/YYYY, h:mm a") || event.end.date | moment("DD/MM/YYYY")}}
        <span v-if="fullInfo" class="desc">{{event.description || "-"}}</span>
    </li>
</template>

<script>
    export default {
        props: ["event"],
        computed: {
            fullInfo: function () {
                return this.$router.history.current.name === "events"
            }
        },
        methods: {
            openEvent(id) {
                this.$router.replace(`/event/${id}`)
            }
        }
    }
</script>

<style scoped>

    li {
        display: flex;
        justify-content: space-between;
        flex-direction: column;
        padding: .5rem .2rem;
        border: 1px solid gray;
        border-radius: 5px;
        margin: .5rem auto;
        width: 80%;
        align-items: flex-start;
        font-size: 12px;
    }
    span {
        font-weight: bold;
        font-size: 16px;
        width: 95%;
        display: flex;
        justify-content: space-between;
    }
    a {
        font-size: 13px;
    }
    .desc {
        font-size: 14px;
        font-style: italic;
    }
</style>
