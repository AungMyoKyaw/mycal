/**
 * Buddhist Era Year Calculation
 * Converts Myanmar year to Buddhist Era year
 */

import { localization } from '../localization.js';
import type { LocalizedString } from '../types.js';

/**
 * Calculate Buddhist Era year from Myanmar year
 *
 * @param mmYear - Myanmar Year
 * @returns Buddhist Era year as localized string (English and Myanmar)
 */
export function buddhistEraYear(mmYear: number): LocalizedString {
  return localization.number(mmYear + 1182);
}
