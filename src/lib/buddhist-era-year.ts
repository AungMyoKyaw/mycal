import { number } from './localization';
import type { MyanmarNumberResult } from '../utils/myanmar-number';

/**
 * Calculate Buddhist Era Year from Myanmar Year
 * 
 * @param mmYear Myanmar Year (as number)
 * @returns Buddhist Era Year in both English and Myanmar numerals
 */
export function getBuddhistEraYear(mmYear: number): MyanmarNumberResult {
  const buddhistYear = mmYear + 1182;
  return number(buddhistYear);
}