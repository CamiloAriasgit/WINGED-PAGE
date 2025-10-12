// tailwind.config.mjs
/** @type {import('tailwindcss').Config} */
export default {
  // 1. Dónde buscar clases de Tailwind
  content: [
    './src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}',
  ],
  
  theme: {
    extend: {
      // 2. Definición de colores personalizados
      colors: {
        // Tu color primario
        'primary-color': '#06b6d4', 
        
        // Tu color secundario (el morado)
        'secondary-color': '#7c3aed',
        
        // Un color de texto claro que usas
        'light-text': '#f8f8ff', 
        
        // Si usas el verde lima de tu primer ejemplo:
        'lime-dark': '#1a2e05', // bg-lime-950
        'lime-base': '#a7f3d0', // text-lime-300 (Aproximado)
      },
    },
  },
  
  // 3. Puedes dejar el safelist por si acaso, pero ya no será necesario
  //    para los colores definidos arriba.
  // safelist: [
  //   'to-[#7c3aed]', 
  //   'to-[#06b6d4]', 
  // ],
  
  plugins: [],
}