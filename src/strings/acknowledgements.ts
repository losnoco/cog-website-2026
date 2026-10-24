// The acknowledgements page's words. The credits themselves, with their
// descriptions in both languages, are in src/acknowledgements.ts. See
// src/i18n.ts for how `Text` works.

import type { Text } from "../i18n";
import type { Group } from "../acknowledgements";

export const GROUPS: { id: Group; label: Text; title: Text }[] = [
  {
    id: "decoders",
    label: { en: "Decoders", es: "Decodificadores" },
    title: { en: "Decoders and formats", es: "Decodificadores y formatos" },
  },
  {
    id: "processing",
    label: { en: "Processing", es: "Procesamiento" },
    title: { en: "Audio processing", es: "Procesamiento de audio" },
  },
  {
    id: "interface",
    label: { en: "Interface", es: "Interfaz" },
    title: { en: "Interface", es: "Interfaz" },
  },
  {
    id: "data",
    label: { en: "Data", es: "Datos" },
    title: { en: "Data", es: "Datos" },
  },
];

export const acknowledgements = {
  title: {
    en: "Acknowledgements — Cog and XPCog",
    es: "Agradecimientos — Cog y XPCog",
  },
  description: {
    en: "The third-party libraries and data that Cog and XPCog are built on, with their licences.",
    es: "Las bibliotecas y los datos de terceros sobre los que se construyen Cog y XPCog, con sus licencias.",
  },
  nav: {
    cog: { en: "Cog for macOS", es: "Cog para macOS" },
  },
  hero: {
    label: { en: "Acknowledgements", es: "Agradecimientos" },
    title: {
      en: "Built on other people's work.",
      es: "Hecho sobre el trabajo de otros.",
    },
    intro: {
      en:
        "Cog and XPCog play as much as they do because of the decoders, " +
        "emulators, libraries and data below, and the people who wrote them. " +
        "Each entry names its licence as the source trees state it — where " +
        "they state one — and which of the two players uses it.",
      es:
        "Cog y XPCog reproducen todo lo que reproducen gracias a los " +
        "decodificadores, emuladores, bibliotecas y datos de abajo, y a las " +
        "personas que los escribieron. Cada entrada indica su licencia tal " +
        "como la declaran los árboles de código fuente —cuando la declaran— " +
        "y cuál de los dos reproductores la usa.",
    },
  },
  filter: {
    label: { en: "Show credits for", es: "Mostrar créditos de" },
    both: { en: "Both", es: "Ambos" },
  },
};
