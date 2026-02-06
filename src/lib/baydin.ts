/**
 * BayDin - Myanmar Astrology Functions
 * Myanmar astrology, numerology, and zodiac calculations
 */

import type { ChineseZodiacResult, ZodiacResult } from '../types.js';

/**
 * Burmese numerals for number formatting
 */
const BURMESE_NUMERALS = [
  '၀',
  '၁',
  '၂',
  '၃',
  '၄',
  '၅',
  '၆',
  '၇',
  '၈',
  '၉',
] as const;

/**
 * Pre-computed reversed map for Burmese numeral conversion (cached)
 */
const REVERSED_NUMERAL_MAP: Readonly<Record<string, number>> = Object.freeze(
  BURMESE_NUMERALS.reduce(
    (map, numeral, index) => ({ ...map, [numeral]: index }),
    {} as Record<string, number>
  )
);

/**
 * Burmese number words
 */
const BURMESE_WORDS = [
  'သုည',
  'တစ်',
  'နှစ်',
  'သုံး',
  'လေး',
  'ငါး',
  'ခြောက်',
  'ခုနှစ်',
  'ရှစ်',
  'ကိုး',
];

/**
 * Burmese place values (reversed)
 */
const PLACE_VALUES = [
  'ကုဋေ',
  'သန်း',
  'သိန်း',
  'သောင်း',
  'ထောင်',
  'ရာ',
  'ဆယ်',
  '',
];

/**
 * Maharbote birth signs
 */
const MAHARBOTE_SIGNS = [
  'ဘင်္ဂ',
  'မရဏ',
  'အထွန်း',
  'သိုက်',
  'ရာဇာ',
  'ပုတိ',
  'အဓိပတိ',
];

/**
 * Chinese zodiac signs
 */
const CHINESE_ZODIAC_EN = [
  'Rat',
  'Ox',
  'Tiger',
  'Rabbit',
  'Dragon',
  'Snake',
  'Horse',
  'Goat',
  'Monkey',
  'Rooster',
  'Dog',
  'Pig',
];
const CHINESE_ZODIAC_MY = [
  'ကြွက်',
  'နွား',
  'ကျား',
  'ယုန်',
  'နဂါး',
  'မြွေ',
  'မြင်း',
  'ဆိတ်',
  'မြောက်',
  'ကြက်',
  'ခွေး',
  'ဝက်',
];

/**
 * Zodiac lookup table by month for O(1) access
 * Index 0 = unused, Index 1 = January, etc.
 * Each month has two possible zodiac signs with cutoff days
 */
const ZODIAC_LOOKUP: readonly ({
  early: Readonly<{ sign: string; sign_mm: string; cutoffDay: number }>;
  late: Readonly<{ sign: string; sign_mm: string }>;
} | null)[] = Object.freeze([
  null, // 0 - unused
  Object.freeze({
    // January
    early: { sign: 'Capricorn', sign_mm: 'မကာရ', cutoffDay: 19 },
    late: { sign: 'Aquarius', sign_mm: 'ကုံ' },
  }),
  Object.freeze({
    // February
    early: { sign: 'Aquarius', sign_mm: 'ကုံ', cutoffDay: 18 },
    late: { sign: 'Pisces', sign_mm: 'မိန်' },
  }),
  Object.freeze({
    // March
    early: { sign: 'Pisces', sign_mm: 'မိန်', cutoffDay: 20 },
    late: { sign: 'Aries', sign_mm: 'မိဿ' },
  }),
  Object.freeze({
    // April
    early: { sign: 'Aries', sign_mm: 'မိဿ', cutoffDay: 19 },
    late: { sign: 'Taurus', sign_mm: 'ပြိဿ' },
  }),
  Object.freeze({
    // May
    early: { sign: 'Taurus', sign_mm: 'ပြိဿ', cutoffDay: 20 },
    late: { sign: 'Gemini', sign_mm: 'မေထုန်' },
  }),
  Object.freeze({
    // June
    early: { sign: 'Gemini', sign_mm: 'မေထုန်', cutoffDay: 20 },
    late: { sign: 'Cancer', sign_mm: 'ကရကဋ်' },
  }),
  Object.freeze({
    // July
    early: { sign: 'Cancer', sign_mm: 'ကရကဋ်', cutoffDay: 22 },
    late: { sign: 'Leo', sign_mm: 'သိဟ်' },
  }),
  Object.freeze({
    // August
    early: { sign: 'Leo', sign_mm: 'သိဟ်', cutoffDay: 22 },
    late: { sign: 'Virgo', sign_mm: 'ကန်' },
  }),
  Object.freeze({
    // September
    early: { sign: 'Virgo', sign_mm: 'ကန်', cutoffDay: 22 },
    late: { sign: 'Libra', sign_mm: 'တူ' },
  }),
  Object.freeze({
    // October
    early: { sign: 'Libra', sign_mm: 'တူ', cutoffDay: 22 },
    late: { sign: 'Scorpio', sign_mm: 'ဗြိစ္ဆာ' },
  }),
  Object.freeze({
    // November
    early: { sign: 'Scorpio', sign_mm: 'ဗြိစ္ဆာ', cutoffDay: 21 },
    late: { sign: 'Sagittarius', sign_mm: 'ဓနု' },
  }),
  Object.freeze({
    // December
    early: { sign: 'Sagittarius', sign_mm: 'ဓနု', cutoffDay: 21 },
    late: { sign: 'Capricorn', sign_mm: 'မကာရ' },
  }),
]);

