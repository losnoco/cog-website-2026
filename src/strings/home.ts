// The home page's words. See src/i18n.ts for how `Text` works; strings that
// hold links or <code> are HTML.

import type { Item } from "../i18n";

const APP_STORE = "https://apps.apple.com/us/app/cog-kode54/id1630499622";

export const home = {
  title: {
    en: "Cog — Audio Player for Mac, iPhone and iPad",
    es: "Cog — Reproductor de audio para Mac, iPhone y iPad",
  },
  description: {
    en: "A free and open source audio player for Mac, iPhone and iPad.",
    es: "Un reproductor de audio gratuito y de código abierto para Mac, iPhone y iPad.",
  },

  nav: {
    features: { en: "Features", es: "Características" },
    formats: { en: "Formats", es: "Formatos" },
    versions: { en: "Versions", es: "Versiones" },
  },

  teaser: {
    label: { en: "Now available", es: "Ya disponible" },
    title: { en: "Cog for iPhone and iPad", es: "Cog para iPhone y iPad" },
    /** HTML. */
    text: {
      en:
        "The same audio engine and format plugins as the Mac app, playing your " +
        "music straight from the Files app. Requires iOS or iPadOS 18. " +
        `<a href="${APP_STORE}">Get it on the App Store</a>`,
      es:
        "El mismo motor de audio y los mismos plugins de formatos que la app " +
        "para Mac, reproduciendo tu música directamente desde la app Archivos. " +
        "Requiere iOS o iPadOS 18. " +
        `<a href="${APP_STORE}">Descárgalo en el App Store</a>`,
    },
  },
  appStoreUrl: APP_STORE,

  hero: {
    label: {
      en: "Audio Player for Mac, iPhone and iPad",
      es: "Reproductor de audio para Mac, iPhone y iPad",
    },
    title: {
      en: "A free and open source audio player for Mac, iPhone and iPad.",
      es: "Un reproductor de audio gratuito y de código abierto para Mac, iPhone y iPad.",
    },
    download: {
      en: (version: string) => `Download v${version} for Mac`,
      es: (version: string) => `Descargar v${version} para Mac`,
    },
    meta: {
      en: (date: string, macOS: string) =>
        `Published ${date} · Requires macOS ${macOS}`,
      es: (date: string, macOS: string) =>
        `Publicada el ${date} · Requiere macOS ${macOS}`,
    },
    older: { en: "Older versions ↓", es: "Versiones anteriores ↓" },
    appStoreAlt: {
      en: "Download on the App Store",
      es: "Descargar en el App Store",
    },
  },

  // Only the Spanish page says so: the notes come from the appcast as written.
  notesInEnglish: { en: "", es: "Notas de la versión en inglés." },

  features: {
    label: { en: "Features", es: "Características" },
    title: { en: "What Cog does", es: "Qué hace Cog" },
    everywhere: { en: "Everywhere", es: "En todas partes" },
    mac: { en: "On the Mac", es: "En el Mac" },
    ios: { en: "On iPhone and iPad", es: "En iPhone y iPad" },
  },

  formats: {
    label: { en: "Supported Formats", es: "Formatos compatibles" },
    title: { en: "Plays almost anything", es: "Reproduce casi todo" },
  },

  older: {
    label: { en: "Archive", es: "Archivo" },
    title: { en: "Older versions", es: "Versiones anteriores" },
    intro: {
      en:
        "These releases and their notes cover the Mac app only. Cog for " +
        "iPhone and iPad updates through the App Store.",
      es:
        "Estas versiones y sus notas corresponden solo a la app para Mac. Cog " +
        "para iPhone y iPad se actualiza a través del App Store.",
    },
    download: { en: "Download", es: "Descargar" },
  },

  legacy: {
    label: { en: "Legacy", es: "Antiguas" },
    title: { en: "Very old builds", es: "Compilaciones muy antiguas" },
    version: {
      en: (build: string) => `Version ${build}`,
      es: (build: string) => `Versión ${build}`,
    },
  },
};

export const LEGACY_BUILDS = [
  { build: "1148", os: "Mountain Lion", url: "https://cogcdn.cog.losno.co/Cog-3b628c398.zip" },
  { build: "2405", os: "Sierra", url: "https://cogcdn.cog.losno.co/Cog-ff44bc4d.zip" },
  { build: "3349", os: "High Sierra", url: "https://cogcdn.cog.losno.co/Cog-e0a358efb.zip" },
  { build: "3405", os: "Mojave", url: "https://cogcdn.cog.losno.co/Cog-cbf7f41e2.zip" },
  { build: "3633", os: "Catalina", url: "https://cogcdn.cog.losno.co/Cog-80979a907.zip" },
];

// ------------------------------------------------------------------ features

