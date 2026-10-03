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

export const designs: Design[] = [];
