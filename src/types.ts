/**
 * Myanmar Calendar Type Definitions
 * Zero dependency Myanmar calendar library
 */

/**
 * Moon phase types
 */
export type MoonPhase = 'waxing' | 'full' | 'waning' | 'new';

/**
 * Month type - late month (hma) or early month (hgu)
 */
export type MonthType = 'hma' | 'hgu';

/**
 * Myanmar month index (0-12, where 0 = First Waso, 1 = Tagu, etc.)
 */
export type MyanmarMonth = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

/**
 * Localized string (English and Myanmar)
 */
export interface LocalizedString {
  en: string;
  my: string;
}

/**
 * Myanmar date components
 */
export interface MyanmarDate {
  year: number; // Myanmar year
  month: MyanmarMonth; // Myanmar month (0=First Waso, 1=Tagu, etc.)
  monthType: MonthType; // Late or early month
  fortnightDay: number; // Day in fortnight (1-15)
  moonPhase: MoonPhase; // Current moon phase
  weekday: number; // Weekday (0-6)
}

/**
 * Thingyan (Water Festival) result
 */
export interface ThingyanResult {
  akyo: string; // Akya day before
  akya: string; // Akya day
  akyat: string[]; // Akyat days (between akya and atat)
  atat: string; // Atat day
  new_year_day: string; // New Year day
  akyaTime: string; // Akya time (ISO format)
  atatTime: string; // Atat time (ISO format)
}

/**
 * Watat (Intercary/Leap Year) information
 */
export interface WatatInfo {
  era: 1 | 2 | 3; // Era (1, 2, or 3)
  ed: number; // Number of excess days
  isWatatYear: boolean; // Whether it's a watat year
  nearestWatatInfo?: WatatInfo & { year: number }; // Nearest watat year info
}

/**
 * Watat year result
 */
export interface WatatYearResult {
  watat: boolean; // Is watat year (has extra month)
  isBigWatat: boolean; // Is big watat year (has extra day)
}

/**
 * Waso (Full Moon Day of Waso) result
 */
export interface WasoResult {
  jd: number; // Julian day
  gd: string; // Gregorian date (localized string)
}

/**
 * First Day of Tagu result
 */
export interface FirstDayOfTaguResult {
  jd: number; // Julian day
  gd: string; // Gregorian date (localized string)
}

/**
 * Myanmar month calculation result
 */
export interface MyanmarMonthResult {
  mm: LocalizedString; // Myanmar month name
  mml: number; // Length of myanmar month
  md: number; // Myanmar day
}

/**
 * Myanmar day (fortnight day + moon phase) result
 */
export interface MyanmarDayResult {
  fd: LocalizedString; // Fortnight day
  mp: LocalizedString; // Moon phase
}

/**
 * Era constants
 */
export interface EraConstants {
  TA: number; // The number of excess days for 4 months
  TW?: number; // Threshold for watat calculation (not used in first era)
  WO?: number; // Offset for watat calculation (second and third eras)
  WO1?: number; // Offset 1 for first era (< 1100)
  WO2?: number; // Offset 2 for first era (>= 1100)
}

/**
 * Calendar constants
 */
export interface CalendarConstants {
  SY: number; // Solar year
  MO: number; // Myanmar year zero
  SE3: number; // Beginning of 3rd Era
  LM: number; // Lunar month
  KALI_YUGA: number; // Kali Yuga
  thirdEra: EraConstants;
  secondEra: EraConstants;
  firstEra: EraConstants;
}

/**
 * Localization data
 */
export interface LocalizationData {
  month: Array<LocalizedString | LocalizedString[]>;
  moon: LocalizedString[];
  number: (num: number) => LocalizedString;
  weekday: LocalizedString[];
}

/**
 * Options for Mycal constructor
 */
export interface MycalOptions {
  language?: 'en' | 'mm'; // Language preference
}

/**
 * Main Mycal class interface
 */
export interface IMycal {
  readonly year: LocalizedString;
  readonly month: LocalizedString;
  readonly day: MyanmarDayResult;
  readonly weekday: LocalizedString;
  readonly buddhistEraYear: LocalizedString;
  readonly thingyan: ThingyanResult;
  readonly watatYear: WatatYearResult;
  readonly waso: string;
  readonly firstDayOfTagu: string;
}
