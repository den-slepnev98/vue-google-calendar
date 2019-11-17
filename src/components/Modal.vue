<template>
    <div>
        <button class="btn btn-primary my-3" @click="showModal = true">Create event</button>
        <hr>
        <div  v-if="showModal" >
            <div class="modal">
                <div class="modal-dialog">
                    <div class="modal-content">

                        <!-- Modal Header -->
                        <div class="modal-header">
                            <h4 class="modal-title">Modal Heading</h4>
                        </div>

                        <!-- Modal body -->
                        <div class="modal-body">
                            <CreateEvent
                                v-on:close-modal="closeModal"
                            />
                        </div>

                        <!-- Modal footer -->
                        <div class="modal-footer">
                            <button type="button" class="btn btn-danger" @click="showModal = false">Close</button>
                        </div>

                    </div>
                </div>
            </div>
            <div class="secondBlur"></div>
        </div>
    </div>
</template>

<script>
    import CreateEvent from '../components/CreateEvent'

    export default {
        components: {
            CreateEvent
        },
        data() {
            return {
                showModal: false
            }
        },
        methods: {
            closeModal(close) {
                this.showModal = !close
            }
        }
    }
</script>

<style>
    .modal {
        display: block !important;
    }
    .secondBlur{
        background-color:gainsboro;
        top:0;
        left:0;
        position:absolute;
        width:100%;
        height:100%;
        filter:opacity(0.3);
        filter:blur(20px);
    }
</style>
