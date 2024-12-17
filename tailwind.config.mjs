/** @type {import('tailwindcss').Config} */
export default {
    content: ["./src/pages/**/*.{js,ts,jsx,tsx,mdx}", "./src/components/**/*.{js,ts,jsx,tsx,mdx}", "./src/app/**/*.{js,ts,jsx,tsx,mdx}"],
    theme: {
        extend: {
            colors: {
                // background: "var(--light_color)",
                // foreground: "var(--dark_color)",
                light_background: "var(--light_background)",
                white_background: "var(--white_background)",
                light_font: "var(--light_font)",
                white_font: "var(--white_font)",
                grey_font: "var(--grey_font)",
                dark_background: "var(--dark_background)",
                dark_font: "var(--dark_font)",
            },
        },
    },
    plugins: [],
    darkMode: "class",
};