export const FEATURES_EVERYWHERE: Item[] = [
  {
    text: {
      en: "Gapless playback",
      es: "Reproducción sin silencios entre pistas",
    },
  },
  {
    text: {
      en: "Scrobbling with Last.fm and ListenBrainz",
      es: "Scrobbling con Last.fm y ListenBrainz",
    },
  },
  {
    text: {
      en: "Shuffle, both albums and tracks",
      es: "Modo aleatorio, por álbumes y por pistas",
    },
  },
  {
    text: {
      en: "Repeat single track, album, or whole playlist",
      es: "Repetir una pista, el álbum o toda la playlist",
    },
  },
  {
    text: {
      en: "Playback from HTTP(S) sources, both livestreams and static files",
      es: "Reproducción desde fuentes HTTP(S), tanto transmisiones en vivo como archivos estáticos",
    },
    children: [
      {
        text: {
          en: "Apple's HTTP Live Streaming (HLS)",
          es: "HTTP Live Streaming (HLS) de Apple",
        },
      },
      {
        text: {
          en: "Live metadata from Shoutcast, Icecast, Ogg Vorbis comments, and timed ID3v2 packets",
          es: "Metadatos en vivo de Shoutcast, Icecast, comentarios de Ogg Vorbis y paquetes ID3v2 temporizados",
        },
      },
    ],
  },
  {
    text: {
      en: "CUE Sheet support, including embedded CUE Sheets in several formats",
      es: "Compatibilidad con hojas CUE, incluidas las hojas CUE incrustadas en varios formatos",
    },
  },
  {
    text: {
      en: "Album artwork per track — embedded and external, cached per unique image. JPEG, PNG, GIF, WebP, HEIC, or AVIF.",
      es: "Carátulas por pista — incrustadas y externas, en caché una vez por imagen. JPEG, PNG, GIF, WebP, HEIC o AVIF.",
    },
  },
  {
    text: {
      en: "Track info: tags, format, ReplayGain values, and play counts, as the Mac's Info Inspector shows them",
      es: "Información de la pista: etiquetas, formato, valores de ReplayGain y recuento de reproducciones, como los muestra el inspector de información del Mac",
    },
  },
  {
    text: {
      en: `Synced lyrics from the file's own tags, or looked up on <a href="https://lrclib.net">LRCLIB</a> when the file has none`,
      es: `Letras sincronizadas desde las etiquetas del propio archivo, o buscadas en <a href="https://lrclib.net">LRCLIB</a> cuando el archivo no las tiene`,
    },
  },
  {
    text: {
      en: "ReplayGain by album or track, with clipping prevention, falling back to Sound Check",
      es: "ReplayGain por álbum o por pista, evitando la saturación, y Sound Check cuando no hay ReplayGain",
    },
  },
  {
    text: {
      en: "Graphic equalizer with presets",
      es: "Ecualizador gráfico con preajustes",
    },
  },
  {
    text: {
      en: "Spectrum visualization and a stereo VU meter",
      es: "Analizador y vúmetro estéreo",
    },
  },
  {
    text: {
      en: "Waveform seek bar",
      es: "Barra de progreso con forma de onda",
    },
  },
  {
    text: {
      en: "Spatial audio: surround tracks are spatialized on headphones and speakers with Apple's renderer and your personalized HRTF, with head tracking on AirPods",
      es: "Audio espacial: las pistas con sonido envolvente se espacializan en audífonos y parlantes con el renderizador de Apple y tu HRTF personalizada, con seguimiento de la cabeza en AirPods",
    },
  },
  {
    text: {
      en:
        "Speed control: plain varispeed like a record player, or tempo and pitch shifting with either the " +
        `<a href="https://breakfastquay.com/rubberband/">Rubber Band</a> or the ` +
        `<a href="https://signalsmith-audio.co.uk/code/stretch/">Signalsmith Stretch</a> libraries`,
      es:
        "Control de velocidad: Varispeed simple, como un tocadiscos, o cambio de tempo y tono con las bibliotecas " +
        `<a href="https://breakfastquay.com/rubberband/">Rubber Band</a> o ` +
        `<a href="https://signalsmith-audio.co.uk/code/stretch/">Signalsmith Stretch</a>`,
    },
  },
];

