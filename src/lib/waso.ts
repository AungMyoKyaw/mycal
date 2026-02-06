/**
 * Waso (Full Moon Day of Waso) Calculation
 * Calculates the full moon day of Waso for a given Myanmar year
 */

import { julianToDate } from '../utils/julian.js';
import { CONST, findException, getExceptions } from '../constants.js';
// import { caches } from '../utils/cache.js'; // TEMPORARILY DISABLED FOR DEBUGGING
import type { WatatInfo, WasoResult } from '../types.js';

const { SY, MO, LM, firstEra, secondEra, thirdEra } = CONST;

/**
 * Format date to US date string (faster than toLocaleDateString)
 */
function formatDate(date: Date): string {
  const month = date.getUTCMonth() + 1;
  const day = date.getUTCDate();
  const year = date.getUTCFullYear();
  return `${month}/${day}/${year}`;
}

/**
 * Calculate Full Moon Day of Waso (with caching)
 *
 * @param watatInfo - Watat information
 * @param mmYear - Myanmar Year
 * @returns Waso full moon day information (Julian day and Gregorian date)
 */
export function waso(
  watatInfo: Omit<WatatInfo, 'nearestWatatInfo'>,
  mmYear: number
): WasoResult {
  // TEMPORARILY DISABLE CACHING FOR DEBUGGING
  // const cacheKey = `${mmYear}-${watatInfo.era}-${watatInfo.isWatatYear}`;
  // const cached = caches.waso.get(cacheKey);
  // if (cached) return cached;

  let w: number | undefined;
  let WO: number;

  // Determine WO based on year range
  switch (true) {
    case mmYear < 1100:
      WO = firstEra.WO1!;
      break;

    case mmYear >= 1100:
      WO = firstEra.WO2!;
      break;

    default:
      WO = 0;
  }

  // Calculate Julian day based on era
  switch (watatInfo.era) {
    case 1:
      if (watatInfo.isWatatYear) {
        w = Math.round(SY * mmYear + MO - watatInfo.ed + 4.5 * LM + WO);
      }
      break;

    case 2:
      WO = secondEra.WO!;
      if (watatInfo.isWatatYear) {
        w = Math.round(SY * mmYear + MO - watatInfo.ed + 4.5 * LM + WO);
      }
      break;

    case 3:
      WO = thirdEra.WO!;
      if (watatInfo.isWatatYear) {
        w = Math.round(SY * mmYear + MO - watatInfo.ed + 4.5 * LM + WO);
      }
      break;
  }

  // If w is undefined (not a watat year), return a default value
  if (w === undefined) {
    return {
      jd: 0,
      gd: '',
    };
  }

  // Apply full moon day exceptions (fme)
  const exceptions = getExceptions(mmYear);
  const fmeException = findException(mmYear, exceptions.fme);
  if (fmeException !== undefined) {
    w += fmeException;
  }

  const result: WasoResult = {
    jd: w, // Julian day
    gd: formatDate(julianToDate(w)), // Use optimized formatting
  };

  // TEMPORARILY DISABLE CACHING FOR DEBUGGING
  // caches.waso.set(cacheKey, result);

  return result;
}
