import type { Track, TrackId } from './types';

export const TRACKS: Track[] = [
  { id: 'biogas', name: 'Bioenergy: biogas from dung and waste', short: 'Biogas', status: 'live', tagline: 'Turn daily dung and farm waste into cooking gas and manure.', pages: '1–6', hue: 'clay' },
  { id: 'solar', name: 'Solar power and solar pumps', short: 'Solar', status: 'live', tagline: 'A steadier supply for homes, the panchayat and the fields.', pages: '6–11', hue: 'ochre' },
  { id: 'water', name: 'Rainwater and watershed', short: 'Water', status: 'preview', tagline: 'Catch the rain, recharge the ground. Being written.', pages: '12–13', hue: 'blue' },
  { id: 'gasification', name: 'Crop residue gasification', short: 'Gasification', status: 'soon', tagline: 'Coming once the directory covers it.', pages: '–', hue: 'moss' },
  { id: 'regen', name: 'Regenerative agriculture', short: 'Regen. farming', status: 'preview', tagline: 'Where biogas slurry goes next. One research reading so far.', pages: '–', hue: 'green' },
];

export const trackById = (id: string): Track | undefined => TRACKS.find(t => t.id === id);
export const isTrackId = (id: string): id is TrackId => TRACKS.some(t => t.id === id);
