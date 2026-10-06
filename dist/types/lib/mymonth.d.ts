/**
 * Myanmar Month Calculation
 * Determines the Myanmar month from a Gregorian date
 */
import type { MyanmarMonthResult } from '../types.js';
/**
 * Calculate Myanmar month from Gregorian date
 *
 * @param gDate - Gregorian Date
 * @param tg1 - First Day of Tagu by Julian Day Number
 * @param c - Is Watat Year (0 = watat, 1 = common year)
 * @param b - Is Big Watat Year (0 = small, 1 = big)
 * @returns Myanmar month information
 */
export declare function myMonth(gDate: Date, tg1: number, c: number, b: number): MyanmarMonthResult;
//# sourceMappingURL=mymonth.d.ts.map