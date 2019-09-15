<template>
    <transition name="modal-fade">
        <div class="fixed inset-0 flex justify-center items-center bg-alpha"
             role="dialog"
             aria-labelledby="modalTitle"
             aria-describedby="modalDescription">
            <div class="bg-white shadow-md flex flex-col rounded-lg">
                <header class="p-4 border-b-2 font-extrabold text-gray-800" id="modalTitle">
                    <slot name="header">
                        Delete deck
                    </slot>
                </header>
                <section class="p-4 text-center text-gray-800 font-thin" id="modalDescription">
                    <slot name="body">
                        Delete this deck?
                    </slot>
                </section>
                <footer class="p-4 flex justify-end">
                    <slot name="footer">
                        <button type="button" class="secondary-btn hover:text-gray-600 hover:border-gray-600 mr-4"
                                @click="close" aria-label="Close modal">
                            Cancel
                        </button>
                        <button type="button" class="primary-btn hover:bg-gray-600" @click="confirm" aria-label="Confirm modal">
                            Yes, delete
                        </button>
                    </slot>
                </footer>
            </div>
        </div>
    </transition>
</template>

<script>
    export default {
        name: "ConfirmationModal",
        methods: {
            confirm() {
                this.$emit('confirm')
            },
            close() {
                this.$emit('close');
            }
        }
    }
</script>

<style>
    .bg-alpha {
        background-color: rgba(0, 0, 0, 0.5);
    }
    .modal-fade-enter,
    .modal-fade-leave-active {
        opacity: 0;
    }
    .modal-fade-enter-active,
    .modal-fade-leave-active {
        transition: opacity .2s ease
    }
</style>