export const FEATURES_MAC: Item[] = [
  {
    text: {
      en: "Automatic updates in the direct download edition",
      es: "Actualizaciones automáticas en la edición de descarga directa",
    },
  },
  {
    text: {
      en: "Global hotkeys, notifications, and AppleScript support",
      es: "Atajos globales, notificaciones y compatibilidad con AppleScript",
    },
  },
  {
    text: {
      en: "A file tree browser with search, Spotlight search, and a mini player",
      es: "Un árbol de archivos con búsqueda, búsqueda en Spotlight y un minirreproductor",
    },
  },
  {
    text: {
      en: "Dockable panes: the spectrum, the VU meter, the lyrics, and both inspectors dock around the playlist or float in their own windows",
      es: "Paneles acoplables: el analizador, el vúmetro, las letras y los dos inspectores se acoplan alrededor de la playlist o flotan en sus propias ventanas",
    },
  },
  {
    text: {
      en: "Stereo upmixed to surround with FreeSurround",
      es: "Conversión de estéreo a sonido envolvente con FreeSurround",
    },
  },
  {
    text: {
      en: "Exclusive mode, which takes the output device for Cog and runs it at each track's sample rate",
      es: "Modo exclusivo, que reserva el dispositivo de salida para Cog y lo hace funcionar a la frecuencia de muestreo de cada pista",
    },
  },
  {
    text: {
      en: "Signal Inspector, showing every stage from the decoder to the device with live peak and RMS meters",
      es: "Inspector de señal, que muestra cada etapa desde el decodificador hasta el dispositivo, con medidores de pico y RMS en vivo",
    },
  },
  {
    text: {
      en: "Remote Control (opt-in, macOS 13 or later): once you turn it on, the bundled <code>cog-mcp</code> tool lets MCP clients such as AI assistants control playback and the playlist",
      es: "Control remoto (opcional, macOS 13 o posterior): una vez que lo activas, la herramienta <code>cog-mcp</code> incluida permite que clientes MCP, como los asistentes de IA, controlen la reproducción y la playlist",
    },
  },
];

export const FEATURES_IOS: Item[] = [
  {
    text: {
      en: "Plays files and folders from the Files app where they are, without importing copies",
      es: "Reproduce archivos y carpetas de la app Archivos donde están, sin importar copias",
    },
    children: [
      {
        text: {
          en: "Files shared from other apps go into Cog's own Music folder, which Files and Finder show",
          es: "Los archivos compartidos desde otras apps van a la carpeta Music de Cog, que Archivos y el Finder muestran",
        },
      },
    ],
  },
  {
    text: {
      en: "Now Playing themed from the album art, with a mini player in Liquid Glass",
      es: "En reproducción con los colores de la carátula, y un minirreproductor en Liquid Glass",
    },
  },
  {
    text: {
      en: "The playlist beside Now Playing on any device with room for both",
      es: "La playlist junto a En reproducción en cualquier dispositivo con espacio para ambas",
    },
    children: [
      {
        text: {
          en: "Split along the fold on an unfolded iPhone Duo (iOS 27.1 or later), with the controls in a Liquid Glass bar on the flat half when it stands like a laptop",
          es: "Divididas a lo largo del pliegue en un iPhone Duo desplegado (iOS 27.1 o posterior), con los controles en una barra de Liquid Glass sobre la mitad plana cuando se apoya como un notebook",
        },
      },
    ],
  },
  {
    text: {
      en: "Fast forward and rewind by holding Next and Previous, and lock screen controls",
      es: "Avance y retroceso rápidos manteniendo presionados Siguiente y Anterior, y controles en la pantalla bloqueada",
    },
  },
  {
    text: {
      en: "Search the playlist by title, artist, or album",
      es: "Búsqueda en la playlist por título, artista o álbum",
    },
  },
  {
    text: {
      en: "MIDI with your own SoundFonts, or Sound Canvas emulation from an SC-55 ROM set you import",
      es: "MIDI con tus propias SoundFonts, o emulación de Sound Canvas a partir de un conjunto de ROMs del SC-55 que importes",
    },
  },
  {
    text: {
      en: "An iPad layout with menus and keyboard shortcuts",
      es: "Una disposición para iPad con menús y atajos de teclado",
    },
  },
];

// ------------------------------------------------------------------- formats
// A plain string reads the same in both languages.

