/**
 * First Day of Tagu Calculation
 * Calculates the first day of Tagu (Myanmar New Year)
 */

import { julianToDate } from '../utils/julian.js';
import type { FirstDayOfTaguResult } from '../types.js';

/**
 * Calculate First Day of Tagu (Myanmar New Year)
 *
 * @param w1 - Julian Day Number of Nearest Waso
 * @param yd - Difference between Current Year and Nearest Watat Year
 * @returns First day of Tagu information (Julian day and Gregorian date)
 */
export function firstDayOfTagu(w1: number, yd: number): FirstDayOfTaguResult {
  const tg1 = w1 + 354 * yd - 102;
  return {
    jd: tg1, // Julian day
    gd: julianToDate(tg1).toLocaleDateString('en-US'), // Gregorian day
  };
}
