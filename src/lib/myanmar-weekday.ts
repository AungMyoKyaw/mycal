import { weekday } from './localization';
import type { LocalizedText } from './localization';

/**
 * Get Myanmar weekday for a given date
 * 
 * @param gDate Gregorian Date
 * @returns Myanmar weekday information
 */
export function getMyanmarWeekday(gDate: Date): LocalizedText {
  const dayOfWeek = gDate.getDay(); // 0 = Sunday, 1 = Monday, etc.
  return weekday[dayOfWeek];
}