/**
 * MyCal - Myanmar Calendar Library
 * Zero dependency TypeScript rewrite with Bun
 *
 * Converts Gregorian dates to Myanmar (Burmese) calendar dates
 */

import { myYear } from './lib/myyear.js';
import { myMonth } from './lib/mymonth.js';
import { myDay } from './lib/myday.js';
import { myWeekday } from './lib/myweekday.js';
import { buddhistEraYear } from './lib/buddhistEra.js';
import { thingyan } from './lib/thingyan.js';
import { watat } from './lib/intercalary.js';
import { waso } from './lib/waso.js';
import { firstDayOfTagu } from './lib/firstDayOfTagu.js';
import type { MycalOptions, ThingyanResult, WatatYearResult, LocalizedString, MyanmarDayResult } from './types.js';

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
export class Mycal {
  private readonly gDate: Date;

  // Cached internal values
  private nearestWatatYearValue?: number;
  private nearestWasoValue?: number;
  private cValue?: number;
  private bValue?: number;
  private tg1Value?: number;
  private mdValue?: number;
  private mmlValue?: number;

  /**
   * Create a Mycal instance
   *
   * @param dateString - Date string (e.g., '2000-01-01', '1/1/2000') or undefined for current date
   * @param _options - Optional configuration (reserved for future use)
   */
  constructor(dateString?: string, _options?: MycalOptions) {
    this.gDate = dateString ? new Date(dateString) : new Date();
    this.gDate.setHours(12, 0);

    // Myanmar time (UTC +5:30)
    const utcTime = Date.UTC(
      this.gDate.getUTCFullYear(),
      this.gDate.getUTCMonth(),
      this.gDate.getUTCDate()
    );
    this.gDate = new Date(utcTime + 5.5 * 60 * 60 * 1000);
  }

  /**
   * Myanmar year (localized)
   */
  get year(): LocalizedString {
    return myYear(this.gDate);
  }

  /**
   * Buddhist Era year (localized)
   */
  get buddhistEraYear(): LocalizedString {
    return buddhistEraYear(Number(this.year.en));
  }

  /**
   * Thingyan (Water Festival) information for the current Myanmar year
   */
  get thingyan(): ThingyanResult {
    return thingyan(Number(this.year.en));
  }

  /**
   * Watat (intercalary month/day) information for the current year
   */
  get watatYear(): WatatYearResult {
    const watatInfo = watat(Number(this.year.en));
    const { nearestWatatInfo } = watatInfo;
    let isBigWatat = false;

    const currentWaso = waso(watatInfo, Number(this.year.en));
    const nearestWaso = waso(nearestWatatInfo!, nearestWatatInfo!.year);

    this.nearestWatatYearValue = nearestWatatInfo!.year;
    this.nearestWasoValue = nearestWaso.jd;

    if (watatInfo.isWatatYear) {
      isBigWatat = (currentWaso.jd - nearestWaso.jd) % 354 === 30 ? false : true;
    }

    this.cValue = watatInfo.isWatatYear ? 0 : 1;
    this.bValue = isBigWatat ? 1 : 0;

    return { watat: watatInfo.isWatatYear, isBigWatat };
  }

  /**
   * Full moon day of Waso (as localized date string)
   */
  get waso(): string {
    return waso(watat(Number(this.year.en)), Number(this.year.en)).gd;
  }

  /**
   * First day of Tagu (Myanmar New Year)
   */
  get firstDayOfTagu(): string {
    // Trigger watatYear calculation to populate cached values
    this.watatYear;

    const tg1 = firstDayOfTagu(
      this.nearestWasoValue!,
      Number(this.year.en) - this.nearestWatatYearValue!
    );

    this.tg1Value = tg1.jd;
    return tg1.gd;
  }

  /**
   * Myanmar month (localized)
   */
  get month(): LocalizedString {
    // Trigger firstDayOfTagu to populate tg1
    this.firstDayOfTagu;

    const myanmarMonth = myMonth(this.gDate, this.tg1Value!, this.cValue!, this.bValue!);
    this.mdValue = myanmarMonth.md;
    this.mmlValue = myanmarMonth.mml;
    return myanmarMonth.mm;
  }

  /**
   * Myanmar day (fortnight day and moon phase)
   */
  get day(): MyanmarDayResult {
    // Trigger month calculation to populate md and mml
    this.month;
    return myDay(this.mdValue!, this.mmlValue!);
  }

  /**
   * Myanmar weekday (localized)
   */
  get weekday(): LocalizedString {
    return myWeekday(this.gDate);
  }
}

// Export all types for TypeScript users
export type {
  MycalOptions,
  ThingyanResult,
  WatatInfo,
  WatatYearResult,
  WasoResult,
  FirstDayOfTaguResult,
  MyanmarDate,
  MyanmarMonthResult,
  MyanmarDayResult,
  LocalizedString,
  MoonPhase,
  MonthType,
  MyanmarMonth,
  IMycal,
  ValidationIssue,
  ValidationIssueType,
  ValidationResult,
  WatatValidationResult,
  FullMoonValidationResult,
  ThingyanValidationResult,
  CalendarConsistencyResult,
} from './types.js';

// Export validation functions
export {
  validateMyanmarYear,
  validateWatatYear,
  validateFullMoonDay,
  validateThingyan,
  validateCalendarConsistency,
  isValidYear,
  getValidationSummary,
} from './lib/validator.js';

// Default export for backward compatibility
export default Mycal;
