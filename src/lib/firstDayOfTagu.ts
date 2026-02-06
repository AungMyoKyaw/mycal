/**
 * First Day of Tagu Calculation
 * Calculates the first day of Tagu (Myanmar New Year)
 */

import { julianToDate } from '../utils/julian.js';
import { caches } from '../utils/cache.js';
import type { FirstDayOfTaguResult } from '../types.js';

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
 * Calculate First Day of Tagu (Myanmar New Year) (with caching)
 *
 * @param w1 - Julian Day Number of Nearest Waso
 * @param yd - Difference between Current Year and Nearest Watat Year
 * @returns First day of Tagu information (Julian day and Gregorian date)
 */
export function firstDayOfTagu(w1: number, yd: number): FirstDayOfTaguResult {
  // Check cache first
  const cacheKey = `${w1}-${yd}`;
  const cached = caches.firstDayOfTagu.get(cacheKey);
  if (cached) return cached;

  const tg1 = w1 + 354 * yd - 102;
  const result: FirstDayOfTaguResult = {
    jd: tg1, // Julian day
    gd: formatDate(julianToDate(tg1)), // Use optimized formatting
  };

  // Cache the result
  caches.firstDayOfTagu.set(cacheKey, result);

  return result;
}
