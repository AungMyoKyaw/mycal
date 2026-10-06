/**
 * Myanmar Calendar Constants
 * Mathematical constants for Myanmar calendar calculations
 */
import type { CalendarConstants } from './types.js';
/**
 * Get exception table for a given Myanmar year
 */
export declare function getExceptions(my: number): {
    begin: number;
    end: number;
    fme: [number, number][];
    wte: [number, number][];
};
/**
 * Find exception value for a given year in an exception table
 * @param year - Myanmar year to lookup
 * @param table - Exception table (fme or wte)
 * @returns Exception value if found, undefined otherwise
 */
export declare function findException(year: number, table: [number, number][]): number | undefined;
/**
 * Calendar constants for Myanmar calendar calculations
 */
export declare const CONST: CalendarConstants;
export declare const SY: number, MO: number, SE3: number, LM: number, KALI_YUGA: number, thirdEra: import("./types.js").EraConstants, secondEra: import("./types.js").EraConstants, firstEra: import("./types.js").EraConstants;
//# sourceMappingURL=constants.d.ts.map