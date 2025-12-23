/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'luxury-black': '#050505',
                'charcoal': '#121212',
                'cream': '#F8F5F2',
                'gold-accent': '#C5A021', // Slightly more Sophisticated Gold
                'gold-light': '#E5C05E',
                'rich-brown': '#2C1810',
                'muted-gray': '#7A7A7A',
            },
            fontFamily: {
                serif: ['"Playfair Display"', 'serif'],
                sans: ['"Inter"', 'sans-serif'],
            },
            letterSpacing: {
                'luxury': '0.2em',
                'super-luxury': '0.4em',
            },
            animation: {
                'fade-in-up': 'fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
                'float': 'float 6s ease-in-out infinite',
                'shimmer': 'shimmer 2s linear infinite',
            },
            keyframes: {
                fadeInUp: {
                    '0%': { opacity: '0', transform: 'translateY(30px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-15px)' },
                },
                shimmer: {
                    '100%': { transform: 'translateX(100%)' },
                }
            },
            boxShadow: {
                'luxury': '0 10px 40px -10px rgba(0, 0, 0, 0.5)',
                'gold-glow': '0 0 20px rgba(197, 160, 33, 0.2)',
            }
        },
    },
    plugins: [],
}
