/**
 * Myanmar Numeral Conversion Utilities
 * Native TypeScript implementation - no external dependencies
 */

/**
 * Myanmar digit characters
 */
const MYANMAR_DIGITS = ['၀', '၁', '၂', '၃', '၄', '၅', '၆', '၇', '၈', '၉'] as const;

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
export function toMyanmarNumber(num: number | string): string {
  return String(num)
    .split('')
    .map((d) => {
      const digit = parseInt(d, 10);
      if (!isNaN(digit) && digit >= 0 && digit <= 9) {
        return MYANMAR_DIGITS[digit];
      }
      return d; // Keep non-digit characters as-is
    })
    .join('');
}

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
export function localizeNumber(num: number | string): LocalizedNumber {
  const numStr = String(num);
  return {
    en: numStr,
    my: toMyanmarNumber(numStr),
  };
}
