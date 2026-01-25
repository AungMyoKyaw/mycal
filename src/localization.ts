/**
 * Myanmar Calendar Localization
 * Myanmar month names, weekdays, moon phases, and number conversion
 */

import type { LocalizationData } from './types.js';
import { localizeNumber } from './utils/numerals.js';

/**
 * Myanmar month names
 * Note: Index 3 (Waso) has three variants: Waso, First Waso, Second Waso
 */
const monthData: Array<{ en: string; my: string } | { en: string; my: string }[]> = [
  { en: 'Tagu', my: 'တန်ခူး' },
  { en: 'Kason', my: 'ကဆုန်' },
  { en: 'Nayon', my: 'နယုန်' },
  [
    { en: 'Waso', my: 'ဝါဆို' },
    { en: 'First Waso', my: 'ပဝါဆို' },
    { en: 'Second Waso', my: 'ဒုဝါဆို' },
  ],
  { en: 'Wagaung', my: 'ဝါခေါင်' },
  { en: 'Tawthalin', my: 'တော်သလင်း' },
  { en: 'Thadingyut', my: 'သီတင်းကျွတ်' },
  { en: 'Tazaungmon', my: 'တန်ဆောင်မုန်း' },
  { en: 'Nadaw', my: 'နတ်တော်' },
  { en: 'Pyatho', my: 'ပြာသို' },
  { en: 'Tabodwe', my: 'တပို့တွဲ' },
  { en: 'Tabaung', my: 'တပေါင်း' },
];

/**
 * Moon phase names
 */
const moonData = [
  { en: 'Waxing', my: 'လဆန်း' },
  { en: 'Full Moon', my: 'လပြည့်' },
  { en: 'Waning', my: 'လပြည့်ကျော်' },
  { en: 'New Moon', my: 'လကွယ်' },
];

/**
 * Weekday names
 */
const weekdayData = [
  { en: 'Sunday', my: 'တနင်္ဂနွေ' },
  { en: 'Monday', my: 'တနင်္လာ' },
  { en: 'Tuesday', my: 'အင်္ဂါ' },
  { en: 'Wednesday', my: 'ဗုဒ္ဓဟူး' },
  { en: 'Thursday', my: 'ကြာသပတေး' },
  { en: 'Friday', my: 'သောကြာ' },
  { en: 'Saturday', my: 'စနေ' },
];

/**
 * Localization data
 */
export const localization: LocalizationData = {
  month: monthData,
  moon: moonData,
  number: localizeNumber,
  weekday: weekdayData,
};

// Re-export for convenience
export const { month, moon, weekday } = localization;
