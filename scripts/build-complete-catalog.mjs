import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const rawDir = path.resolve('raw_images');
const obrasDir = path.resolve('public/obras');
const artistaDir = path.resolve('public/artista');
const catalogPath = path.resolve('src/data/catalog.json');

// Helper to extract a dominant colorTone hex
async function getDominantColorHex(imageBuffer) {
  try {
    const { dominant } = await sharp(imageBuffer).stats();
    if (dominant) {
      const r = dominant.r.toString(16).padStart(2, '0');
      const g = dominant.g.toString(16).padStart(2, '0');
      const b = dominant.b.toString(16).padStart(2, '0');
      return `#${r}${g}${b}`.toUpperCase();
    }
  } catch (e) {
    // fallback
  }
  return '#C5A059';
}

// Check caption bar and return cut height
async function getCaptionBarCut(filePath) {
  const image = sharp(filePath);
  const metadata = await image.metadata();
  const { width, height } = metadata;
  const scanHeight = Math.min(Math.round(height * 0.25), 400);
  const top = height - scanHeight;

  const { data, info } = await image
    .extract({ left: 0, top, width, height: scanHeight })
    .raw()
    .toBuffer({ resolveWithObject: true });

  const channels = info.channels;
  const rowDarkness = [];

  for (let y = scanHeight - 1; y >= 0; y--) {
    let darkPixels = 0;
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * channels;
      const r = data[idx];
      const g = data[idx + 1];
      const b = data[idx + 2];
      if (r < 35 && g < 35 && b < 35) {
        darkPixels++;
      }
    }
    const ratio = darkPixels / width;
    rowDarkness.push({ yFromBottom: scanHeight - 1 - y, ratio });
  }

  const bottomIsDark = rowDarkness[0]?.ratio > 0.55;
  let barHeight = 0;
  if (bottomIsDark) {
    for (const row of rowDarkness) {
      if (row.ratio > 0.35) {
        barHeight = row.yFromBottom;
      } else {
        break;
      }
    }
  }

  if (bottomIsDark && barHeight > 25) {
    return barHeight + 6; // safe margin
  }
  return 0;
}

