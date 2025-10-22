// tailwind.config.mjs
/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme'; // 1. Importa la configuración base

export default {
  // 1. Dónde buscar clases de Tailwind
  content: [
    './src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}',
  ],
  
  theme: {
    extend: {
      // 2. Definición de la Fuente
      fontFamily: {
        // Usa 'Inter' como la primera opción en la familia de fuentes 'sans'
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
      },
      
      // 3. Definición de colores
      colors: {
        // Su color de acento principal (Azul Profundo #003E91)
        'accent-blue': '#003E91',
        
        // Color de acento secundario (Opcional, si mantiene el morado para efectos)
        'accent-violet': '#7c3aed',
        
        // Su color de texto claro (Ghost White)
        'light-text': '#f8f8ff', 
        
        // Verde WhatsApp (Directo, para el CTA flotante)
        'whatsapp-green': '#25D366', 
        
        // Dejé los otros colores por si acaso, pero recomiendo usar solo 'accent-blue'
      },
    },
  },
  
  // 4. (Opcional) Safelist
  // Es útil mantenerlo si usa el azul profundo en gradientes complejos
  safelist: [
    'to-[#003E91]', 
    'from-[#003E91]',
  ],
  
  plugins: [],
}