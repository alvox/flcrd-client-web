const {colors} = require('tailwindcss/defaultTheme');

module.exports = {

    theme: {
        extend: {},
        colors: {

            background: {
                'primary': 'var(--bg-background-primary)',
                'secondary': 'var(--bg-background-secondary)',
                'ternary': 'var(--bg-background-ternary)',
                'hover': 'var(--bg-background-hover)',
                'green-button': 'var(--gb-background-green-button)',
                'green-button-hover': 'var(--gb-background-green-button-hover)',
                'red-button': 'var(--gb-background-red-button)',
                'red-button-hover': 'var(--gb-background-red-button-hover)',
            },

            border: {
                'primary': 'var(--border-color-primary)',
            },

            copy: {
                'primary': 'var(--text-copy-primary)',
                'secondary': 'var(--text-copy-secondary)',
                'hover': 'var(--text-copy-hover)',
                'green': 'var(--text-copy-green)',
                'red': 'var(--text-copy-red)',
                'green-btn': 'var(--text-copy-green-btn)',
                'red-btn': 'var(--text-copy-red-btn)',
            },

            black: colors.black,
            white: colors.white,
            gray: colors.gray,
            green: colors.green,
            purple: colors.purple,
            red: colors.red,
        }
    },


    variants: {},
    plugins: []
};
