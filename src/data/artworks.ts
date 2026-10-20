import type { Artwork } from '../types/artwork';

export const ARTIST_INFO = {
  name: 'Tomás Odión',
  tagline: 'Expresionismo Figurativo, Simbolismo & Empastes Táctiles',
  location: 'Barcelona, España',
  bio: 'Tomás Odión es un pintor plástico contemporáneo cuya obra se caracteriza por una potente carga cromática, trazos matéricos directos y un lenguaje visual expresionista y simbólico. En sus composiciones conviven figuras humanas entrelazadas con la naturaleza, visiones alegóricas, naturalezas vivas y fauna totémica donde el empaste denso y la vibración del color son protagonistas absolutos.',
  statement: '"Pintar es dialogar con la materia y la emoción sin filtros. Cada golpe de espátula y cada mancha buscan revelar la fuerza visceral de lo vivo."',
  exhibitions: [
    { year: 2025, title: 'Fuerza & Materia', venue: 'Galería de Arte Contemporáneo (Individual)' },
    { year: 2024, title: 'Naturalezas Vivas & Expresión', venue: 'Salón de Bellas Artes' },
    { year: 2023, title: 'Figuras en el Espacio', venue: 'Exposición Colectiva de Pintura' },
    { year: 2022, title: 'Color y Trazos de Autor', venue: 'Colección Privada' },
  ],
  awards: [
    'Reconocimiento a la Trayectoria Plástica',
    'Premio de Pintura Expresionista',
    'Seleccionado en Certámenes Nacionales de Bellas Artes'
  ],
  stats: {
    worksInCollections: '80+',
    countriesCollected: '12',
    yearsActive: '20+'
  },
  portraitImage: '/artista/artista-retrato.png',
  studioImage: '/artista/artista-escultura.jpg',
  whatsappNumber: '+34600112233',
  contactEmail: 'adquisiciones@tomasodion-arte.com'
};

