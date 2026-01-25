/**
 * Intercalary (Watat) Year Calculation
 * Determines if a year has an extra month (watat) and/or extra day
 */

import { CONST } from '../constants.js';
import type { WatatInfo } from '../types.js';

const { KALI_YUGA, LM, firstEra, secondEra, thirdEra, SY } = CONST;

/**
 * Check if a Myanmar year is a watat year (has intercalary month)
 *
 * @param mmYear - Myanmar Year
 * @returns Watat information including era, excess days, and watat status
 */
export function isWatatYear(mmYear: number): Omit<WatatInfo, 'nearestWatatInfo'> {
  let isWatatYear: boolean;
  let era: 1 | 2 | 3;
  let ed = (SY * (mmYear + KALI_YUGA)) % LM;

  switch (true) {
    case mmYear >= 1312: // Third era
      era = 3;
      if (ed < thirdEra.TA) {
        ed += LM;
      }
      isWatatYear = ed >= (thirdEra.TW || 0);
      break;

    case mmYear >= 1217 && mmYear <= 1311: // Second era
      era = 2;
      if (ed < secondEra.TA) {
        ed += LM;
      }
      isWatatYear = ed >= (secondEra.TW || 0);
      break;

    case mmYear <= 1216: // First era
      era = 1;
      if (ed < firstEra.TA) {
        ed += LM;
      }
      isWatatYear = [2, 5, 7, 10, 13, 15, 18].includes((mmYear * 7 + 2) % 19);
      break;

    default:
      era = 3;
      isWatatYear = false;
  }

  return {
    era,
    ed, // Number of excess days
    isWatatYear,
  };
}

/**
 * Find the nearest watat year before the given year
 *
 * @param mmYear - Myanmar Year
 * @returns Watat information for the nearest watat year
 */
export function nearestWatatYear(mmYear: number): WatatInfo & { year: number } {
  let isWatat = false;
  let watatInfo: Omit<WatatInfo, 'nearestWatatInfo'>;
  mmYear--;

  do {
    watatInfo = isWatatYear(mmYear);
    isWatat = watatInfo.isWatatYear;
    if (!isWatat) {
      mmYear--;
    }
  } while (!isWatat);

  return { ...watatInfo, year: mmYear };
}

/**
 * Get watat information including nearest watat year
 *
 * @param mmYear - Myanmar Year
 * @returns Complete watat information including nearest watat year
 */
export function watat(mmYear: number): WatatInfo {
  const watatInfo = isWatatYear(mmYear);
  const nearestWatatInfo = nearestWatatYear(mmYear);
  return { ...watatInfo, nearestWatatInfo };
}
