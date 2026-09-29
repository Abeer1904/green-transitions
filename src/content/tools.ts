/** PM Surya Ghar subsidy as given in the directory: ₹30,000/kW for the first 2 kW, ₹18,000/kW for 2–3 kW, capped at ₹78,000. */
export const surya = (kw: number): number => Math.min(78000, 30000 * Math.min(kw, 2) + 18000 * Math.max(0, Math.min(kw, 3) - 2));
/** Rough dung per day from the directory's rule of thumb: ~50 kg for 4–5 animals. */
export const dungKg = (animals: number): number => Math.round(animals * (50 / 4.5));
