/**
 * MyCal - Myanmar Calendar Library
 * Zero dependency TypeScript rewrite with Bun
 *
 * Converts Gregorian dates to Myanmar (Burmese) calendar dates
 */
import type { MycalOptions, ThingyanResult, WatatYearResult, LocalizedString, MyanmarDayResult, ChineseZodiacResult, ZodiacResult } from './types.js';
/**
 * Mycal - Myanmar Calendar Class
 *
 * Converts Gregorian dates to Myanmar calendar dates with information about:
 * - Myanmar year and Buddhist Era year
 * - Month and day with moon phase
 * - Weekday
 * - Thingyan (Water Festival) dates
 * - Watat (intercalary month/day) information
 *
 * @example
 * ```ts
 * import { Mycal } from 'mycal';
 *
 * const cal = new Mycal('2000-01-01');
 * console.log(cal.year); // { en: '1361', my: '၁၃၆၁' }
 * console.log(cal.month); // { en: 'Pyatho', my: 'ပြာသို' }
 * console.log(cal.buddhistEraYear); // { en: '2543', my: '၂၅၄၃' }
 * ```
 */
export declare class Mycal {
    private readonly gDate;
    private nearestWatatYearValue?;
    private nearestWasoValue?;
    private cValue?;
    private bValue?;
    private tg1Value?;
    private mdValue?;
    private mmlValue?;
    /**
     * Create a Mycal instance
     *
     * @param dateString - Date string, Date object, or undefined for current date
     * @param _options - Optional configuration (reserved for future use)
     */
    constructor(dateString?: string | Date, _options?: MycalOptions);
    /**
     * Myanmar year (localized)
     */
    get year(): LocalizedString;
    /**
     * Buddhist Era year (localized)
     */
    get buddhistEraYear(): LocalizedString;
    /**
     * Thingyan (Water Festival) information for the current Myanmar year
     */
    get thingyan(): ThingyanResult;
    /**
     * Watat (intercalary month/day) information for the current year
     */
    get watatYear(): WatatYearResult;
    /**
     * Full moon day of Waso (as localized date string)
     */
    get waso(): string;
    /**
     * First day of Tagu (Myanmar New Year)
     */
    get firstDayOfTagu(): string;
    /**
     * Myanmar month (localized)
     */
    get month(): LocalizedString;
    /**
     * Myanmar day (fortnight day and moon phase)
     */
    get day(): MyanmarDayResult;
    /**
     * Myanmar weekday (localized)
     */
    get weekday(): LocalizedString;
    /**
     * Maharbote birth sign
     */
    get maharbote(): string;
    /**
     * Numerology number (digital root of day)
     */
    get numerology(): number;
    /**
     * Format number to Burmese words
     */
    numFormat(num: number): string;
    /**
     * Chinese zodiac sign for the current year
     */
    get chineseZodiac(): ChineseZodiacResult;
    /**
     * Western zodiac sign for the current date (static method)
     */
    static zodiac(day: number, month: number): ZodiacResult;
}
export type { MycalOptions, ThingyanResult, WatatInfo, WatatYearResult, WasoResult, FirstDayOfTaguResult, MyanmarDate, MyanmarMonthResult, MyanmarDayResult, LocalizedString, MoonPhase, MonthType, MyanmarMonth, IMycal, ValidationIssue, ValidationIssueType, ValidationResult, WatatValidationResult, FullMoonValidationResult, ThingyanValidationResult, CalendarConsistencyResult, ChineseZodiacResult, ZodiacResult, } from './types.js';
export { maharbote, numerology, numFormat, chineseZodiac, zodiac, } from './lib/baydin.js';
export { validateMyanmarYear, validateWatatYear, validateFullMoonDay, validateThingyan, validateCalendarConsistency, isValidYear, getValidationSummary, } from './lib/validator.js';
export default Mycal;
//# sourceMappingURL=index.d.ts.map