/**
 * BayDin - Myanmar Astrology Functions
 * Myanmar astrology, numerology, and zodiac calculations
 */
import type { ChineseZodiacResult, ZodiacResult } from '../types.js';
/**
 * Calculate Maharbote birth sign
 * ပုတိ ၊ ဘင်္ဂ ၊ မရဏ ၊ အထွန်း ၊ သိုက် ၊ ရာဇာ ၊ အဓိပတိ
 *
 * @param myanmarYear - Myanmar year number
 * @param weekday - Weekday number (1=Sunday, 2=Monday, ..., 7=Saturday)
 * @returns The birth sign in Burmese
 */
export declare function maharbote(myanmarYear: number, weekday: number): string;
/**
 * Calculate numerology number (digital root)
 * Reduces a number to a single digit by summing its digits repeatedly
 *
 * @param num - The number to reduce
 * @returns Single digit result (1-9)
 */
export declare function numerology(num: number): number;
/**
 * Format number to Burmese words
 * Converts a number to its Burmese word representation
 *
 * @param num - The number to format
 * @returns Burmese word representation
 */
export declare function numFormat(num: number): string;
/**
 * Get Chinese zodiac sign
 *
 * @param year - Gregorian year
 * @returns Object with English and Burmese zodiac signs
 */
export declare function chineseZodiac(year: number): ChineseZodiacResult;
/**
 * Get Western zodiac sign (O(1) lookup with optimized table)
 *
 * @param day - Day of month (1-31)
 * @param month - Month (1-12)
 * @returns Object with English and Burmese zodiac signs
 */
export declare function zodiac(day: number, month: number): ZodiacResult;
/**
 * Convert number to Burmese numerals
 *
 * @param num - Number to convert
 * @returns String with Burmese numerals
 */
export declare function toBurmeseNumerals(num: number): string;
/**
 * Convert Burmese numerals to regular number (optimized with cached map)
 *
 * @param str - String with Burmese numerals
 * @returns Regular number
 */
export declare function fromBurmeseNumerals(str: string): number;
//# sourceMappingURL=baydin.d.ts.map