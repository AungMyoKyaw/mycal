/**
 * Myanmar Year Calculation
 * Converts Gregorian date to Myanmar year
 */

import { dateToJulian } from '../utils/julian.js';
import { CONST } from '../constants.js';
import { localization } from '../localization.js';
import type { LocalizedString } from '../types.js';

const { SY, MO } = CONST;

/**
 * Calculate Myanmar year from Gregorian date
 *
 * @param gDate - Gregorian Date
 * @returns Myanmar year as localized string (English and Myanmar)
 */
export function myYear(gDate: Date): LocalizedString {
  const jd = Math.round(dateToJulian(gDate));
  const mmyear = Math.floor((jd - 0.5 - MO) / SY);
  return localization.number(mmyear);
}
