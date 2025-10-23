import React, { useState, useEffect } from 'react';

// Define la interfaz de propiedades para el componente
interface CarruselProps {
    imageUrls: string[];
    intervaloTiempo?: number;
}

const CarruselCircularTailwind: React.FC<CarruselProps> = ({ 
    imageUrls, 
    intervaloTiempo = 3000 
}) => {
    
    // --- CONFIGURACIÓN CLAVE ---
    // 1. Número de elementos: Se define por el número de URLs
    const NUM_ELEMENTOS = imageUrls.length; 
    
    // Verificación de seguridad: si no hay elementos, no renderizar
    if (NUM_ELEMENTOS === 0) {
        return null;
    }

    const ANGULO_GIRO = 360 / NUM_ELEMENTOS; 

    // Estado para controlar el ángulo total de rotación en el eje Y.
    const [rotationAngle, setRotationAngle] = useState(0);

    // Los elementos son simplemente un array de URLs
    const elementos = imageUrls;

    // Función para girar el carrusel un paso
    const moverCarrusel = () => {
        setRotationAngle(prevAngle => prevAngle - ANGULO_GIRO);
    };

    // Efecto para el giro automático
    useEffect(() => {
        const intervalo = setInterval(moverCarrusel, intervaloTiempo);
        return () => clearInterval(intervalo);
    }, [intervaloTiempo, ANGULO_GIRO]); // Dependencias actualizadas

    return (
        // CONTENEDOR EXTERNO: Aplica la perspectiva usando la variable CSS.
        <div 
            className="w-full h-[300px] sm:h-[300px] flex items-center justify-center bg-transparent overflow-hidden"
            style={{ perspective: 'var(--carrusel-perspective)' }} 
        >
            
            {/* ANILLO DE GIRO: Gira todo el círculo */}
            <div 
                className="w-48 h-30 sm:w-80 sm:h-40 relative"
                style={{ 
                    transformStyle: 'preserve-3d', 
                    transform: `rotateY(${rotationAngle}deg)`,
                    transition: 'transform 1s ease-in-out', 
                }}
            >
                
                {/* ELEMENTOS: Ahora son divs con imágenes de fondo */}
                {elementos.map((url, index) => {
                    // Calcula el ángulo de posicionamiento inicial
                    const elementAngle = index * ANGULO_GIRO;
                    
                    // Comprobamos si el elemento actual está al frente
                    const isFrontElement = Math.abs(rotationAngle + elementAngle) % 360 < (ANGULO_GIRO / 2) || 
                                           Math.abs(rotationAngle + elementAngle) % 360 > (360 - (ANGULO_GIRO / 2)) || 
                                           index === (Math.round(-rotationAngle / ANGULO_GIRO) % NUM_ELEMENTOS + NUM_ELEMENTOS) % NUM_ELEMENTOS;

                    return (
                        <div
                            key={index} // Usamos el índice como clave si no hay IDs únicos
                            className={`
                                absolute top-0 left-0 w-full h-full 
                                flex items-center justify-center 
                                text-white text-xl font-bold 
                                rounded-lg shadow-xl shadow-gray-900/50
                                transition-opacity duration-300 
                                bg-cover bg-center bg-no-repeat // <--- CLASES CLAVE PARA LA IMAGEN
                                ${isFrontElement ? 'opacity-100' : 'opacity-80'}
                            `}
                            style={{
                                backfaceVisibility: 'hidden', 
                                // Asignamos la URL como fondo
                                backgroundImage: `url('${url}')`,
                                // Posiciona en el círculo usando la variable CSS para el radio (translateZ)
                                transform: `
                                    rotateY(${elementAngle}deg) 
                                    translateZ(var(--carrusel-radio-z))
                                `,
                            }}
                        >
                            {/* Puedes quitar el contenido si solo quieres la imagen */}
                            {/* Opcional: <p className="bg-black/50 p-1 rounded">Elemento {index + 1}</p> */}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default CarruselCircularTailwind;