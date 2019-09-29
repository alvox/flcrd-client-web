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
                'p-btn-hover': 'var(--bg-background-p-btn-hover)',
            },

            border: {
                'primary': 'var(--border-color-primary)',
                'p-btn': 'var(--border-p-btn)',
                's-btn': 'var(--border-s-btn)',
                's-btn-hover': 'var(--border-s-btn-hover)',
            },

            copy: {
                'primary': 'var(--text-copy-primary)',
                'secondary': 'var(--text-copy-secondary)',
                'hover': 'var(--text-copy-hover)',
                'green': 'var(--text-copy-green)',
                'red': 'var(--text-copy-red)',
                'green-btn': 'var(--text-copy-green-btn)',
                'red-btn': 'var(--text-copy-red-btn)',
                'p-btn-hover': 'var(--text-copy-p-btn-hover)',
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
