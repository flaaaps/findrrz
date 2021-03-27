const colors = require("tailwindcss/colors")

module.exports = {
    purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                gray: colors.gray,
                primary: "#2360D6",
                secondary: "#E38826",
                foreground: "#F2F2F2",
                background: {
                    100: "#BEBEBF",
                    200: "#8C8C8C",
                    400: "#424245",
                    600: "#27272A",
                },
                font: "#BBBBBB",
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
}
