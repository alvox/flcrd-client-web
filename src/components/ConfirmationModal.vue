<template>
    <transition name="modal-fade">
        <div class="fixed inset-0 flex justify-center items-center bg-alpha"
             role="dialog"
             aria-labelledby="modalTitle"
             aria-describedby="modalDescription">
            <div class="bg-background-ternary text-copy-primary shadow-md flex flex-col rounded-lg">
                <header class="p-4 border-b-2 border-border-primary font-extrabold" id="modalTitle">
                    <slot name="header"></slot>
                </header>
                <section class="p-4 text-center font-thin" id="modalDescription">
                    <slot name="body"></slot>
                </section>
                <footer class="p-4 flex justify-end">
                    <slot name="footer">
                        <button type="button" class="secondary-btn hover:border-border-s-btn-hover mr-4"
                                @click="close" aria-label="Close modal">
                            {{$t('cancel')}}
                        </button>
                        <button type="button" class="primary-btn-outline hover:bg-background-p-btn-hover hover:text-copy-p-btn-hover" @click="confirm" aria-label="Confirm modal">
                            {{$t('delete')}}
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
        background-color: rgba(0, 0, 0, 0.7);
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
