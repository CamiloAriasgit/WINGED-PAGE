// tailwind.config.mjs

/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme';

export default {
    content: [
        './src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}',
    ],
    
    theme: {
        extend: {
            fontFamily: {
                // 🚨 MODIFICACIÓN CLAVE: Cambia 'Inter' por 'Bangers'
                // NOTA: Como Bangers es una fuente display/handwriting, es común
                // asignarla a una utilidad personalizada (ej. 'display'),
                // pero la pondremos en 'sans' para aplicarla globalmente por ahora.
                sans: ['Bangers', ...defaultTheme.fontFamily.sans],
            },
        },
    },
    
    safelist: [
        'to-[#003E91]', 
        'from-[#003E91]',
    ],
    
    plugins: [],
}