export const FORMATS_LEFT: Item[] = [
  {
    text: {
      en: `MP3 (including free format, up to 640kbps; via <a href="https://github.com/lieff/minimp3">minimp3</a>)`,
      es: `MP3 (incluido el formato libre, hasta 640 kbps; mediante <a href="https://github.com/lieff/minimp3">minimp3</a>)`,
    },
  },
  { text: "WAV" },
  {
    text: {
      en: "MPEG-4 container, including chapter support",
      es: "Contenedor MPEG-4, con soporte para capítulos",
    },
  },
  {
    text: {
      en: "Matroska container, including chapter support",
      es: "Contenedor Matroska, con soporte para capítulos",
    },
  },
  {
    text: "AAC",
    children: [
      { text: "LC-AAC" },
      { text: "HE-AAC" },
      { text: "HE-AACv2" },
      { text: "xHE-AAC (USAC)" },
    ],
  },
  { text: "Apple Lossless (ALAC)" },
  { text: { en: "FLAC (including OggFLAC)", es: "FLAC (incluido OggFLAC)" } },
  { text: "Ogg Opus" },
  { text: "Ogg Vorbis" },
  { text: "AC3" },
  { text: "Windows Media Audio" },
  { text: "DTS" },
  { text: "TrueHD" },
  { text: "HDCD" },
  { text: "TTA True Audio" },
  { text: "TAK (Tom's Lossless Audio Kompressor)" },
  { text: "Monkey's Audio (APE)" },
  { text: "APL (APE Linking File)" },
  { text: "TwinVQ" },
  { text: "RealAudio" },
  { text: "ATRAC3" },
  { text: "Musepack" },
  {
    text: {
      en: "WavPack, including DSD support",
      es: "WavPack, con soporte para DSD",
    },
  },
  {
    text: {
      en: "Interchange File Format (IFF) including DSDIFF",
      es: "Interchange File Format (IFF), incluido DSDIFF",
    },
  },
  { text: "DSD Stream File (DFF)" },
  { text: "Wideband Single-bit Data (WSD)" },
];

export const FORMATS_RIGHT: Item[] = [
  {
    text: "MIDI",
    children: [
      {
        text: {
          en:
            `SoundFont, DLS, and embedded soundbank support via a <a href="https://github.com/kode54/spessasynth_core_c">native port</a> ` +
            `of the <a href="https://github.com/spessasus/SpessaSynth">SpessaSynth</a> synthesizer`,
          es:
            `Compatibilidad con SoundFont, DLS y bancos de sonido incrustados mediante una <a href="https://github.com/kode54/spessasynth_core_c">adaptación nativa</a> ` +
            `del sintetizador <a href="https://github.com/spessasus/SpessaSynth">SpessaSynth</a>`,
        },
      },
      {
        text: {
          en: `FM synthesis via <a href="https://nukeykt.retrohost.net/">Nuked OPL3</a>`,
          es: `Síntesis FM mediante <a href="https://nukeykt.retrohost.net/">Nuked OPL3</a>`,
        },
      },
      {
        text: {
          en: `Sound Canvas emulation via <a href="https://github.com/nukeykt/Nuked-SC55">Nuked SC55</a>`,
          es: `Emulación de Sound Canvas mediante <a href="https://github.com/nukeykt/Nuked-SC55">Nuked SC55</a>`,
        },
      },
      {
        text: {
          en: "Audio Unit synthesizer support, including Apple's DLSMusicDevice",
          es: "Compatibilidad con sintetizadores Audio Unit, incluido DLSMusicDevice de Apple",
        },
      },
    ],
  },
  { text: "Shorten" },
  {
    text: { en: "Tracker music", es: "Música de tracker" },
    children: [
      {
        text: {
          en: `<a href="https://lib.openmpt.org/libopenmpt/">libopenmpt</a> (<a href="https://openmpt.org/features#modules">full list of supported formats</a>)`,
          es: `<a href="https://lib.openmpt.org/libopenmpt/">libopenmpt</a> (<a href="https://openmpt.org/features#modules">lista completa de formatos compatibles</a>)`,
        },
      },
      { text: "AHX/HVL (Hively Tracker)" },
      { text: "Syntrax/Jaytrax" },
    ],
  },
  { text: "SID" },
  {
    text: { en: "Game music", es: "Música de videojuegos" },
    children: [
      { text: "GBS (Game Boy)" },
      { text: "NSF (Nintendo)" },
      {
        text: {
          en: "SPC and SNSF (Super Nintendo)",
          es: "SPC y SNSF (Super Nintendo)",
        },
      },
      { text: "VGM (Master System, Genesis/Mega Drive, Game Gear, etc)" },
      {
        text: {
          en: "VGZ (compressed variant of the above)",
          es: "VGZ (variante comprimida del anterior)",
        },
      },
      { text: "PSF (PlayStation)" },
      { text: "SSF (Saturn)" },
      { text: "DSF (Dreamcast)" },
      { text: "QSF (Q-Sound)" },
      { text: "USF (Nintendo 64)" },
      { text: { en: "NCSF and 2SF (Nintendo DS)", es: "NCSF y 2SF (Nintendo DS)" } },
      { text: "Organya (Cave Story)" },
      {
        text: {
          en: `Streamed music via <a href="https://vgmstream.org">vgmstream</a>`,
          es: `Música en audio pregrabado mediante <a href="https://vgmstream.org">vgmstream</a>`,
        },
      },
    ],
  },
  {
    text: { en: "Archive files", es: "Archivos comprimidos" },
    children: [{ text: "ZIP" }, { text: "RAR" }, { text: "GZip" }, { text: "7Z" }],
  },
];
