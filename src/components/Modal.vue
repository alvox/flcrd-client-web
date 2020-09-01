<template>
    <transition name="modal-fade">
        <div class="fixed inset-0 flex justify-center items-center bg-alpha"
             role="dialog"
             aria-labelledby="modalTitle"
             aria-describedby="modalDescription">
            <div class="flex-1 bg-white shadow-md mx-8 p-6 max-w-sm">
                <header class="text-center font-thin text-2xl mt-4" id="modalTitle">
                    <slot name="header">title</slot>
                </header>
                <div class="divider bg-gray-400"></div>
                <section class="my-6" id="modalDescription">
                    <slot name="body">body</slot>
                </section>
                <div class="divider bg-gray-400"></div>
                <footer class="mt-6">
                    <slot name="footer">footer</slot>
                </footer>
            </div>
        </div>
    </transition>
</template>

<script>
export default {
    name: "Modal"
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