const {colors} = require('tailwindcss/defaultTheme');

module.exports = {

    theme: {
        extend: {},
        colors: {

            background: {
                'primary': 'var(--bg-background-primary)',
                'secondary': 'var(--bg-background-secondary)',
                'ternary': 'var(--bg-background-ternary)',
            },

            border: {
                'primary': 'var(--border-color-primary)',
            },

            copy: {
                'primary': 'var(--text-copy-primary)',
                'secondary': 'var(--text-copy-secondary)',
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
