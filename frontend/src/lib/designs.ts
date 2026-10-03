/**
 * Candidate looks for the dev-only design switcher. Each entry pairs with
 * `src/styles/designs/<id>.css`, which overrides tokens under
 * `:root[data-design='<id>']`. Production never sets that attribute, so
 * nothing here affects the live site.
 */
export type Design = {
  id: string;
  name: string;
  /** Google Fonts stylesheet URL; loaded only while this design is active. */
  fontsHref?: string;
};

export const designs: Design[] = [
  {
    id: 'artesanato',
    name: 'Artesanato Orgânico',
    fontsHref:
      'https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;500;600;700&family=Vollkorn:ital,wght@0,400;0,600;1,400&family=JetBrains+Mono:wght@400;500&display=swap',
  },
  {
    id: 'ceramica',
    name: 'Cerâmica Wabi-Sabi',
    fontsHref:
      'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,500;1,600&family=JetBrains+Mono:wght@400;500&display=swap',
  },
];