/**
 * Calculate Maharbote birth sign
 * ပုတိ ၊ ဘင်္ဂ ၊ မရဏ ၊ အထွန်း ၊ သိုက် ၊ ရာဇာ ၊ အဓိပတိ
 *
 * @param myanmarYear - Myanmar year number
 * @param weekday - Weekday number (1=Sunday, 2=Monday, ..., 7=Saturday)
 * @returns The birth sign in Burmese
 */
export function maharbote(myanmarYear: number, weekday: number): string {
  const yearRemainder = myanmarYear % 7 || 7;
  const sequence: number[] = [yearRemainder];

  for (let i = 0; i < 6; i++) {
    let next = sequence[i] + 3;
    if (next > 7) {
      next -= 7;
    }
    sequence.push(next);
  }

  const signIndex = sequence.indexOf(weekday);
  return MAHARBOTE_SIGNS[signIndex] || MAHARBOTE_SIGNS[0];
}

/**
 * Calculate numerology number (digital root)
 * Reduces a number to a single digit by summing its digits repeatedly
 *
 * @param num - The number to reduce
 * @returns Single digit result (1-9)
 */
export function numerology(num: number): number {
  const sumDigits = (n: number): number => {
    return n
      .toString()
      .split('')
      .reduce((acc, digit) => acc + parseInt(digit, 10), 0);
  };

  let result = sumDigits(num);
  while (result > 9) {
    result = sumDigits(result);
  }

  return result;
}

/**
 * Format number to Burmese words
 * Converts a number to its Burmese word representation
 *
 * @param num - The number to format
 * @returns Burmese word representation
 */
export function numFormat(num: number): string {
  const numStr = num.toString();
  const length = numStr.length;

  // Handle numbers > 7 digits (koti)
  if (length > 7) {
    const kotiPart = numStr.slice(0, length - 7);
    const remainderPart = numStr.slice(length - 7);

    if (kotiPart.length >= 8) {
      return num.toString();
    }

    return (
      formatPart(parseInt(kotiPart, 10)) +
      PLACE_VALUES[0] +
      formatPart(parseInt(remainderPart, 10))
    );
  }

  return formatPart(num);
}

/**
 * Helper function to format a part of the number
 */
function formatPart(num: number): string {
  const numStr = num.toString();
  const length = numStr.length;
  let result = '';

  if (!length) return result;

  numStr.split('').forEach((digit, index) => {
    const digitValue = parseInt(digit, 10);
    if (digitValue !== 0) {
      const placeIndex = 8 + index - length;
      result += BURMESE_WORDS[digitValue] + PLACE_VALUES[placeIndex];
    }
  });

  return result;
}

/**
 * Get Chinese zodiac sign
 *
 * @param year - Gregorian year
 * @returns Object with English and Burmese zodiac signs
 */
export function chineseZodiac(year: number): ChineseZodiacResult {
  if (typeof year !== 'number' || !Number.isInteger(year) || year <= 0) {
    throw new Error('Please provide a valid year as a positive integer.');
  }

  const index = (year - 4) % 12;
  return {
    sign: CHINESE_ZODIAC_EN[index],
    signInBurmese: CHINESE_ZODIAC_MY[index],
  };
}

/**
 * Get Western zodiac sign (O(1) lookup with optimized table)
 *
 * @param day - Day of month (1-31)
 * @param month - Month (1-12)
 * @returns Object with English and Burmese zodiac signs
 */
export function zodiac(day: number, month: number): ZodiacResult {
  if (
    typeof day !== 'number' ||
    typeof month !== 'number' ||
    day < 1 ||
    day > 31 ||
    month < 1 ||
    month > 12
  ) {
    throw new Error('Invalid date or month input');
  }

  const monthData = ZODIAC_LOOKUP[month];
  if (!monthData) {
    throw new Error('Could not determine zodiac sign');
  }

  // O(1) lookup - just compare day to cutoff
  if (day <= monthData.early.cutoffDay) {
    return {
      sign: monthData.early.sign,
      sign_mm: monthData.early.sign_mm,
    };
  }

  return {
    sign: monthData.late.sign,
    sign_mm: monthData.late.sign_mm,
  };
}

/**
 * Convert number to Burmese numerals
 *
 * @param num - Number to convert
 * @returns String with Burmese numerals
 */
export function toBurmeseNumerals(num: number): string {
  return num
    .toString()
    .split('')
    .map(digit => BURMESE_NUMERALS[parseInt(digit, 10)] || digit)
    .join('');
}

/**
 * Convert Burmese numerals to regular number (optimized with cached map)
 *
 * @param str - String with Burmese numerals
 * @returns Regular number
 */
export function fromBurmeseNumerals(str: string): number {
  const result = str
    .split('')
    .map(char => REVERSED_NUMERAL_MAP[char] ?? char)
    .join('');

  return parseInt(result, 10) || 0;
}