const artworksConfig = [
  {
    src: 'Aires malagueños.jpg',
    slug: 'aires-malaguenos',
    title: 'Aires Malagueños',
    category: 'Figurativo',
    height: 63,
    width: 86,
    price: 2600,
    medium: 'Óleo y pigmentos sobre tabla entelada con empastes y espatulado',
    support: 'Tabla entelada tratada artesanalmente al gesso',
    framed: true,
    frameDetails: 'Marco flotante en madera maciza lacada en negro satinado',
    description: 'Composición andaluza de enorme ritmo y vitalidad plástica. Las figuras y el movimiento del cante se funden en una atmósfera festiva de rojos intensos y sombras cálidas.',
    inspirationStory: 'Homenaje a las raíces mediterráneas, el flamenco y la vibración emocional de la noche malagueña.'
  },
  {
    src: 'Bonsai.jpg',
    slug: 'bonsai',
    title: 'Bonsái',
    category: 'Paisaje',
    height: 45.5,
    width: 33,
    price: 1650,
    medium: 'Acrílico y técnica mixta con veladuras sobre lienzo',
    support: 'Lienzo de algodón montado sobre bastidor',
    framed: true,
    frameDetails: 'Marco de haya natural encerada a mano',
    description: 'Estudio botánico intimista de un árbol bonsái, capturado con delicadeza matérica y contrastes líricos de gran serenidad visual.',
    inspirationStory: 'Meditación sobre la paciencia, el crecimiento contenido y la sobriedad zen de las formas naturales.'
  },
  {
    src: 'Cardo .jpg',
    slug: 'cardo-mariano',
    title: 'Cardo Mariano',
    category: 'Figurativo',
    height: 45.5,
    width: 33,
    price: 1600,
    medium: 'Óleo y empaste con espátula sobre tabla',
    support: 'Soporte rígido de tabla de tilo',
    framed: true,
    frameDetails: 'Marco sobrio en madera oscura satinada',
    description: 'Estudio expresionista de la flor silvestre del cardo sobre fondos celestes y ocres terrosos con textura vigorosa.',
    inspirationStory: 'Inspirada en la belleza austera y la resistencia de las especies florales autóctonas del paisaje ibérico.'
  },
  {
    src: 'Casa Soutine.jpg',
    slug: 'casa-soutine',
    title: 'La Casa del Pintor Soutine',
    category: 'Paisaje',
    height: 100,
    width: 70,
    price: 3400,
    medium: 'Óleo denso y pigmentos al barniz con espátula sobre lino',
    support: 'Lienzo de lino belga sobre bastidor reforzado de 3.5 cm',
    framed: true,
    frameDetails: 'Marco flotante de roble teñido en nogal oscuro',
    description: 'Fervoroso tributo pictórico a Chaïm Soutine. La arquitectura parece ondular ante la carga emocional del óleo con empastes que retuercen el espacio.',
    inspirationStory: 'Diálogo con la escuela de París y el expresionismo desgarrador del maestro lituano.'
  },
  {
    src: 'Casas viejas.jpg',
    slug: 'casas-viejas',
    title: 'Casas Viejas',
    category: 'Paisaje',
    height: 45.5,
    width: 33,
    price: 1750,
    medium: 'Óleo y polvo de mármol sobre lienzo',
    support: 'Bastidor macizo de madera de pino',
    framed: true,
    frameDetails: 'Marco rústico de roble europeo encerado',
    description: 'Muros de adobe y piedras milenarias en un poblado antiguo donde el tiempo parece haberse detenido bajo la luz crepuscular.',
    inspirationStory: 'Crónica plástica de la arquitectura rural y el silencio poético de las poblaciones de interior.'
  },
  {
    src: 'Ensayo brujas.jpg',
    slug: 'ensayo-de-brujas',
    title: 'Ensayo de Brujas',
    category: 'Figurativo',
    height: 86,
    width: 63,
    price: 2700,
    medium: 'Técnica mixta, carbón vegetal y tintas sobre lienzo',
    support: 'Lienzo de lino montado en bastidor biselado',
    framed: true,
    frameDetails: 'Marco lacado negro mate de corte minimalista',
    description: 'Composición teatral y enigmática donde máscaras, gestos y sombras evocan la magia del aquelarre y la tramoya escénica.',
    inspirationStory: 'Exploración del mito, la hechicería popular y el teatro grotesco del siglo de oro.'
  },
  {
    src: 'Esquilo.jpg',
    slug: 'la-mujer-de-esquilo',
    title: 'La Mujer de Esquilo',
    category: 'Figurativo',
    height: 86,
    width: 64,
    price: 2800,
    medium: 'Óleo y tierras de sombra con veladuras clásicas sobre lino',
    support: 'Lienzo de lino grueso sobre bastidor macizo',
    framed: true,
    frameDetails: 'Marco clásico en madera noble con pátina dorada envejecida',
    description: 'Figura monumental inspirada en la tragedia griega clásica. La mirada firme y la paleta de tierras quemadas dotan a la figura de un dramatismo eterno.',
    inspirationStory: 'Los ecos de las tragedias de Esquilo y la fuerza indomable de los personajes arquetípicos.'
  },
  {
    src: 'Fumador.jpg',
    slug: 'fumador-en-pipa',
    title: 'Fumador en Pipa',
    category: 'Figurativo',
    height: 86,
    width: 64,
    price: 2650,
    medium: 'Acrílico y óleo con texturas matéricas sobre lienzo',
    support: 'Bastidor reforzado de 3.5 cm',
    framed: true,
    frameDetails: 'Marco flotante en negro carbón satinado',
    description: 'Retrato de gran carácter donde el humo de la pipa dibuja arabescos amarillos y violetas en torno a la figura reflexiva.',
    inspirationStory: 'El placer de la contemplación solitaria y el compás pausado del pensamiento.'
  },
  {
    src: 'Fátima.jpeg',
    slug: 'aparicion-de-fatima',
    title: 'Aparición de Fátima',
    category: 'Figurativo',
    height: 100,
    width: 70,
    price: 3100,
    customCrop: { left: 247, top: 144, width: 770, height: 1080 },
    medium: 'Técnica mixta, gouache y pigmentos sobre papel entelado',
    support: 'Papel de alto gramaje montado sobre tabla tratada',
    framed: true,
    frameDetails: 'Marco de madera noble con moldura biselada',
    description: 'Escena mística de devoción popular que integra la imagen de la Virgen con la presencia de campesinos y un bodegón frutal en primer plano.',
    inspirationStory: 'El sincretismo entre la fe comunitaria, la presencia sagrada y los frutos humildes de la tierra.'
  },
  {
    src: 'Fósiles.jpg',
    slug: 'mesa-de-fosiles',
    title: 'Mesa de Fósiles',
    category: 'Abstracto',
    height: 33,
    width: 45.5,
    price: 1550,
    medium: 'Óleo, arena sílice y pigmentos minerales sobre tabla',
    support: 'Tabla entelada artesanal',
    framed: true,
    frameDetails: 'Marco flotante en madera clara de haya',
    description: 'Bodegón geológico donde conchas, minerales y vestigios orgánicos reposan sobre un plano cálido y táctil.',
    inspirationStory: 'La fascinación por el testimonio del tiempo geológico grabado en la roca viva.'
  },
  {
    src: 'Galante escena.jpg',
    slug: 'escena-galante',
    title: 'Escena Galante',
    category: 'Figurativo',
    height: 100,
    width: 70,
    price: 3300,
    medium: 'Óleo y técnica mixta con pigmentos densos sobre lino',
    support: 'Lienzo de lino sobre bastidor macizo',
    framed: true,
    frameDetails: 'Marco flotante en roble macizo teñido en nogal',
    description: 'Reinterpretación moderna del cortejo romántico con figuras expresionistas inmersas en un bosque de empastes vibrantes.',
    inspirationStory: 'El cortejo y los juegos de miradas de la pintura galante pasados por el tamiz vanguardista.'
  },
  {
    src: 'Geométricos.jpg',
    slug: 'cuerpos-geometricos',
    title: 'Cuerpos Geométricos',
    category: 'Abstracto',
    height: 86,
    width: 64,
    price: 2750,
    medium: 'Técnica mixta y acrílico con texturas sobre lienzo',
    support: 'Bastidor biselado de madera',
    framed: true,
    frameDetails: 'Marco lacado en negro mate con perfil fino',
    description: 'Interacción de planos cúbicos, curvas anatómicas y líneas arquitectónicas que exploran la tensión espacial.',
    inspirationStory: 'La búsqueda de un orden racional en equilibrio con la emoción instintiva del color.'
  },
  {
    src: 'Golfo.jpg',
    slug: 'el-golfo',
    title: 'El Golfo',
    category: 'Figurativo',
    height: 108,
    width: 72,
    price: 3500,
    medium: 'Óleo y veladuras transparentes sobre lienzo de lino monumental',
    support: 'Bastidor sobredimensionado reforzado',
    framed: true,
    frameDetails: 'Marco flotante en roble europeo macizo',
    description: 'Figura de gran magnetismo y pose desenfadada, retratada con soltura pictórica y ricos contrastes en azules marinos y verdes oliva.',
    inspirationStory: 'Personajes callejeros que encarnan la picardía, la astucia y la libertad indomable.'
  },
  {
    src: 'Hechicera.jpg',
    slug: 'hechicera',
    title: 'Hechicera',
    category: 'Figurativo',
    height: 45.5,
    width: 33,
    price: 1800,
    medium: 'Óleo y cera punica con pigmentos minerales sobre tabla',
    support: 'Tabla tratada con gesso tradicional',
    framed: true,
    frameDetails: 'Marco en madera oscura con filete dorado envejecido',
    description: 'Retrato arquetípico de mirada penetrante con tocado carmesí y una atmósfera cargada de misterio y magnetismo.',
    inspirationStory: 'La sabiduría hermética y el arquetipo femenino de la maga en la historia ancestral.'
  },
  {
    src: 'Inquisidores.jpg',
    slug: 'politicos-inquisidores',
    title: 'Políticos Inquisidores',
    category: 'Figurativo',
    height: 45.5,
    width: 33,
    price: 1900,
    medium: 'Óleo y aguada de tinta sobre lienzo',
    support: 'Lienzo de algodón sobre bastidor de 3 cm',
    framed: true,
    frameDetails: 'Marco flotante negro satinado',
    description: 'Sátira pictórica mordaz que retrata la soberbia y la severidad del juicio dogmático con trazos incisivos.',
    inspirationStory: 'Diálogo con la tradición crítica de Goya y Solana sobre el autoritarismo y la hipocresía social.'
  },
  {
    src: 'Jesusin.jpg',
    slug: 'jesusin',
    title: 'Jesusín',
    category: 'Figurativo',
    height: 45.5,
    width: 33,
    price: 1700,
    medium: 'Técnica mixta y acrílico sobre lienzo',
    support: 'Bastidor macizo de madera',
    framed: true,
    frameDetails: 'Marco en haya natural encerada',
    description: 'Figura infantil de expresión dulce y conmovedora sobre una atmósfera marina de olas y cielo agitado.',
    inspirationStory: 'La pureza e inocencia de la niñez frente a la inmensidad del mar y los desafíos vitales.'
  },
  {
    src: 'Lechera.jpg',
    slug: 'la-lechera',
    title: 'La Lechera',
    category: 'Figurativo',
    height: 63,
    width: 86,
    price: 2600,
    medium: 'Óleo con empastes y técnica de espátula sobre lienzo',
    support: 'Lienzo de lino sobre bastidor reforzado',
    framed: true,
    frameDetails: 'Marco rústico de madera natural teñida',
    description: 'Homenaje a la figura tradicional de la lechera rural, resuelta con colores vivos y una pincelada expresiva de gran solidez.',
    inspirationStory: 'La dignidad y el esfuerzo de los oficios agrarios olvidados en el campo europeo.'
  },
  {
    src: 'Lectora.(Detalle).jpeg',
    slug: 'la-lectora-detalle',
    title: 'La Lectora (Detalle)',
    category: 'Figurativo',
    height: 80,
    width: 40,
    price: 2200,
    medium: 'Acrílico y tintas de color sobre papel entelado',
    support: 'Soporte reforzado de tabla entelada',
    framed: true,
    frameDetails: 'Marco flotante estrecho en roble claro',
    description: 'Primer plano vertical donde una joven lectora sostiene un tomo carmesí en absoluta introspección lírica.',
    inspirationStory: 'El refugio espiritual de la lectura y el viaje mental que abre la página abierta.'
  },
  {
    src: 'Malagueñas.jpg',
    slug: 'malaguenas',
    title: 'Malagueñas',
    category: 'Figurativo',
    height: 45.5,
    width: 33,
    price: 1750,
    medium: 'Óleo sobre tabla tratada artesanalmente',
    support: 'Tabla entelada preparada al gesso',
    framed: true,
    frameDetails: 'Marco clásico en madera encerada a mano',
    description: 'Tertulia de mujeres andaluzas reunidas bajo una luz suave que realza mantillas, vestidos y miradas cómplices.',
    inspirationStory: 'La complicidad cotidiana y la transmisión oral de historias en los patios del sur.'
  },
  {
    src: 'Mañana.jpg',
    slug: 'manana-gloriosa',
    title: 'Mañana Gloriosa',
    category: 'Paisaje',
    height: 70,
    width: 100,
    price: 3200,
    medium: 'Óleo luminoso con veladuras de cera sobre lino',
    support: 'Lienzo de lino montado en bastidor de 3.5 cm',
    framed: true,
    frameDetails: 'Marco flotante lacado en blanco hueso con filo natural',
    description: 'Amanecer diáfano que baña colinas, prados y arboledas con una calidez dorada de infinita serenidad.',
    inspirationStory: 'La renovación del día y el agradecimiento por la belleza limpia del alba.'
  },
  {
    src: 'Mesa.jpg',
    slug: 'mesa-de-naturaleza',
    title: 'Mesa de Naturaleza',
    category: 'Figurativo',
    height: 45.5,
    width: 33,
    price: 1650,
    medium: 'Óleo y empaste con espátula sobre tabla',
    support: 'Tabla de pino tratada',
    framed: true,
    frameDetails: 'Marco en madera natural con acabado satinado',
    description: 'Naturaleza viva con recipientes, flores y frutas dispuestas con una libertad compositiva fresca y espontánea.',
    inspirationStory: 'La belleza modesta de los elementos domésticos reunidos sobre el mantel del atelier.'
  },
  {
    src: 'Mimo.jpg',
    slug: 'el-mimo',
    title: 'El Mimo',
    category: 'Figurativo',
    height: 100,
    width: 70,
    price: 3100,
    medium: 'Óleo y pigmentos sobre lienzo de lino',
    support: 'Lienzo de lino sobre bastidor macizo',
    framed: true,
    frameDetails: 'Marco flotante en negro ébano satinado',
    description: 'Personaje de teatro mudo con rostro enharinado y ademanes sutiles que expresan la complejidad de la condición humana.',
    inspirationStory: 'El silencio escénico que dice más que mil discursos y el enigma de la pantomima.'
  },
  {
    src: 'Mosquito.jpg',
    slug: 'mosquito-diablo',
    title: 'Mosquito Diablo',
    category: 'Figurativo',
    height: 40,
    width: 29.5,
    price: 1400,
    medium: 'Acuarela, tinta y gouache sobre papel artesanal',
    support: 'Papel artesanal de algodón montado',
    framed: true,
    frameDetails: 'Marco fino en madera natural encerada',
    description: 'Criatura fantástica y traviesa resuelta con humor y ligereza gráfica sobre fondos celestes y acuarelados.',
    inspirationStory: 'El bestiario imaginario de seres diminutos que pueblan la fantasía mediterránea.'
  },
  {
    src: 'Nocturnidad.jpg',
    slug: 'nocturnidad',
    title: 'Nocturnidad',
    category: 'Paisaje',
    height: 70,
    width: 100,
    price: 3300,
    medium: 'Óleo y azul de prusia con veladuras sobre lienzo',
    support: 'Lienzo reforzado sobre bastidor de 3.5 cm',
    framed: true,
    frameDetails: 'Marco flotante de madera lacada en negro profundo',
    description: 'Composición nocturna de azules profundos, brumas lunares y sombras inquietantes que envuelven el paisaje.',
    inspirationStory: 'La introspección de la vigilia nocturna y los misterios que despiertan cuando el sol se apaga.'
  },
  {
    src: 'Noriko.jpg',
    slug: 'noriko',
    title: 'Noriko',
    category: 'Figurativo',
    height: 80,
    width: 70,
    price: 2900,
    medium: 'Óleo de empaste denso y espatulado escultórico sobre lienzo',
    support: 'Lienzo de algodón grueso sobre bastidor de 3.5 cm',
    framed: true,
    frameDetails: 'Marco flotante de haya clara encerada',
    description: 'Retrato de gran impacto matérico. Los cabellos negros esculpidos con espátula enmarcan un rostro expresivo sobre blusa de rayas marineras.',
    inspirationStory: 'El encuentro con personalidades orientales de fuerte presencia y carácter insobornable.'
  },
  {
    src: 'Palomar.jpg',
    slug: 'el-palomar',
    title: 'El Palomar',
    category: 'Paisaje',
    height: 86,
    width: 63,
    price: 2700,
    medium: 'Óleo y tierras naturales sobre lienzo',
    support: 'Lienzo de lino sobre bastidor biselado',
    framed: true,
    frameDetails: 'Marco rústico en roble natural encerado',
    description: 'Arquitectura tradicional de palomar enclavada entre vegetación agreste y horizontes despejados.',
    inspirationStory: 'Homenaje a los refugios de aves campesinos y a la convivencia armónica entre arquitectura y fauna.'
  },
  {
    src: 'Pañuelo mujer.jpg',
    slug: 'mujer-con-panuelo',
    title: 'Mujer con Pañuelo',
    category: 'Figurativo',
    height: 45.5,
    width: 33,
    price: 1750,
    medium: 'Óleo sobre tabla tratada con imprimación de lino',
    support: 'Tabla entelada artesanal',
    framed: true,
    frameDetails: 'Marco clásico en madera de nogal con pátina suave',
    description: 'Retrato intimista de mujer ataviada con pañuelo azul cobalto, resuelto con pincelada segura y hondura psicológica.',
    inspirationStory: 'La serenidad inalterable de las mujeres que han sido el pilar silencioso de las familias.'
  },
  {
    src: 'Pintora.jpeg',
    slug: 'la-pintora-en-el-taller',
    title: 'La Pintora en el Taller',
    category: 'Figurativo',
    height: 80,
    width: 70,
    price: 2850,
    medium: 'Gouache, temple y tinta sobre papel de dibujo montado',
    support: 'Papel de alto gramaje montado sobre tabla',
    framed: true,
    frameDetails: 'Marco flotante de roble claro',
    description: 'Homenaje a la mujer artista frente a la tela en blanco, rodeada de sus útiles de trabajo, pinceles y mezclas de color.',
    inspirationStory: 'El santuario del taller de pintura y la entrega absoluta al ritual creador.'
  },
  {
    src: 'Prepirineos3.jpg',
    slug: 'prepirineos-3',
    title: 'Prepirineos 3',
    category: 'Paisaje',
    height: 70,
    width: 100,
    price: 3200,
    medium: 'Óleo y técnica mixta con pigmentos minerales sobre lino',
    support: 'Lienzo de lino sobre bastidor macizo',
    framed: true,
    frameDetails: 'Marco flotante en roble europeo encerado',
    description: 'Perfil montañoso y valles escarpados del prepirineo, capturados con azules minerales y tierras ocres de gran sobriedad.',
    inspirationStory: 'La majestuosidad de la antesala de los grandes macizos pirenaicos bajo la luz limpia del norte.'
  },
  {
    src: 'ProfeTeresa.jpg',
    slug: 'profesora-teresa',
    title: 'Profesora Teresa',
    category: 'Figurativo',
    height: 86,
    width: 63,
    price: 2800,
    medium: 'Óleo y pigmentos brillantes sobre lienzo',
    support: 'Bastidor de madera maciza reforzada',
    framed: true,
    frameDetails: 'Marco en madera oscura con bisel dorado',
    description: 'Retrato entrañable y vitalista con collar de coral rojo que destella sobre un vestido de amarillos luminosos.',
    inspirationStory: 'La calidez y sabiduría de la docencia vocacional y el recuerdo afectuoso a los maestros.'
  },
  {
    src: 'Puente Carlos.jpg',
    slug: 'puente-de-carlos-praga',
    title: 'Puente de Carlos, Praga',
    category: 'Paisaje',
    height: 62,
    width: 85,
    price: 2950,
    medium: 'Óleo con empastes densos sobre lienzo',
    support: 'Lienzo de lino montado en bastidor',
    framed: true,
    frameDetails: 'Marco flotante lacado en negro satinado',
    description: 'Impresión lírica del célebre puente gótico sobre el río Moldava con las esculturas recortadas contra el crepúsculo.',
    inspirationStory: 'Evocación de los paseos otoñales por la vieja Europa y su arquitectura de leyenda.'
  },
  {
    src: 'Santa.jpg',
    slug: 'la-santa',
    title: 'La Santa',
    category: 'Figurativo',
    height: 86,
    width: 63,
    price: 2750,
    medium: 'Óleo y caseína con espatulado sobre lienzo',
    support: 'Lienzo montado sobre bastidor biselado',
    framed: true,
    frameDetails: 'Marco de estilo sobrio en madera encerada',
    description: 'Icono contemporáneo de mujer santa con aureola luminosa y ramo de flores en ofrenda votiva.',
    inspirationStory: 'La devoción popular y la búsqueda de lo trascendente a través de la sencillez del corazón.'
  },
  {
    src: 'Selfie.jpg',
    slug: 'selfie',
    title: 'Selfie',
    category: 'Figurativo',
    height: 45.5,
    width: 33,
    price: 1850,
    medium: 'Óleo y acrílico sobre tabla entelada',
    support: 'Tabla tratada con imprimación artesanal',
    framed: true,
    frameDetails: 'Marco flotante de haya clara',
    description: 'Autorretrato cargado de ironía reflexiva donde la mirada del artista se interroga ante el espejo de la actualidad.',
    inspirationStory: 'La reinterpretación del autorretrato clásico ante el auge de la imagen efímera y digital.'
  },
  {
    src: 'SraPilar.jpg',
    slug: 'la-senora-pilar',
    title: 'La Señora Pilar',
    category: 'Figurativo',
    height: 86,
    width: 64,
    price: 2800,
    medium: 'Óleo y técnica mixta sobre lienzo de lino',
    support: 'Bastidor reforzado de 3.5 cm',
    framed: true,
    frameDetails: 'Marco en roble macizo con acabado natural',
    description: 'Retrato de gran porte y viveza gestual. Las gafas y la mirada inteligente dominan una composición de trazos seguros y cálidos.',
    inspirationStory: 'Homenaje a una mujer de profunda entereza moral y generosidad entrañable.'
  },
  {
    src: 'Tropical.jpg',
    slug: 'tropical',
    title: 'Tropical',
    category: 'Paisaje',
    height: 70,
    width: 100,
    price: 3150,
    medium: 'Óleo saturado y espátula vigorosa sobre lienzo',
    support: 'Lienzo de algodón sobre bastidor macizo',
    framed: true,
    frameDetails: 'Marco flotante en negro carbón',
    description: 'Explosión de follaje exuberante, verdes esmeralda y destellos cálidos que evocan la vitalidad del clima caribeño.',
    inspirationStory: 'El deslumbramiento vegetal y la energía vital que emana de las selvas tropicales.'
  },
  {
    src: 'Venus.jpg',
    slug: 'venus-fragmentada',
    title: 'Venus Fragmentada',
    category: 'Figurativo',
    height: 86,
    width: 63,
    price: 3100,
    medium: 'Óleo y temple sobre lienzo con veladuras en rosa y ocre',
    support: 'Lienzo de lino sobre bastidor biselado',
    framed: true,
    frameDetails: 'Marco flotante en roble europeo macizo',
    description: 'Relectura contemporánea del desnudo mitológico donde la forma clásica se disuelve en pinceladas fragmentadas y rítmicas.',
    inspirationStory: 'El diálogo perenne con el canon de belleza helenístico revisitado desde la vanguardia.'
  },
  {
    src: 'Verde sexy.jpg',
    slug: 'verde-y-sexy',
    title: 'Verde y Sexy',
    category: 'Figurativo',
    height: 45.5,
    width: 33,
    price: 1800,
    medium: 'Óleo y pigmentos verdes esmeralda con empaste denso',
    support: 'Tabla entelada tratada al gesso',
    framed: true,
    frameDetails: 'Marco de madera natural encerada',
    description: 'Composición atrevida donde la sensualidad femenina se funde con texturas esmeralda y destellos luminosos.',
    inspirationStory: 'La exaltación de la juventud, el magnetismo del verde y la frescura del gesto libre.'
  },
  {
    src: 'Visitadora vírgen.jpeg',
    slug: 'la-virgen-visitadora',
    title: 'La Virgen Visitadora',
    category: 'Figurativo',
    height: 86,
    width: 63,
    price: 3200,
    customCrop: { left: 138, top: 110, width: 765, height: 1065 },
    medium: 'Técnica mixta, temple y óleo sobre lienzo',
    support: 'Lienzo de lino montado en bastidor de madera maciza',
    framed: true,
    frameDetails: 'Marco noble en madera tallada con pátina envejecida',
    description: 'Narrativa bíblica de gran aliento plástico: la Virgen avanza a lomos del asno acompañada por ángeles y fieles ante un arco de piedra.',
    inspirationStory: 'El viaje sagrado, la protección divina en el camino y las leyendas de peregrinación mediterránea.'
  }
];

