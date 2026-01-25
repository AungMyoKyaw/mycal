/**
 * Myanmar Weekday Calculation
 * Determines the Myanmar weekday from a Gregorian date
 */

import { weekday } from '../localization.js';
import type { LocalizedString } from '../types.js';

/**
 * Get Myanmar weekday from Gregorian date
 *
 * @param gDate - Gregorian Date
 * @returns Myanmar weekday as localized string (English and Myanmar)
 */
export function myWeekday(gDate: Date): LocalizedString {
  return weekday[gDate.getDay()];
}
