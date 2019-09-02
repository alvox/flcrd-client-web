<template>
    <div class="mx-auto max-w-sm bg-white rounded-lg mt-10">
        <div class="border-2 border-gray-400 rounded-lg rounded-b-none">
            <p class="text-base font-semibold m-4 pt-1 text-gray-800">Add Flashcard</p>
        </div>
        <form class="border-2 border-gray-400 rounded-lg border-t-0 rounded-t-none block" autocomplete="off"
              @submit.prevent="AddFlashcard">
            <div class="p-4 pt-6">
                <label class="block text-gray-700 text-sm font-bold mb-1" for="front">Front side</label>
                <textarea
                        class="appearance-none outline-none focus:outline-none resize-y border-2 rounded-lg py-2 px-3 w-full text-gray-700 leading-tight focus:border-purple-400"
                        id="front" placeholder="Front..." rows="4" v-model.trim.lazy="$v.front.$model" :class="{ 'border-red-400': $v.front.$error }"></textarea>
                <p class="text-sm text-red-400" v-if="$v.front.$error && !$v.front.required">Card should have something on the front side.</p>
                <p class="text-sm text-red-400" v-if="!$v.front.maxLength">Card side should be 250 characters maximum.</p>
            </div>
            <div class="p-4 pt-6">
                <label class="block text-gray-700 text-sm font-bold mb-1" for="rear">Rear side</label>
                <textarea
                        class="appearance-none outline-none focus:outline-none resize-y border-2 rounded-lg py-2 px-3 w-full text-gray-700 leading-tight focus:border-purple-400"
                        id="rear" placeholder="Rear..." rows="4" v-model.trim.lazy="$v.rear.$model" :class="{ 'border-red-400': $v.rear.$error }"></textarea>
                <p class="text-sm text-red-400" v-if="$v.rear.$error && !$v.rear.required">Rear side should be in place too.</p>
                <p class="text-sm text-red-400" v-if="!$v.rear.maxLength">Card side should be 250 characters maximum.</p>
            </div>
            <div class="flex justify-end p-4 content-center">
                <p class="mr-4 cursor-pointer py-2 text-gray-600 text-sm hover:text-red-500" title="Cancel"
                   @click="GoBack">Cancel</p>
                <button class="border rounded-lg py-2 px-6 text-gray-700 text-sm font-bold hover:text-purple-600 hover:border-purple-600"
                        title="Create">Save
                </button>
            </div>
        </form>
    </div>
</template>

<script>
    import {required, maxLength} from 'vuelidate/lib/validators'
    export default {
        name: "AddFlashcard",
        data() {
            return {
                front: "",
                rear: ""
            }
        },
        methods: {
            AddFlashcard() {
                this.$v.$touch();
                if (this.$v.$invalid) {
                    return
                }
                this.$store.dispatch('CREATE_CARD', {
                    deck_id: this.$route.params.deck_id,
                    front: this.front,
                    rear: this.rear
                })
            },
            GoBack() {
                this.$router.back()
            }
        },
        validations: {
            front: {required, maxLength: maxLength(250)},
            rear: {required, maxLength: maxLength(250)}
        }
    }
</script>

<style></style>