/**
 * Julian Date Conversion Utilities
 * Native TypeScript implementation - no external dependencies
 */
/**
 * Convert Gregorian date to Julian Day Number
 * Based on the standard algorithm for Julian date conversion
 *
 * @param year - Gregorian year
 * @param month - Gregorian month (1-12)
 * @param day - Gregorian day
 * @returns Julian Day Number
 */
export declare function gregorianToJulian(year: number, month: number, day: number): number;
/**
 * Convert Julian Day Number to Gregorian date
 * Based on the standard algorithm for Julian date conversion
 *
 * @param jd - Julian Day Number
 * @returns Object containing year, month, day
 */
export declare function julianToGregorian(jd: number): {
    year: number;
    month: number;
    day: number;
};
/**
 * Convert a JavaScript Date object to Julian Day Number
 *
 * @param date - JavaScript Date object
 * @returns Julian Day Number
 */
export declare function dateToJulian(date: Date): number;
/**
 * Convert Julian Day Number to JavaScript Date object
 * Preserves fractional time from Julian Day Number
 *
 * @param jd - Julian Day Number (can include fractional days for precise time)
 * @returns JavaScript Date object
 */
export declare function julianToDate(jd: number): Date;
/**
 * Get Julian Day Number as a rounded integer
 *
 * @param date - JavaScript Date object
 * @returns Rounded Julian Day Number
 */
export declare function julian(date: Date): number;
//# sourceMappingURL=julian.d.ts.map