export const INITIAL_ARTWORKS: Artwork[] = [
  {
    id: 'art-001',
    slug: 'gallinazos',
    title: 'Gallinazos',
    artist: 'Tomás Odión',
    year: 2025,
    category: 'Figurativo',
    price: 3200,
    status: 'available',
    dimensions: {
      height: 70,
      width: 100,
      depth: 3.5,
      unit: 'cm'
    },
    medium: 'Acrílico y técnica mixta con empastes densos y espatulado vigoroso',
    support: 'Lienzo de algodón sobre bastidor de madera maciza',
    framed: true,
    frameDetails: 'Marco flotante en madera maciza lacada en negro satinado',
    certificateIncluded: true,
    edition: 'Obra original única (1 de 1)',
    primaryImage: '/obras/OBRA-001-gallinazos.jpg',
    galleryImages: [
      '/obras/OBRA-001-gallinazos.jpg'
    ],
    description: 'Composición expresionista de gran vigor plástico y cromático. Dos aves míticas dominan un paisaje telúrico cargado de ocres, rojos, azules eléctricos y relieves matéricos ejecutados con espátula.',
    inspirationStory: 'Inspirada en la fauna totémica, el carácter agreste de la tierra y la tensión instintiva de la supervivencia en el paisaje natural.',
    shippingInfo: 'Envío asegurado en contenedor rígido de madera a medida con seguro a todo riesgo.',
    featured: true,
    colorTone: '#991B1B'
  },
  {
    id: 'art-002',
    slug: 'rosas-amarillas',
    title: 'Rosas Amarillas',
    artist: 'Tomás Odión',
    year: 2025,
    category: 'Figurativo',
    price: 1850,
    status: 'available',
    dimensions: {
      height: 70,
      width: 50,
      depth: 3,
      unit: 'cm'
    },
    medium: 'Óleo y empaste con espátula sobre fondo azul cobalto',
    support: 'Soporte rígido de tabla entelada tratada artesanalmente',
    framed: true,
    frameDetails: 'Marco de madera natural encerada artesanal',
    certificateIncluded: true,
    edition: 'Obra original única (1 de 1)',
    primaryImage: '/obras/OBRA-002-rosas-amarillas.jpg',
    galleryImages: [
      '/obras/OBRA-002-rosas-amarillas.jpg'
    ],
    description: 'Naturaleza viva resuelta con una potente explosión de amarillos solares, verdes esmeralda y toques rojos sobre una atmósfera azul cerúleo cargada de movimiento.',
    inspirationStory: 'Homenaje a la fuerza indomable de la flora silvestre y al contraste luminoso entre el azul profundo y el amarillo cadmio.',
    shippingInfo: 'Envío asegurado en contenedor rígido de madera a medida con seguro a todo riesgo.',
    featured: true,
    colorTone: '#F59E0B'
  },
  {
    id: 'art-003',
    slug: 'abrazo-en-la-arboleda',
    title: 'Abrazo en la Arboleda',
    artist: 'Tomás Odión',
    year: 2025,
    category: 'Figurativo',
    price: 3600,
    status: 'available',
    dimensions: {
      height: 100,
      width: 70,
      depth: 3.5,
      unit: 'cm'
    },
    medium: 'Técnica mixta, pigmentos acrílicos y texturas sobre lienzo',
    support: 'Lienzo montado sobre bastidor reforzado de 3.5 cm',
    framed: false,
    frameDetails: 'Cantos pintados al tono, listo para colgar o para enmarcado a medida',
    certificateIncluded: true,
    edition: 'Obra original única (1 de 1)',
    primaryImage: '/obras/OBRA-003-abrazo-en-la-arboleda.jpg',
    galleryImages: [
      '/obras/OBRA-003-abrazo-en-la-arboleda.jpg'
    ],
    description: 'Alegoría de dos figuras entrelazadas sobre las ramas de un árbol frondoso. La vegetación y las figuras humanas se fusionan en un abrazo que evoca la unidad indisoluble entre el ser y la naturaleza.',
    inspirationStory: 'Exploración de los mitos clásicos de metamorfosis y la protección mutua en el seno del bosque primigenio.',
    shippingInfo: 'Envío asegurado en contenedor rígido de madera a medida con seguro a todo riesgo.',
    featured: true,
    colorTone: '#15803D'
  },
  {
    id: 'art-004',
    slug: 'tres-figuras-en-caliz',
    title: 'Las Tres Figuras en el Cáliz Azul',
    artist: 'Tomás Odión',
    year: 2025,
    category: 'Figurativo',
    price: 2400,
    status: 'available',
    dimensions: {
      height: 80,
      width: 60,
      depth: 3,
      unit: 'cm'
    },
    medium: 'Óleo y caseína con veladuras en azul cerúleo y blanco titanio',
    support: 'Tabla tratada con imprimación artesanal al gesso',
    framed: true,
    frameDetails: 'Marco flotante de haya clara encerada',
    certificateIncluded: true,
    edition: 'Obra original única (1 de 1)',
    primaryImage: '/obras/OBRA-004-tres-figuras-en-caliz.jpg',
    galleryImages: [
      '/obras/OBRA-004-tres-figuras-en-caliz.jpg'
    ],
    description: 'Composición onírica de inspiración neoclásica y simbolista. Tres figuras femeninas desnudas y semivestidas reposan dentro de una taza o cáliz monumental en una atmósfera de quietud intimista.',
    inspirationStory: 'Inspirada en el diálogo entre el sosiego ritual y los recipientes de la memoria.',
    shippingInfo: 'Envío asegurado en contenedor rígido de madera a medida con seguro a todo riesgo.',
    featured: false,
    colorTone: '#3B82F6'
  },
  {
    id: 'art-005',
    slug: 'lilith-la-bella',
    title: 'Lilith, la Bella',
    artist: 'Tomás Odión',
    year: 2025,
    category: 'Figurativo',
    price: 2900,
    status: 'available',
    dimensions: {
      height: 100,
      width: 70,
      depth: 3.5,
      unit: 'cm'
    },
    medium: 'Acrílico y técnica mixta con pigmentos densos sobre lienzo',
    support: 'Lienzo de lino sobre bastidor biselado',
    framed: true,
    frameDetails: 'Marco flotante en roble teñido en nogal',
    certificateIncluded: true,
    edition: 'Obra original única (1 de 1)',
    primaryImage: '/obras/OBRA-005-lilith-la-bella.jpg',
    galleryImages: [
      '/obras/OBRA-005-lilith-la-bella.jpg'
    ],
    description: 'Retrato arquetípico de una figura femenina enigmática rodeada de follaje exuberante y aves nocturnas, con pinceladas viscerales y contrastes de luz dorada.',
    inspirationStory: 'Reinterpretación del mito de Lilith como fuerza independiente y salvaje en consonancia con la flora.',
    shippingInfo: 'Envío asegurado en contenedor rígido de madera a medida con seguro a todo riesgo.',
    featured: false,
    colorTone: '#B45309'
  },
  {
    id: 'art-006',
    slug: 'la-pescaderia',
    title: 'La Pescadería',
    artist: 'Tomás Odión',
    year: 2025,
    category: 'Figurativo',
    price: 3100,
    status: 'available',
    dimensions: {
      height: 100,
      width: 70,
      depth: 3.5,
      unit: 'cm'
    },
    medium: 'Óleo y caseína con espatulado rápido sobre lienzo',
    support: 'Lienzo tensado en bastidor de pino de 3.5 cm',
    framed: true,
    frameDetails: 'Marco de madera negra envejecida',
    certificateIncluded: true,
    edition: 'Obra original única (1 de 1)',
    primaryImage: '/obras/OBRA-006-la-pescaderia.jpg',
    galleryImages: [
      '/obras/OBRA-006-la-pescaderia.jpg'
    ],
    description: 'Escena costumbrista reinterpretada con fuerza expresionista, donde las formas marinas y los personajes se funden en una vibración cromática de azules, platas y naranjas.',
    inspirationStory: 'Evocación de los mercados matinales portuarios, con su rumor, reflejos húmedos y dinamismo.',
    shippingInfo: 'Envío asegurado en contenedor rígido de madera a medida con seguro a todo riesgo.',
    featured: false,
    colorTone: '#0284C7'
  },
  {
    id: 'art-007',
    slug: 'las-infantas',
    title: 'Las Infantas',
    artist: 'Tomás Odión',
    year: 2025,
    category: 'Figurativo',
    price: 2750,
    status: 'sold',
    dimensions: {
      height: 90,
      width: 60,
      depth: 3,
      unit: 'cm'
    },
    medium: 'Técnica mixta y veladuras de óleo sobre tabla marina',
    support: 'Soporte rígido de contrachapado fenólico marino',
    framed: true,
    frameDetails: 'Marco de galería lacado en blanco roto',
    certificateIncluded: true,
    edition: 'Obra original única (1 de 1)',
    primaryImage: '/obras/OBRA-007-las-infantas.jpg',
    galleryImages: [
      '/obras/OBRA-007-las-infantas.jpg'
    ],
    description: 'Homenaje a la tradición barroca española desde un prisma expresionista contemporáneo, descomponiendo los ropajes cortesanos en campos de color puro.',
    inspirationStory: 'Diálogo con la historia del arte y las miradas infantiles congeladas en el protocolo cortesano.',
    shippingInfo: 'Envío asegurado en contenedor rígido de madera a medida con seguro a todo riesgo.',
    featured: false,
    colorTone: '#6B21A8'
  },
  {
    id: 'art-008',
    slug: 'pequeno-temerario',
    title: 'Pequeño Temerario',
    artist: 'Tomás Odión',
    year: 2025,
    category: 'Paisaje',
    price: 2200,
    status: 'available',
    dimensions: {
      height: 70,
      width: 90,
      depth: 3,
      unit: 'cm'
    },
    medium: 'Acrílico y tierras naturales sobre lienzo',
    support: 'Bastidor de madera maciza',
    framed: true,
    frameDetails: 'Marco de madera de pino natural encerada',
    certificateIncluded: true,
    edition: 'Obra original única (1 de 1)',
    primaryImage: '/obras/OBRA-008-pequeno-temerario.jpg',
    galleryImages: [
      '/obras/OBRA-008-pequeno-temerario.jpg'
    ],
    description: 'Composición paisajística con horizonte dinámico y presencia testimonial de pequeñas figuras en comunión con un entorno abierto y bravío.',
    inspirationStory: 'Inspirada en el arrojo infantil frente a la inmensidad del campo abierto.',
    shippingInfo: 'Envío asegurado en contenedor rígido de madera a medida con seguro a todo riesgo.',
    featured: false,
    colorTone: '#D97706'
  },
  {
    id: 'art-009',
    slug: 'maria-goretti',
    title: 'María Goretti',
    artist: 'Tomás Odión',
    year: 2025,
    category: 'Figurativo',
    price: 2800,
    status: 'available',
    dimensions: {
      height: 100,
      width: 65,
      depth: 3.5,
      unit: 'cm'
    },
    medium: 'Óleo sobre lienzo con técnica de raspado y veladuras',
    support: 'Lino preparado a la creta sobre bastidor',
    framed: true,
    frameDetails: 'Marco clásico moldurado en pan de plata envejecido',
    certificateIncluded: true,
    edition: 'Obra original única (1 de 1)',
    primaryImage: '/obras/OBRA-009-maria-goretti.jpg',
    galleryImages: [
      '/obras/OBRA-009-maria-goretti.jpg'
    ],
    description: 'Iconografía simbólica cargada de recogimiento místico, con tonalidades blancas, marfil y carmines apagados.',
    inspirationStory: 'Estudio sobre la inocencia y la trascendencia espiritual en la pintura sacra contemporánea.',
    shippingInfo: 'Envío asegurado en contenedor rígido de madera a medida con seguro a todo riesgo.',
    featured: false,
    colorTone: '#E2E8F0'
  },
  {
    id: 'art-010',
    slug: 'casa-de-livia',
    title: 'Casa de Livia',
    artist: 'Tomás Odión',
    year: 2025,
    category: 'Figurativo',
    price: 2600,
    status: 'available',
    dimensions: {
      height: 75,
      width: 90,
      depth: 3,
      unit: 'cm'
    },
    medium: 'Fresco sobre tabla con aglutinante orgánico y pigmentos puros',
    support: 'Tabla entelada preparada con estuco de yeso',
    framed: true,
    frameDetails: 'Marco plano de roble natural',
    certificateIncluded: true,
    edition: 'Obra original única (1 de 1)',
    primaryImage: '/obras/OBRA-010-casa-de-livia.jpg',
    galleryImages: [
      '/obras/OBRA-010-casa-de-livia.jpg'
    ],
    description: 'Reminiscencia de los frescos murales romanos de la Villa de Livia, con ramas, hojas y aves que asoman entre muros de ilusión óptica.',
    inspirationStory: 'Inspirada en los jardines subterráneos de la época augustea en Roma.',
    shippingInfo: 'Envío asegurado en contenedor rígido de madera a medida con seguro a todo riesgo.',
    featured: false,
    colorTone: '#166534'
  },
  {
    id: 'art-011',
    slug: 'retrato-infantil',
    title: 'Retrato Infantil en Interior',
    artist: 'Tomás Odión',
    year: 2024,
    category: 'Figurativo',
    price: 2300,
    status: 'available',
    dimensions: {
      height: 90,
      width: 70,
      depth: 3,
      unit: 'cm'
    },
    medium: 'Óleo y témpera grasa sobre lienzo',
    support: 'Lienzo de algodón montado sobre bastidor',
    framed: true,
    frameDetails: 'Marco flotante de madera de haya',
    certificateIncluded: true,
    edition: 'Obra original única (1 de 1)',
    primaryImage: '/obras/OBRA-011-retrato-infantil.jpg',
    galleryImages: [
      '/obras/OBRA-011-retrato-infantil.jpg'
    ],
    description: 'Composición íntima donde la figura infantil se recorta contra un fondo texturado de estancias domésticas cálidas.',
    inspirationStory: 'Captura de un instante espontáneo de juego y concentración infantil.',
    shippingInfo: 'Envío asegurado en contenedor rígido de madera a medida con seguro a todo riesgo.',
    featured: false,
    colorTone: '#CA8A04'
  },
  {
    id: 'art-012',
    slug: 'estudio-arquitectonico',
    title: 'Estudio de Interior Arquitectónico',
    artist: 'Tomás Odión',
    year: 2024,
    category: 'Dibujo/Boceto',
    price: 1950,
    status: 'available',
    dimensions: {
      height: 100,
      width: 70,
      depth: 2.5,
      unit: 'cm'
    },
    medium: 'Carboncillo, aguada de tinta y creta blanca sobre papel de algodón 400g',
    support: 'Montado sobre soporte rígido neutro de conservación',
    framed: true,
    frameDetails: 'Enmarcado de museo con paspartú libre de ácido de 5 cm',
    certificateIncluded: true,
    edition: 'Obra original única (1 de 1)',
    primaryImage: '/obras/OBRA-012-estudio-arquitectonico.jpg',
    galleryImages: [
      '/obras/OBRA-012-estudio-arquitectonico.jpg'
    ],
    description: 'Exploración de la perspectiva y los volúmenes espaciales con trazos rotundos y contrastes de luz y sombra.',
    inspirationStory: 'Reflexión sobre los espacios habitados y la geometría del silencio interior.',
    shippingInfo: 'Envío asegurado en contenedor rígido de madera a medida con seguro a todo riesgo.',
    featured: false,
    colorTone: '#475569'
  },
  {
    id: 'art-013',
    slug: 'la-floresta-5',
    title: 'La Floresta 5',
    artist: 'Tomás Odión',
    year: 2024,
    category: 'Paisaje',
    price: 3400,
    status: 'available',
    dimensions: {
      height: 110,
      width: 70,
      depth: 3.5,
      unit: 'cm'
    },
    medium: 'Óleo espatulado y tierras de siena sobre lienzo',
    support: 'Lienzo de cáñamo pesado sobre bastidor holandés',
    framed: true,
    frameDetails: 'Marco flotante de madera oscura satinada',
    certificateIncluded: true,
    edition: 'Obra original única (1 de 1)',
    primaryImage: '/obras/OBRA-013-la-floresta-5.jpg',
    galleryImages: [
      '/obras/OBRA-013-la-floresta-5.jpg'
    ],
    description: 'Verticalidad vegetal exuberante donde los troncos se alzan como columnas de un templo natural, con vibraciones doradas y verdes profundos.',
    inspirationStory: 'Quinta entrega de la serie "Floresta", inspirada en la densidad de los bosques húmedos peninsulares.',
    shippingInfo: 'Envío asegurado en contenedor rígido de madera a medida con seguro a todo riesgo.',
    featured: false,
    colorTone: '#14532D'
  },
  {
    id: 'art-014',
    slug: 'atardecer',
    title: 'Atardecer en el Bosque',
    artist: 'Tomás Odión',
    year: 2024,
    category: 'Paisaje',
    price: 2700,
    status: 'available',
    dimensions: {
      height: 100,
      width: 65,
      depth: 3,
      unit: 'cm'
    },
    medium: 'Acrílico y resinas alquídicas sobre lienzo',
    support: 'Bastidor de pino de Suecia',
    framed: true,
    frameDetails: 'Marco minimalista en nogal natural',
    certificateIncluded: true,
    edition: 'Obra original única (1 de 1)',
    primaryImage: '/obras/OBRA-014-atardecer.jpg',
    galleryImages: [
      '/obras/OBRA-014-atardecer.jpg'
    ],
    description: 'La luz rasante del crepúsculo tiñe de carmín y oro viejo las copas de los árboles, proyectando largas sombras que articulan el espacio.',
    inspirationStory: 'Pintado durante las horas doradas de finales de verano.',
    shippingInfo: 'Envío asegurado en contenedor rígido de madera a medida con seguro a todo riesgo.',
    featured: false,
    colorTone: '#EA580C'
  },
  {
    id: 'art-015',
    slug: 'selvatico-animal',
    title: 'Selvático Animal',
    artist: 'Tomás Odión',
    year: 2024,
    category: 'Figurativo',
    price: 2950,
    status: 'available',
    dimensions: {
      height: 100,
      width: 65,
      depth: 3.5,
      unit: 'cm'
    },
    medium: 'Técnica mixta, pigmentos minerales y ceras sobre tabla entelada',
    support: 'Tabla tratada con imprimación artesanal',
    framed: true,
    frameDetails: 'Marco rústico contemporáneo en madera quemada (shou sugi ban)',
    certificateIncluded: true,
    edition: 'Obra original única (1 de 1)',
    primaryImage: '/obras/OBRA-015-selvatico-animal.jpg',
    galleryImages: [
      '/obras/OBRA-015-selvatico-animal.jpg'
    ],
    description: 'Presencia animal mítica que acecha entre la espesura con ojos luminosos y cuerpo construido mediante pinceladas vigorosas y texturas táctiles.',
    inspirationStory: 'Invocación del espíritu primordial de la selva y la mirada animal sin juicio.',
    shippingInfo: 'Envío asegurado en contenedor rígido de madera a medida con seguro a todo riesgo.',
    featured: false,
    colorTone: '#0F766E'
  },
  {
    id: 'art-016',
    slug: 'la-reina-descalza',
    title: 'La Reina Descalza',
    artist: 'Tomás Odión',
    year: 2024,
    category: 'Figurativo',
    price: 2850,
    status: 'available',
    dimensions: {
      height: 95,
      width: 60,
      depth: 3,
      unit: 'cm'
    },
    medium: 'Óleo con empastes y pan de bronce sobre lienzo',
    support: 'Lienzo de lino fino sobre bastidor tradicional',
    framed: true,
    frameDetails: 'Marco de madera teñida en grafito con filo dorado',
    certificateIncluded: true,
    edition: 'Obra original única (1 de 1)',
    primaryImage: '/obras/OBRA-016-la-reina-descalza.jpg',
    galleryImages: [
      '/obras/OBRA-016-la-reina-descalza.jpg'
    ],
    description: 'Figura de porte regio despojada de artificios, con los pies en contacto directo con la tierra húmeda y una mirada de dignidad serena.',
    inspirationStory: 'Metáfora sobre la verdadera nobleza, aquella que no requiere tronos sino arraigo en lo esencial.',
    shippingInfo: 'Envío asegurado en contenedor rígido de madera a medida con seguro a todo riesgo.',
    featured: false,
    colorTone: '#7C2D12'
  },
  {
    id: 'art-017',
    slug: 'un-baile-nupcial',
    title: 'Un Baile Nupcial',
    artist: 'Tomás Odión',
    year: 2024,
    category: 'Figurativo',
    price: 2500,
    status: 'available',
    dimensions: {
      height: 70,
      width: 85,
      depth: 3,
      unit: 'cm'
    },
    medium: 'Acrílico estratificado y grafito sobre lienzo',
    support: 'Lienzo de algodón montado sobre bastidor',
    framed: true,
    frameDetails: 'Marco de aluminio anodizado en oro mate',
    certificateIncluded: true,
    edition: 'Obra original única (1 de 1)',
    primaryImage: '/obras/OBRA-017-un-baile-nupcial.jpg',
    galleryImages: [
      '/obras/OBRA-017-un-baile-nupcial.jpg'
    ],
    description: 'Dos figuras en pleno giro dancístico, donde los vestidos y extremidades trazan estelas de movimiento en un fondo rítmico.',
    inspirationStory: 'Celebración festiva popular cargada de alegría ingenua y dinamismo circular.',
    shippingInfo: 'Envío asegurado en contenedor rígido de madera a medida con seguro a todo riesgo.',
    featured: false,
    colorTone: '#BE185D'
  },
  {
    id: 'art-018',
    slug: 'jerusalem',
    title: 'Jerusalem',
    artist: 'Tomás Odión',
    year: 2024,
    category: 'Paisaje',
    price: 3100,
    status: 'sold',
    dimensions: {
      height: 80,
      width: 90,
      depth: 3.5,
      unit: 'cm'
    },
    medium: 'Tierras calcáreas, pigmentos ocres y óleo sobre tabla marina',
    support: 'Soporte rígido de contrachapado de abedul',
    framed: true,
    frameDetails: 'Marco flotante de madera de cedro natural',
    certificateIncluded: true,
    edition: 'Obra original única (1 de 1)',
    primaryImage: '/obras/OBRA-018-jerusalem.jpg',
    galleryImages: [
      '/obras/OBRA-018-jerusalem.jpg'
    ],
    description: 'Vista panorámica de la ciudad milenaria donde la piedra dorada y las cúpulas reflejan el sol del mediodía en una densa arquitectura de estratos históricos.',
    inspirationStory: 'Impresión visual de la luz sobre las murallas y colinas tras una visita a Tierra Santa.',
    shippingInfo: 'Envío asegurado en contenedor rígido de madera a medida con seguro a todo riesgo.',
    featured: false,
    colorTone: '#D97706'
  },
  {
    id: 'art-019',
    slug: 'sendero-de-la-intuicion',
    title: 'Sendero de la Intuición',
    artist: 'Tomás Odión',
    year: 2024,
    category: 'Paisaje',
    price: 2900,
    status: 'available',
    dimensions: {
      height: 105,
      width: 65,
      depth: 3.5,
      unit: 'cm'
    },
    medium: 'Óleo y veladuras transparentes sobre lienzo de lino',
    support: 'Bastidor biselado reforzado',
    framed: true,
    frameDetails: 'Marco flotante en roble natural encerado',
    certificateIncluded: true,
    edition: 'Obra original única (1 de 1)',
    primaryImage: '/obras/OBRA-019-sendero-de-la-intuicion.jpg',
    galleryImages: [
      '/obras/OBRA-019-sendero-de-la-intuicion.jpg'
    ],
    description: 'Un camino sinuoso se adentra entre colinas y bosques vaporosos, guiando la mirada hacia un horizonte infinito.',
    inspirationStory: 'Alegoría del viaje interior y la toma de decisiones guiadas por el instinto creador.',
    shippingInfo: 'Envío asegurado en contenedor rígido de madera a medida con seguro a todo riesgo.',
    featured: false,
    colorTone: '#047857'
  },
  {
    id: 'art-020',
    slug: 'flores-de-la-ira',
    title: 'Flores de la Ira',
    artist: 'Tomás Odión',
    year: 2024,
    category: 'Figurativo',
    price: 2600,
    status: 'available',
    dimensions: {
      height: 100,
      width: 65,
      depth: 3,
      unit: 'cm'
    },
    medium: 'Acrílico viscoso y carbón vegetal sobre lienzo',
    support: 'Lienzo grueso de algodón de 420g',
    framed: true,
    frameDetails: 'Marco lacado en negro mate',
    certificateIncluded: true,
    edition: 'Obra original única (1 de 1)',
    primaryImage: '/obras/OBRA-020-flores-de-la-ira.jpg',
    galleryImages: [
      '/obras/OBRA-020-flores-de-la-ira.jpg'
    ],
    description: 'Ramos florales de gran intensidad dramática, con rojos carmesí ardientes y negros profundos aplicados con gestualidad directa.',
    inspirationStory: 'Catarsis emocional plasmada en pétalos que parecen combustir ante los ojos del espectador.',
    shippingInfo: 'Envío asegurado en contenedor rígido de madera a medida con seguro a todo riesgo.',
    featured: false,
    colorTone: '#991B1B'
  },
  {
    id: 'art-021',
    slug: 'la-malaguena',
    title: 'La Malagueña',
    artist: 'Tomás Odión',
    year: 2024,
    category: 'Figurativo',
    price: 2750,
    status: 'available',
    dimensions: {
      height: 70,
      width: 85,
      depth: 3,
      unit: 'cm'
    },
    medium: 'Óleo y cera punica sobre tabla entelada',
    support: 'Tabla de tilo tratada artesanalmente',
    framed: true,
    frameDetails: 'Marco clásico en madera de castaño teñido',
    certificateIncluded: true,
    edition: 'Obra original única (1 de 1)',
    primaryImage: '/obras/OBRA-021-la-malaguena.jpg',
    galleryImages: [
      '/obras/OBRA-021-la-malaguena.jpg'
    ],
    description: 'Retrato de aire andaluz con mantilla y flores en el cabello, abordado con sobriedad y mirada profunda y serena.',
    inspirationStory: 'Homenaje a las raíces mediterráneas y al cante jondo de la costa sur.',
    shippingInfo: 'Envío asegurado en contenedor rígido de madera a medida con seguro a todo riesgo.',
    featured: false,
    colorTone: '#B91C1C'
  },
  {
    id: 'art-022',
    slug: 'canonigo-decimononico',
    title: 'Canónigo Decimonónico',
    artist: 'Tomás Odión',
    year: 2024,
    category: 'Figurativo',
    price: 2400,
    status: 'available',
    dimensions: {
      height: 70,
      width: 85,
      depth: 3,
      unit: 'cm'
    },
    medium: 'Óleo sobre lienzo con técnica de claroscuro',
    support: 'Lienzo de algodón montado sobre bastidor',
    framed: true,
    frameDetails: 'Marco de estilo sobrio en madera oscura',
    certificateIncluded: true,
    edition: 'Obra original única (1 de 1)',
    primaryImage: '/obras/OBRA-022-canonigo-decimononico.jpg',
    galleryImages: [
      '/obras/OBRA-022-canonigo-decimononico.jpg'
    ],
    description: 'Sátira y homenaje simultáneo a las figuras eclesiásticas decimonónicas, con ropajes severos y rostro cargado de carácter.',
    inspirationStory: 'Estudio de fisonomías históricas a partir de crónicas de archivo del siglo XIX.',
    shippingInfo: 'Envío asegurado en contenedor rígido de madera a medida con seguro a todo riesgo.',
    featured: false,
    colorTone: '#334155'
  },
  {
    id: 'art-023',
    slug: 'padre-calzones',
    title: 'Padre Calzones',
    artist: 'Tomás Odión',
    year: 2024,
    category: 'Figurativo',
    price: 2300,
    status: 'available',
    dimensions: {
      height: 95,
      width: 65,
      depth: 3,
      unit: 'cm'
    },
    medium: 'Técnica mixta y aguada de tinta sobre lienzo',
    support: 'Bastidor de madera maciza reforzada',
    framed: true,
    frameDetails: 'Marco flotante de haya clara',
    certificateIncluded: true,
    edition: 'Obra original única (1 de 1)',
    primaryImage: '/obras/OBRA-023-padre-calzones.jpg',
    galleryImages: [
      '/obras/OBRA-023-padre-calzones.jpg'
    ],
    description: 'Personaje popular de carácter quijotesco y extravagante, representado con humor tierno y pincelada suelta.',
    inspirationStory: 'Inspirada en las figuras pintorescas de la picaresca y la literatura popular de pueblo.',
    shippingInfo: 'Envío asegurado en contenedor rígido de madera a medida con seguro a todo riesgo.',
    featured: false,
    colorTone: '#854D0E'
  },
  {
    id: 'art-024',
    slug: 'pueblo-de-aragon',
    title: 'Pueblo de Aragón',
    artist: 'Tomás Odión',
    year: 2024,
    category: 'Paisaje',
    price: 2850,
    status: 'available',
    dimensions: {
      height: 100,
      width: 65,
      depth: 3,
      unit: 'cm'
    },
    medium: 'Óleo con empastes y tierras rojas sobre lienzo',
    support: 'Lienzo de lino sobre bastidor de 3 cm',
    framed: true,
    frameDetails: 'Marco de madera rústica encerada a mano',
    certificateIncluded: true,
    edition: 'Obra original única (1 de 1)',
    primaryImage: '/obras/OBRA-024-pueblo-de-aragon.jpg',
    galleryImages: [
      '/obras/OBRA-024-pueblo-de-aragon.jpg'
    ],
    description: 'Casas de adobe y teja árabe apiñadas sobre una loma arcillosa bajo un cielo azul cobalto intenso.',
    inspirationStory: 'Paisaje del interior de Aragón, donde el barro cocido y el sol modelan la arquitectura vernácula.',
    shippingInfo: 'Envío asegurado en contenedor rígido de madera a medida con seguro a todo riesgo.',
    featured: false,
    colorTone: '#C2410C'
  },
  {
    id: 'art-025',
    slug: 'composicion-coral',
    title: 'Composición Coral de Figuras',
    artist: 'Tomás Odión',
    year: 2024,
    category: 'Figurativo',
    price: 3500,
    status: 'available',
    dimensions: {
      height: 100,
      width: 75,
      depth: 3.5,
      unit: 'cm'
    },
    medium: 'Óleo y temple de huevo con veladuras sobre lienzo monumental',
    support: 'Bastidor sobredimensionado biselado',
    framed: true,
    frameDetails: 'Marco flotante en roble europeo macizo',
    certificateIncluded: true,
    edition: 'Obra original única (1 de 1)',
    primaryImage: '/obras/OBRA-025-composicion-coral.jpg',
    galleryImages: [
      '/obras/OBRA-025-composicion-coral.jpg'
    ],
    description: 'Multitud de rostros y cuerpos entrelazados en una sinfonía de miradas y gestos de gran impacto dramático y visual.',
    inspirationStory: 'Obra monumental sobre el alma colectiva, la comunidad y la memoria compartida.',
    shippingInfo: 'Envío asegurado en contenedor rígido de madera a medida con seguro a todo riesgo.',
    featured: false,
    colorTone: '#4338CA'
  }
];
