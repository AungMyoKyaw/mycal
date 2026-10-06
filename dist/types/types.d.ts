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
    year: number;
    month: MyanmarMonth;
    monthType: MonthType;
    fortnightDay: number;
    moonPhase: MoonPhase;
    weekday: number;
}
/**
 * Thingyan (Water Festival) result
 */
export interface ThingyanResult {
    akyo: string;
    akya: string;
    akyat: string[];
    atat: string;
    new_year_day: string;
    akyaTime: string;
    atatTime: string;
}
/**
 * Watat (Intercary/Leap Year) information
 */
export interface WatatInfo {
    era: 1 | 2 | 3;
    ed: number;
    isWatatYear: boolean;
    nearestWatatInfo?: WatatInfo & {
        year: number;
    };
}
/**
 * Watat year result
 */
export interface WatatYearResult {
    watat: boolean;
    isBigWatat: boolean;
}
/**
 * Waso (Full Moon Day of Waso) result
 */
export interface WasoResult {
    jd: number;
    gd: string;
}
/**
 * First Day of Tagu result
 */
export interface FirstDayOfTaguResult {
    jd: number;
    gd: string;
}
/**
 * Myanmar month calculation result
 */
export interface MyanmarMonthResult {
    mm: LocalizedString;
    mml: number;
    md: number;
}
/**
 * Myanmar day (fortnight day + moon phase) result
 */
export interface MyanmarDayResult {
    fd: LocalizedString;
    mp: LocalizedString;
}
/**
 * Era constants
 */
export interface EraConstants {
    TA: number;
    TW?: number;
    WO?: number;
    WO1?: number;
    WO2?: number;
}
/**
 * Exception table for historical accuracy
 * fme[x,y]: for year x, add y days to the full moon day
 * wte[x,y]: for year x, set watat to y (1=watat, 0=common)
 */
export interface ExceptionTable {
    begin: number;
    end: number;
    fme: [number, number][];
    wte: [number, number][];
}
/**
 * Calendar constants
 */
export interface CalendarConstants {
    SY: number;
    MO: number;
    SE3: number;
    LM: number;
    KALI_YUGA: number;
    thirdEra: EraConstants;
    secondEra: EraConstants;
    firstEra: EraConstants;
    exceptions?: {
        era1_1: ExceptionTable;
        era1_2: ExceptionTable;
        era1_3: ExceptionTable;
        era2: ExceptionTable;
        era3: ExceptionTable;
    };
}
/**
 * Localization data
 */
export interface LocalizationData {
    month: (LocalizedString | LocalizedString[])[];
    moon: LocalizedString[];
    number: (num: number) => LocalizedString;
    weekday: LocalizedString[];
}
/**
 * Options for Mycal constructor
 */
export interface MycalOptions {
    language?: 'en' | 'mm';
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
/**
 * Chinese zodiac result
 */
export interface ChineseZodiacResult {
    sign: string;
    signInBurmese: string;
}
/**
 * Western zodiac result
 */
export interface ZodiacResult {
    sign: string;
    sign_mm: string;
}
/**
 * Validation issue type
 */
export type ValidationIssueType = 'error' | 'warning' | 'info';
/**
 * Validation issue
 */
export interface ValidationIssue {
    type: ValidationIssueType;
    code: string;
    message: string;
    value?: unknown;
    context?: Record<string, unknown>;
}
/**
 * Base validation result
 */
export interface ValidationResult {
    valid: boolean;
    issues: ValidationIssue[];
    warnings: ValidationIssue[];
    year: number;
    era: 1 | 2 | 3;
    isWatat: boolean;
    excessDays: number;
}
/**
 * Watat year validation result
 */
export interface WatatValidationResult extends ValidationResult {
    watatValid: boolean;
    metonicRemainder?: number;
    isWatatByAlgorithm: boolean;
    hasException: boolean;
}
/**
 * Full moon day validation result
 */
export interface FullMoonValidationResult extends ValidationResult {
    fullMoonValid: boolean;
    calculatedJulianDay: number;
    adjustedJulianDay: number;
    hasFmeException: boolean;
}
/**
 * Thingyan validation result
 */
export interface ThingyanValidationResult extends ValidationResult {
    thingyanValid: boolean;
    akyatDaysCount: number;
    thingyanLength: number;
    expectedLength: number;
}
/**
 * Calendar consistency validation result
 */
export interface CalendarConsistencyResult {
    valid: boolean;
    issues: ValidationIssue[];
    warnings: ValidationIssue[];
    startYear: number;
    endYear: number;
    totalYears: number;
    watatYears: number;
    commonYears: number;
    watatFrequency: number;
    yearResults: Record<number, ValidationResult>;
}
//# sourceMappingURL=types.d.ts.map