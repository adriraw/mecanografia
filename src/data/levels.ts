import type { Unit } from '../types/game'

export const UNITS: Unit[] = [
  {
    id: 'u1',
    title: 'Fila Central',
    description: 'Las teclas más importantes: asdf jklñ',
    color: '#58cc02',
    lessons: [
      {
        id: 'u1l1',
        title: 'Vocales',
        description: 'Comienza con las vocales: a e i o u',
        keys: ['a', 'e', 'i', 'o', 'u'],
        texts: [
          'a e i o u a e i o u',
          'a i a i o u e a o u',
          'u o i e a u o i e a',
          'aeiou uoiea aeiou',
          'ai eo ua oi eu ao',
        ],
        minWpmForThreeStars: 20,
      },
      {
        id: 'u1l2',
        title: 'Fila asdf',
        description: 'La mano izquierda en su posición',
        keys: ['a', 's', 'd', 'f'],
        texts: [
          'a s d f f d s a',
          'as df sa fd as df',
          'asd fds sda fda',
          'adas fads sfad dafs',
          'dad fad sad ads fas',
        ],
        minWpmForThreeStars: 25,
      },
      {
        id: 'u1l3',
        title: 'Fila jklñ',
        description: 'La mano derecha en su posición',
        keys: ['j', 'k', 'l', 'ñ'],
        texts: [
          'j k l ñ ñ l k j',
          'jk lñ kj ñl jk lñ',
          'jkl ñlk lkj ñkj',
          'jaja kilo lelo ñoño',
          'jalla llano ñoño kilo',
        ],
        minWpmForThreeStars: 25,
      },
      {
        id: 'u1l4',
        title: 'Fila Central Completa',
        description: 'Ambas manos: asdf jklñ',
        keys: ['a', 's', 'd', 'f', 'j', 'k', 'l', 'ñ'],
        texts: [
          'asd jkl sdf klñ',
          'fad jak sal dal fal',
          'alla kilo saja deja faja',
          'flash skill salsa dalla fajal',
          'alaska dallas jolla salsa',
        ],
        minWpmForThreeStars: 30,
      },
    ],
  },
  {
    id: 'u2',
    title: 'Fila Superior',
    description: 'Añade qwerty yuiop a tu repertorio',
    color: '#1cb0f6',
    lessons: [
      {
        id: 'u2l1',
        title: 'q w e r t',
        description: 'La parte izquierda de la fila superior',
        keys: ['q', 'w', 'e', 'r', 't'],
        texts: [
          'q w e r t t r e w q',
          'qw er tw re qr wt',
          'que tres tren reto',
          'queso traje taller rete',
          'trabajo requete treinta',
        ],
        minWpmForThreeStars: 25,
      },
      {
        id: 'u2l2',
        title: 'y u i o p',
        description: 'La parte derecha de la fila superior',
        keys: ['y', 'u', 'i', 'o', 'p'],
        texts: [
          'y u i o p p o i u y',
          'yu io py up oi yu',
          'piso tipo puro upio',
          'pollo yuyo pito tipo',
          'punto polio yoyo pinto',
        ],
        minWpmForThreeStars: 25,
      },
      {
        id: 'u2l3',
        title: 'Filas Superior + Central',
        description: 'Combina las dos primeras filas',
        keys: ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 'a', 's', 'd', 'f', 'j', 'k', 'l', 'ñ'],
        texts: [
          'tipo sale pure fiel',
          'duro piso aire todo',
          'perro gato loro pato',
          'salud fuerte tarea quiso',
          'trabajo feliz pasion reino',
        ],
        minWpmForThreeStars: 30,
      },
    ],
  },
  {
    id: 'u3',
    title: 'Fila Inferior',
    description: 'Completa el teclado con zxcvb nm',
    color: '#ff9600',
    lessons: [
      {
        id: 'u3l1',
        title: 'z x c v b',
        description: 'La parte izquierda de la fila inferior',
        keys: ['z', 'x', 'c', 'v', 'b'],
        texts: [
          'z x c v b b v c x z',
          'zx cv xc bv zb xv',
          'vez clave boca vaca',
          'brazo boxeo vaca clave',
          'calvo bravo voz cubano',
        ],
        minWpmForThreeStars: 25,
      },
      {
        id: 'u3l2',
        title: 'n m y más',
        description: 'Termina con n m y el resto',
        keys: ['n', 'm', 'h', 'g'],
        texts: [
          'n m h g g h m n',
          'nm gh mh gn nm gh',
          'manga hambre nombre',
          'mundo grande nombre',
          'hermano manga nombre',
        ],
        minWpmForThreeStars: 25,
      },
      {
        id: 'u3l3',
        title: 'Teclado Completo',
        description: 'Las tres filas juntas',
        keys: [],
        texts: [
          'casa pero bien todo',
          'mundo gente forma base',
          'vez primero algo vida',
          'parte mismo tiempo nuevo',
          'lugar forma parte bien',
        ],
        minWpmForThreeStars: 35,
      },
    ],
  },
  {
    id: 'u4',
    title: 'Palabras Comunes',
    description: 'Las 200 palabras más usadas en español',
    color: '#ff4b4b',
    lessons: [
      {
        id: 'u4l1',
        title: 'Las más básicas',
        description: 'el la de que en y a',
        keys: [],
        texts: [
          'el la de que en y a un',
          'el perro y la gata son buenos',
          'de todas las cosas la vida es buena',
          'que bonito es el dia de hoy',
          'en el mundo hay mucha gente buena',
        ],
        minWpmForThreeStars: 35,
      },
      {
        id: 'u4l2',
        title: 'Verbos frecuentes',
        description: 'ser estar tener hacer ir',
        keys: [],
        texts: [
          'ser o no ser esa es la pregunta',
          'tengo que hacer las cosas bien',
          'voy a estar aqui todo el tiempo',
          'hacemos lo que podemos cada dia',
          'puedo ser lo que quiero si trabajo',
        ],
        minWpmForThreeStars: 38,
      },
      {
        id: 'u4l3',
        title: 'Vocabulario general',
        description: '100 palabras de uso diario',
        keys: [],
        texts: [
          'agua casa mano vida hombre mujer',
          'tiempo mundo parte cosa gente forma',
          'dia noche ciudad campo trabajo juego',
          'amor paz guerra libro musica arte',
          'familia amigo ciudad campo viaje luz',
        ],
        minWpmForThreeStars: 40,
      },
    ],
  },
  {
    id: 'u5',
    title: 'Frases',
    description: 'Escribe frases completas en español',
    color: '#ce82ff',
    lessons: [
      {
        id: 'u5l1',
        title: 'Frases cortas',
        description: 'Oraciones simples del día a día',
        keys: [],
        texts: [
          'Hola como estas hoy',
          'Buenos dias que tal',
          'Me llamo Adrian y soy programador',
          'El sol brilla en el cielo azul',
          'Hoy es un dia perfecto para aprender',
        ],
        minWpmForThreeStars: 40,
      },
      {
        id: 'u5l2',
        title: 'Frases medianas',
        description: 'Oraciones más elaboradas',
        keys: [],
        texts: [
          'La practica diaria es la clave del exito en la mecanografia',
          'Escribir rapido requiere paciencia y mucho entrenamiento constante',
          'El mejor momento para comenzar a aprender es ahora mismo',
          'Con dedicacion y esfuerzo cualquier meta es posible alcanzar',
          'La tecnologia nos ayuda a comunicarnos mejor con el mundo entero',
        ],
        minWpmForThreeStars: 42,
      },
    ],
  },
  {
    id: 'u6',
    title: 'Velocidad',
    description: 'Textos completos para máxima velocidad',
    color: '#ffc800',
    lessons: [
      {
        id: 'u6l1',
        title: 'Texto continuo',
        description: 'Párrafos cortos para ganar fluidez',
        keys: [],
        texts: [
          'El aprendizaje de la mecanografia es una habilidad fundamental en el mundo moderno donde la comunicacion digital domina nuestra vida cotidiana',
          'Cada tecla que pulsas con precision te acerca mas a convertirte en un experto en la escritura rapida y eficiente con el teclado',
          'La constancia en la practica diaria es lo que separa a los buenos mecanografos de los excelentes en esta disciplina tan util',
        ],
        minWpmForThreeStars: 45,
      },
      {
        id: 'u6l2',
        title: 'Velocidad máxima',
        description: 'El reto definitivo de velocidad',
        keys: [],
        texts: [
          'En un mundo cada vez mas digitalizado la capacidad de escribir con rapidez y precision en el teclado se ha convertido en una ventaja competitiva invaluable tanto en el ambito profesional como en el personal',
          'La mecanografia no es solo una habilidad tecnica sino tambien una forma de liberar tu mente para que puedas concentrarte en las ideas que quieres expresar sin que los dedos sean el cuello de botella de tu creatividad',
        ],
        minWpmForThreeStars: 55,
      },
    ],
  },
]

export const ALL_LESSON_IDS = UNITS.flatMap(u => u.lessons.map(l => l.id))

export function getLessonById(id: string) {
  for (const unit of UNITS) {
    const lesson = unit.lessons.find(l => l.id === id)
    if (lesson) return { lesson, unit }
  }
  return null
}

export function getNextLessonId(currentId: string): string | null {
  const allIds = ALL_LESSON_IDS
  const idx = allIds.indexOf(currentId)
  return idx >= 0 && idx < allIds.length - 1 ? allIds[idx + 1] : null
}
