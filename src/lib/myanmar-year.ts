import julian from '../utils/julian';
import { SY, MO } from './constants';
import { number } from './localization';
import type { MyanmarNumberResult } from '../utils/myanmar-number';

/**
 * Calculate Myanmar Year from Gregorian Date
 * 
 * @param gDate Gregorian Date
 * @returns Myanmar Year in both English and Myanmar numerals
 */
export function getMyanmarYear(gDate: Date): MyanmarNumberResult {
  const jd = Math.round(julian(gDate));
  const mmyear = Math.floor((jd - 0.5 - MO) / SY);
  return number(mmyear);
}