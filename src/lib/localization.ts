import { MyanmarNumber, numberToLocalized, type MyanmarNumberResult } from '../utils/myanmar-number';

export interface LocalizedText {
  en: string;
  my: string;
}

export type { MyanmarNumberResult };

export interface LocalizedWaso extends LocalizedText {
  // For special case of Waso which can have multiple forms
}

export const month: (LocalizedText | LocalizedWaso[])[] = [
  {
    en: 'Tagu',
    my: 'တန်ခူး'
  },
  {
    en: 'Kason',
    my: 'ကဆုန်'
  },
  {
    en: 'Nayon',
    my: 'နယုန်'
  },
  [
    { en: 'Waso', my: 'ဝါဆို' },
    { en: 'First Waso', my: 'ပဝါဆို' },
    { en: 'Second Waso', my: 'ဒုဝါဆို' }
  ],
  {
    en: 'Wagaung',
    my: 'ဝါခေါင်'
  },
  {
    en: 'Tawthalin',
    my: 'တော်သလင်း'
  },
  {
    en: 'Thadingyut',
    my: 'သီတင်းကျွတ်'
  },
  {
    en: 'Tazaungmon',
    my: 'တန်ဆောင်မုန်း'
  },
  {
    en: 'Nadaw',
    my: 'နတ်တော်'
  },
  {
    en: 'Pyatho',
    my: 'ပြာသို'
  },
  {
    en: 'Tabodwe',
    my: 'တပို့တွဲ'
  },
  {
    en: 'Tabaung',
    my: 'တပေါင်း'
  }
];

export const moon: LocalizedText[] = [
  { en: 'Waxing', my: 'လဆန်း' },
  { en: 'Full Moon', my: 'လပြည့်' },
  { en: 'Waning', my: 'လပြည့်ကျော်' },
  { en: 'New Moon', my: 'လကွယ်' }
];

export const number = (num: number): MyanmarNumberResult => {
  return numberToLocalized(num);
};

export const weekday: LocalizedText[] = [
  {
    en: 'Sunday',
    my: 'တနင်္ဂနွေ'
  },
  {
    en: 'Monday',
    my: 'တနင်္လာ'
  },
  {
    en: 'Tuesday',
    my: 'အင်္ဂါ'
  },
  {
    en: 'Wednesday',
    my: 'ဗုဒ္ဓဟူး'
  },
  {
    en: 'Thursday',
    my: 'ကြာသပတေး'
  },
  {
    en: 'Friday',
    my: 'သောကြာ'
  },
  {
    en: 'Saturday',
    my: 'စနေ'
  }
];