async function run() {
  console.log('=== PROCESANDO CATÁLOGO Y OPTIMIZANDO OBRAS (026 A 063) ===\n');

  // Asegurar carpetas
  if (!fs.existsSync(obrasDir)) fs.mkdirSync(obrasDir, { recursive: true });
  if (!fs.existsSync(artistaDir)) fs.mkdirSync(artistaDir, { recursive: true });

  // 1. Eliminar archivos temporales no prefijados generados previamente en public/obras
  const existingFiles = fs.readdirSync(obrasDir);
  for (const f of existingFiles) {
    if (!f.startsWith('obra-')) {
      const p = path.join(obrasDir, f);
      fs.unlinkSync(p);
      console.log(`🧹 Eliminado archivo no prefijado: ${f}`);
    }
  }

  // 2. Procesar Tomás perfil si existe
  const tomasRaw = path.join(rawDir, 'Tomásperfil .png');
  if (fs.existsSync(tomasRaw)) {
    const tomasDest = path.join(artistaDir, 'tomas-odion-perfil.webp');
    await sharp(tomasRaw)
      .resize({ width: 800, height: 800, fit: 'inside', withoutEnlargement: true })
      .webp({ quality: 85 })
      .toFile(tomasDest);
    console.log(`👤 Foto de perfil del artista optimizada en: public/artista/tomas-odion-perfil.webp`);
  }

  // 3. Procesar las 38 obras nuevas con numeración correlativa art-026..art-063
  const newCatalogEntries = [];
  const startNumber = 26;

  for (let i = 0; i < artworksConfig.length; i++) {
    const item = artworksConfig[i];
    const numberStr = String(startNumber + i).padStart(3, '0');
    const obraId = `art-${numberStr}`;
    const filename = `obra-${numberStr}-${item.slug}.webp`;
    const destPath = path.join(obrasDir, filename);
    const rawPath = path.join(rawDir, item.src);

    if (!fs.existsSync(rawPath)) {
      console.error(`❌ No existe archivo origen: ${rawPath}`);
      continue;
    }

    const meta = await sharp(rawPath).metadata();
    let transformer = sharp(rawPath).rotate(); // auto-orient

    // Aplicar recorte si es necesario
    if (item.customCrop) {
      transformer = transformer.extract(item.customCrop);
    } else {
      const barCut = await getCaptionBarCut(rawPath);
      if (barCut > 0) {
        transformer = transformer.extract({
          left: 0,
          top: 0,
          width: meta.width,
          height: meta.height - barCut
        });
        console.log(`✂️  [Recorte de barra inferior: ${barCut}px] ${item.src} -> ${filename}`);
      }
    }

    // Redimensionar máx 1600px en el lado mayor y guardar en WebP 82%
    const processedBuffer = await transformer
      .resize({
        width: 1600,
        height: 1600,
        fit: 'inside',
        withoutEnlargement: true
      })
      .webp({
        quality: 82,
        effort: 4
      })
      .toBuffer();

    fs.writeFileSync(destPath, processedBuffer);
    const colorTone = await getDominantColorHex(processedBuffer);
    const stats = fs.statSync(destPath);

    console.log(`✅ [${obraId}] ${item.title} -> /obras/${filename} (${(stats.size / 1024).toFixed(1)} KB, tono: ${colorTone})`);

    newCatalogEntries.push({
      id: obraId,
      slug: item.slug,
      title: item.title,
      artist: 'Tomás Odión',
      year: 2024,
      category: item.category,
      price: item.price,
      status: 'available',
      dimensions: {
        height: item.height,
        width: item.width,
        depth: 3.5,
        unit: 'cm'
      },
      medium: item.medium,
      support: item.support,
      framed: item.framed,
      frameDetails: item.frameDetails,
      certificateIncluded: true,
      edition: 'Obra original única (1 de 1)',
      primaryImage: `/obras/${filename}`,
      galleryImages: [`/obras/${filename}`],
      description: item.description,
      inspirationStory: item.inspirationStory,
      shippingInfo: 'Envío asegurado en contenedor rígido de madera a medida con seguro a todo riesgo.',
      featured: false,
      colorTone: colorTone
    });
  }

  // 4. Actualizar catalog.json
  const currentCatalog = JSON.parse(fs.readFileSync(catalogPath, 'utf8'));
  // Conservar solo las primeras 25 obras base (001 a 025)
  const baseCatalog = currentCatalog.filter(c => {
    const num = parseInt(c.id.replace('art-', ''), 10);
    return num <= 25;
  });

  const fullCatalog = [...baseCatalog, ...newCatalogEntries];
  fs.writeFileSync(catalogPath, JSON.stringify(fullCatalog, null, 2), 'utf8');

  console.log(`\n🎉 Catálogo actualizado exitosamente:`);
  console.log(`   - Obras anteriores: ${baseCatalog.length}`);
  console.log(`   - Obras nuevas añadidas: ${newCatalogEntries.length}`);
  console.log(`   - Total obras en catálogo oficial: ${fullCatalog.length}`);
}

run().catch(e => {
  console.error('Error fatal:', e);
  process.exit(1);
});
