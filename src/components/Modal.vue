<template>
    <transition name="modal-fade">
        <div class="fixed inset-0 flex justify-center items-center bg-alpha z-50"
             role="dialog"
             aria-labelledby="modalTitle"
             aria-describedby="modalDescription">
            <div class="flex-1 bg-white shadow-md mx-8 p-6" :class="modalWidth">
                <div class="flex justify-end">
                    <button @click="$emit('closeModal')" class="appearance-none outline-none focus:outline-none text-purple-900 hover:text-purple-600">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" class="fill-current inline-block h-5 w-5">
                            <path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z"/>
                        </svg>
                    </button>
                </div>
                <header class="text-center font-thin text-2xl text-purple-900" id="modalTitle">
                    <slot name="header">title</slot>
                </header>
                <div class="divider bg-purple-400"></div>
                <section class="my-6" id="modalDescription">
                    <slot name="body">body</slot>
                </section>
                <div class="divider bg-purple-400"></div>
                <footer class="mt-6">
                    <slot name="footer">footer</slot>
                </footer>
            </div>
        </div>
    </transition>
</template>

<script>

export default {
    name: "Modal",
    props: ["modalWidth"],
}
</script>

<style scoped>
.bg-alpha {
    background-color: rgba(0, 0, 0, 0.5);
}
.modal-fade-enter,
.modal-fade-leave-active {
    opacity: 0;
}
.modal-fade-enter-active,
.modal-fade-leave-active {
    transition: opacity .1s ease
}
.divider {
    height: 1px;
}
</style>