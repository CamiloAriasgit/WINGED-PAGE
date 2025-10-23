import React, { useState, useEffect } from 'react';

// --- CONFIGURACIÓN CLAVE ---
const NUM_ELEMENTOS = 5; 
const INTERVALO_TIEMPO = 3000; // 3 segundos
const ANGULO_GIRO = 360 / NUM_ELEMENTOS; 

const CarruselCircularTailwind: React.FC = () => {
  // Estado para controlar el ángulo total de rotación en el eje Y.
  const [rotationAngle, setRotationAngle] = useState(0);

  // Inicializa los elementos (Divs Azules)
  const elementos = Array.from({ length: NUM_ELEMENTOS }, (_, i) => ({
    id: i,
    contenido: `Elemento ${i + 1}`,
  }));

  // Función para girar el carrusel un paso
  const moverCarrusel = () => {
    setRotationAngle(prevAngle => prevAngle - ANGULO_GIRO);
  };

  // Efecto para el giro automático
  useEffect(() => {
    const intervalo = setInterval(moverCarrusel, INTERVALO_TIEMPO);
    return () => clearInterval(intervalo);
  }, []);

  return (
    // CONTENEDOR EXTERNO: Aplica la perspectiva usando la variable CSS.
    <div 
      className="w-full h-[300px] sm:h-[300px] flex items-center justify-center bg-transparent overflow-hidden"
      // Usa la variable CSS para el valor de perspectiva
      style={{ perspective: 'var(--carrusel-perspective)' }} 
    >
      
      {/* ANILLO DE GIRO: Gira todo el círculo */}
      <div 
        // Define el tamaño del contenedor que gira
        className="w-48 h-30 sm:w-80 sm:h-40 relative"
        style={{ 
          transformStyle: 'preserve-3d', // Habilita 3D en los hijos
          transform: `rotateY(${rotationAngle}deg)`,
          transition: 'transform 1s ease-in-out', // Transición suave
        }}
      >
        
        {/* ELEMENTOS: Los divs azules individuales */}
        {elementos.map((elemento, index) => {
          // Calcula el ángulo de posicionamiento inicial
          const elementAngle = index * ANGULO_GIRO;

          return (
            <div
              key={elemento.id}
              className={`
                absolute top-0 left-0 w-full h-full 
                flex items-center justify-center text-white 
                text-xl rounded-lg shadow-2xl 
                transition-opacity duration-300 bg-neutral-900
                ${index === 0 ? 'opacity-100' : 'opacity-80'}
              `}
              style={{
                backfaceVisibility: 'hidden', 
                // Posiciona en el círculo usando la variable CSS para el radio (translateZ)
                transform: `
                    rotateY(${elementAngle}deg) 
                    translateZ(var(--carrusel-radio-z))
                `,
              }}
            >
              {elemento.contenido}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CarruselCircularTailwind;