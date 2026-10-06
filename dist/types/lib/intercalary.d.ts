/**
 * Intercalary (Watat) Year Calculation
 * Determines if a year has an extra month (watat) and/or extra day
 */
import type { WatatInfo } from '../types.js';
/**
 * Check if a Myanmar year is a watat year (has intercalary month)
 *
 * @param mmYear - Myanmar Year
 * @returns Watat information including era, excess days, and watat status
 */
export declare function isWatatYear(mmYear: number): Omit<WatatInfo, 'nearestWatatInfo'>;
/**
 * Find the nearest watat year before the given year (with caching)
 *
 * @param mmYear - Myanmar Year
 * @returns Watat information for the nearest watat year
 */
export declare function nearestWatatYear(mmYear: number): WatatInfo & {
    year: number;
};
/**
 * Get watat information including nearest watat year (with caching)
 *
 * @param mmYear - Myanmar Year
 * @returns Complete watat information including nearest watat year
 */
export declare function watat(mmYear: number): WatatInfo;
//# sourceMappingURL=intercalary.d.ts.map