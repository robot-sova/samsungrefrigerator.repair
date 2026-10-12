import type { PhotoId } from './photos';

/**
 * What the content files do not carry: short menu labels and which photos go on which page.
 * Kept apart so services.ts / errorCodes.ts / models.ts stay pure text.
 */

export const serviceExtra: Record<string, { label: string; photos: [PhotoId, PhotoId] }> = {
  'not-cooling': { label: 'Not cooling', photos: ['evaporator-01', 'fan-01'] },
  'ice-maker-repair': { label: 'Ice maker', photos: ['icemaker-01', 'icemaker-02'] },
  'water-leak': { label: 'Water leak', photos: ['leak-01', 'drain-01'] },
  'freezer-not-freezing': { label: 'Freezer not freezing', photos: ['defrost-01', 'evaporator-01'] },
  'compressor-repair': { label: 'Compressor', photos: ['compressor-01', 'board-01'] },
  'control-board-repair': { label: 'Control board', photos: ['board-01', 'compressor-01'] },
  'door-seal-repair': { label: 'Door seal', photos: ['gasket-01', 'parts-01'] },
  'noisy-refrigerator': { label: 'Noisy fridge', photos: ['fan-01', 'compressor-01'] },
  'error-code-repair': { label: 'Error codes', photos: ['board-01', 'defrost-01'] },
};

export const serviceLabel = (slug: string) => serviceExtra[slug]?.label ?? slug;

export const modelPhoto: Record<string, PhotoId> = {
  'family-hub': 'family-hub-01',
  bespoke: 'bespoke-01',
  'french-door-4-door-flex': 'french-door-01',
  'side-by-side': 'side-by-side-01',
  'top-freezer': 'top-freezer-01',
};

/** Error code → the photo of the part it points at. */
export const codePhoto: Record<string, PhotoId> = {
  '1e': 'icemaker-01',
  '5e': 'evaporator-01',
  '8e': 'icemaker-02',
  '21e': 'fan-01',
  '22e': 'fan-01',
  '41c': 'board-01',
  '84c': 'compressor-01',
  'of-of': 'family-hub-01',
  'pc-er': 'board-01',
};
