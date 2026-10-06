/**
 * Myanmar Numeral Conversion Utilities
 * Native TypeScript implementation - no external dependencies
 */
/**
 * Convert a number to Myanmar numerals
 *
 * @param num - Number to convert (can be number or string)
 * @returns String with Myanmar numerals
 *
 * @example
 * ```ts
 * toMyanmarNumber(123) // returns "၁၂၃"
 * toMyanmarNumber("2024") // returns "၂၀၂၄"
 * ```
 */
export declare function toMyanmarNumber(num: number | string): string;
/**
 * Localized number (English and Myanmar)
 */
export interface LocalizedNumber {
    en: string;
    my: string;
}
/**
 * Convert a number to localized format (both English and Myanmar)
 *
 * @param num - Number to convert
 * @returns Object with both English and Myanmar numeral strings
 *
 * @example
 * ```ts
 * localizeNumber(1361)
 * // returns { en: "1361", my: "၁၃၆၁" }
 * ```
 */
export declare function localizeNumber(num: number | string): LocalizedNumber;
//# sourceMappingURL=numerals.d.ts.map