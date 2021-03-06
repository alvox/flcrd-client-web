const THEME_KEY = 'theme'
const THEME_LIGHT = 'theme-light'
const THEME_DARK = 'theme-dark'
const LANG_KEY = 'lang'

const DECK_ID = 'deck_id'
const IS_DECK_PUBLIC = 'is_deck_public'

const SettingsService = {
    getTheme() {
        let storedTheme = localStorage.getItem(THEME_KEY)
        if (storedTheme) {
            return storedTheme
        }
        localStorage.setItem(THEME_KEY, THEME_LIGHT)
        return THEME_LIGHT
    },
    switchTheme() {
        let storedTheme = localStorage.getItem(THEME_KEY)
        if (storedTheme) {
            let newTheme = storedTheme === THEME_LIGHT ? THEME_DARK : THEME_LIGHT
            localStorage.setItem(THEME_KEY, newTheme)
            return newTheme
        }
        localStorage.setItem(THEME_KEY, THEME_DARK)
        return THEME_DARK
    },
    getLang() {
        let lang = localStorage.getItem(LANG_KEY);
        if (lang) {
            return lang
        }
        lang = (navigator.languages && navigator.languages.length
        ? navigator.languages[0]
            : navigator.language || 'en').substr(0, 2)
        let allowed = ['en', 'ru']
        if (allowed.indexOf(lang) > -1) {
            localStorage.setItem(LANG_KEY, lang)
            return lang
        }
        localStorage.setItem(LANG_KEY, 'en')
        return 'en'
    },
    setLang(lang) {
        localStorage.setItem(LANG_KEY, lang)
    },
    saveDeckInfo(deckId, isPublic) {
        localStorage.setItem(DECK_ID, deckId)
        localStorage.setItem(IS_DECK_PUBLIC, isPublic)
    },
    getDeckInfo() {
        let publicSetting = localStorage.getItem(IS_DECK_PUBLIC)
        let isPublic = (publicSetting === "true")
        return {
            deckId: localStorage.getItem(DECK_ID),
            isPublic: isPublic
        }
    },
    clearDeckInfo() {
        localStorage.removeItem(IS_DECK_PUBLIC)
        localStorage.removeItem(DECK_ID)
    }
};

export {SettingsService}