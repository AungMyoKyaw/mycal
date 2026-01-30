/**
 * BayDin - Myanmar Astrology Functions
 * Myanmar astrology, numerology, and zodiac calculations
 */

import type { ChineseZodiacResult, ZodiacResult } from '../types.js';

/**
 * Burmese numerals for number formatting
 */
const BURMESE_NUMERALS = ['၀', '၁', '၂', '၃', '၄', '၅', '၆', '၇', '၈', '၉'];

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
 * Western zodiac signs with date ranges
 */
const ZODIAC_SIGNS: {
  sign: string;
  sign_mm: string;
  start: { month: number; day: number };
  end: { month: number; day: number };
}[] = [
  {
    sign: 'Capricorn',
    sign_mm: 'မကာရ',
    start: { month: 1, day: 1 },
    end: { month: 1, day: 19 },
  },
  {
    sign: 'Aquarius',
    sign_mm: 'ကုံ',
    start: { month: 1, day: 20 },
    end: { month: 2, day: 18 },
  },
  {
    sign: 'Pisces',
    sign_mm: 'မိန်',
    start: { month: 2, day: 19 },
    end: { month: 3, day: 20 },
  },
  {
    sign: 'Aries',
    sign_mm: 'မိဿ',
    start: { month: 3, day: 21 },
    end: { month: 4, day: 19 },
  },
  {
    sign: 'Taurus',
    sign_mm: 'ပြိဿ',
    start: { month: 4, day: 20 },
    end: { month: 5, day: 20 },
  },
  {
    sign: 'Gemini',
    sign_mm: 'မေထုန်',
    start: { month: 5, day: 21 },
    end: { month: 6, day: 20 },
  },
  {
    sign: 'Cancer',
    sign_mm: 'ကရကဋ်',
    start: { month: 6, day: 21 },
    end: { month: 7, day: 22 },
  },
  {
    sign: 'Leo',
    sign_mm: 'သိဟ်',
    start: { month: 7, day: 23 },
    end: { month: 8, day: 22 },
  },
  {
    sign: 'Virgo',
    sign_mm: 'ကန်',
    start: { month: 8, day: 23 },
    end: { month: 9, day: 22 },
  },
  {
    sign: 'Libra',
    sign_mm: 'တူ',
    start: { month: 9, day: 23 },
    end: { month: 10, day: 22 },
  },
  {
    sign: 'Scorpio',
    sign_mm: 'ဗြိစ္ဆာ',
    start: { month: 10, day: 23 },
    end: { month: 11, day: 21 },
  },
  {
    sign: 'Sagittarius',
    sign_mm: 'ဓနု',
    start: { month: 11, day: 22 },
    end: { month: 12, day: 21 },
  },
  {
    sign: 'Capricorn',
    sign_mm: 'မကာရ',
    start: { month: 12, day: 22 },
    end: { month: 12, day: 31 },
  },
];

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
 * Get Western zodiac sign
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

  for (const z of ZODIAC_SIGNS) {
    if (
      (month === z.start.month && day >= z.start.day) ||
      (month === z.end.month && day <= z.end.day)
    ) {
      return {
        sign: z.sign,
        sign_mm: z.sign_mm,
      };
    }
  }

  throw new Error('Could not determine zodiac sign');
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
 * Convert Burmese numerals to regular number
 *
 * @param str - String with Burmese numerals
 * @returns Regular number
 */
export function fromBurmeseNumerals(str: string): number {
  const reversedMap: Record<string, number> = {};
  BURMESE_NUMERALS.forEach((num, index) => {
    reversedMap[num] = index;
  });

  const result = str
    .split('')
    .map(char => reversedMap[char] ?? char)
    .join('');

  return parseInt(result, 10) || 0;
}
