/**
 * Intercalary (Watat) Year Calculation
 * Determines if a year has an extra month (watat) and/or extra day
 */

import { CONST, findException, getExceptions } from '../constants.js';
import { caches } from '../utils/cache.js';
import type { WatatInfo } from '../types.js';

const { KALI_YUGA, LM, firstEra, secondEra, thirdEra, SY } = CONST;

// Cache for nearest watat year lookups to avoid repeated loops
const nearestWatatCache = new Map<number, number>();

/**
 * Mathematical modulo that always returns positive result
 * JavaScript's % operator returns negative for negative dividends
 */
function mod(n: number, m: number): number {
  return ((n % m) + m) % m;
}

/**
 * Check if a Myanmar year is a watat year (has intercalary month)
 *
 * @param mmYear - Myanmar Year
 * @returns Watat information including era, excess days, and watat status
 */
export function isWatatYear(
  mmYear: number
): Omit<WatatInfo, 'nearestWatatInfo'> {
  let isWatatYear: boolean;
  let era: 1 | 2 | 3;
  let ed = mod(SY * (mmYear + KALI_YUGA), LM);

  switch (true) {
    case mmYear >= 1312: // Third era
      era = 3;
      if (ed < thirdEra.TA) {
        ed += LM;
      }
      isWatatYear = ed >= (thirdEra.TW ?? 0);
      break;

    case mmYear >= 1217 && mmYear <= 1311: // Second era
      era = 2;
      if (ed < secondEra.TA) {
        ed += LM;
      }
      isWatatYear = ed >= (secondEra.TW ?? 0);
      break;

    case mmYear <= 1216: // First era
      era = 1;
      if (ed < firstEra.TA) {
        ed += LM;
      }
      // Use proper modulo for Metonic cycle calculation to handle negative years
      isWatatYear = [2, 5, 7, 10, 13, 15, 18].includes(mod(mmYear * 7 + 2, 19));
      break;

    default:
      era = 3;
      isWatatYear = false;
  }

  // Apply watat year exceptions (wte)
  const exceptions = getExceptions(mmYear);
  const watatException = findException(mmYear, exceptions.wte);
  if (watatException !== undefined) {
    isWatatYear = watatException === 1;
  }

  return {
    era,
    ed, // Number of excess days
    isWatatYear,
  };
}

/**
 * Find the nearest watat year before the given year (with caching)
 *
 * @param mmYear - Myanmar Year
 * @returns Watat information for the nearest watat year
 */
export function nearestWatatYear(mmYear: number): WatatInfo & { year: number } {
  // Check cache first
  if (nearestWatatCache.has(mmYear)) {
    const cachedYear = nearestWatatCache.get(mmYear)!;
    return { ...isWatatYear(cachedYear), year: cachedYear };
  }

  let isWatat = false;
  let watatInfo: Omit<WatatInfo, 'nearestWatatInfo'>;
  mmYear--;

  const MIN_YEAR = 0; // Myanmar calendar starts at ME 0 (year 0 IS a watat year)

  do {
    // Check cache while iterating
    if (nearestWatatCache.has(mmYear)) {
      const cachedYear = nearestWatatCache.get(mmYear)!;
      nearestWatatCache.set(mmYear + 1, cachedYear);
      return { ...isWatatYear(cachedYear), year: cachedYear };
    }

    // Prevent infinite loop by clamping to minimum year
    if (mmYear < MIN_YEAR) {
      mmYear = MIN_YEAR;
    }

    watatInfo = isWatatYear(mmYear);
    isWatat = watatInfo.isWatatYear;

    if (!isWatat) {
      mmYear--;
    }
  } while (!isWatat);

  // Cache the result for this and nearby years
  nearestWatatCache.set(mmYear + 1, mmYear);

  return { ...watatInfo, year: mmYear };
}

/**
 * Get watat information including nearest watat year (with caching)
 *
 * @param mmYear - Myanmar Year
 * @returns Complete watat information including nearest watat year
 */
export function watat(mmYear: number): WatatInfo {
  // Check cache first
  const cached = caches.watat.get(mmYear);
  if (cached) return cached;

  const watatInfo = isWatatYear(mmYear);
  const nearestWatatInfo = nearestWatatYear(mmYear);
  const result = { ...watatInfo, nearestWatatInfo };

  // Cache the result
  caches.watat.set(mmYear, result);

  return result;
}
