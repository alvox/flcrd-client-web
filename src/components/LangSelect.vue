<template>
    <DropdownLink ref="dropdown">
        <span slot="link"
              class="appearance-none flex items-center inline-block text-lg ml-4 text-copy-secondary">
            <span>{{ $t('lang_emoji') }}</span>
            <svg class="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
            </svg>
        </span>
        <div slot="dropdown" class="shadow rounded border border-border-primary overflow-hidden text-lg">
            <a href="#"
               class="no-underline text-center py-1 block border-b border-border-primary bg-background-secondary hover:bg-background-ternary"
               @click.prevent="selectLang('en')">🇬🇧</a>
            <a href="#"
               class="no-underline text-center py-1 block bg-background-secondary hover:bg-background-ternary"
               @click.prevent="selectLang('ru')">🇷🇺</a>
        </div>
    </DropdownLink>
</template>

<script>
import DropdownLink from "@/components/DropdownLink"

export default {
    components: {DropdownLink},
    name: "LangSelect",
    methods: {
        selectLang(lang) {
            this.$store.dispatch('SELECT_LANG', {lang: lang});
            this.$refs.dropdown.closeDropdown()
        },
    }
}
</script>
