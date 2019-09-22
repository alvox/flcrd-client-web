const THEME_KEY = 'theme';
const THEME_LIGHT = 'theme-light';
const THEME_DARK = 'theme-dark';

const SettingsService = {
    getTheme() {
        let storedTheme = localStorage.getItem(THEME_KEY);
        if (storedTheme) {
            return storedTheme
        }
        localStorage.setItem(THEME_KEY, THEME_LIGHT);
        return THEME_LIGHT;
    },
    switchTheme() {
        let storedTheme = localStorage.getItem(THEME_KEY);
        if (storedTheme) {
            let newTheme = storedTheme === THEME_LIGHT ? THEME_DARK : THEME_LIGHT;
            localStorage.setItem(THEME_KEY, newTheme);
            return newTheme;
        }
        localStorage.setItem(THEME_KEY, THEME_DARK);
        return THEME_DARK;
    },
};

export {SettingsService}