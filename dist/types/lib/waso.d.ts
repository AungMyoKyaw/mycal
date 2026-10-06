/**
 * Waso (Full Moon Day of Waso) Calculation
 * Calculates the full moon day of Waso for a given Myanmar year
 */
import type { WatatInfo, WasoResult } from '../types.js';
/**
 * Calculate Full Moon Day of Waso (with caching)
 *
 * @param watatInfo - Watat information
 * @param mmYear - Myanmar Year
 * @returns Waso full moon day information (Julian day and Gregorian date)
 */
export declare function waso(watatInfo: Omit<WatatInfo, 'nearestWatatInfo'>, mmYear: number): WasoResult;
//# sourceMappingURL=waso.d.ts.map