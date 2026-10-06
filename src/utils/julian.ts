/**
 * Julian Date Conversion Utilities
 * Native TypeScript implementation - no external dependencies
 */

/**
 * Convert Gregorian date to Julian Day Number
 * Based on the standard algorithm for Julian date conversion
 *
 * @param year - Gregorian year
 * @param month - Gregorian month (1-12)
 * @param day - Gregorian day
 * @returns Julian Day Number
 */
export function gregorianToJulian(
  year: number,
  month: number,
  day: number
): number {
  // 14 and 12 move January/February into the previous year; 12 is months per year.
  const adjustment = Math.floor((14 - month) / 12);
  // Shift the year by 4800 to keep intermediate counts positive for usual dates.
  const adjustedYear = year + 4800 - adjustment;
  // Subtract 3 so March is month 0, placing February's leap day at year end.
  const adjustedMonth = month + 12 * adjustment - 3;

  // 153 days span five March-based months; +2 makes integer division by 5
  // reproduce their alternating 31/30-day lengths. 365 counts ordinary year days.
  // Divisors 4, 100, and 400 apply the Gregorian leap-year rules.
  // 32045 aligns this shifted March-based day count with the Julian-day epoch.
  return (
    day +
    Math.floor((153 * adjustedMonth + 2) / 5) +
    365 * adjustedYear +
    Math.floor(adjustedYear / 4) -
    Math.floor(adjustedYear / 100) +
    Math.floor(adjustedYear / 400) -
    32045
  );
}

/**
 * Convert Julian Day Number to Gregorian date
 * Based on the standard algorithm for Julian date conversion
 *
 * @param jd - Julian Day Number
 * @returns Object containing year, month, day
 */
export function julianToGregorian(jd: number): {
  year: number;
  month: number;
  day: number;
} {
  // Fliegel-Van Flandern inverse: 68569 shifts JDN into its calendar-cycle origin.
  const L = jd + 68569;
  // 146097 is days per 400 Gregorian years; multiplying by 4 counts centuries.
  const N = Math.floor((4 * L) / 146097);
  // +3 compensates for integer rounding when removing complete century blocks.
  const L2 = L - Math.floor((146097 * N + 3) / 4);
  // 4000/1461001 estimates the year within that block; +1 handles day boundaries.
  const I = Math.floor((4000 * (L2 + 1)) / 1461001);
  // 1461 is days per four Julian-rule years; /4 removes the computed year days.
  // +31 aligns the remaining days with the March-based month extraction below.
  const L3 = L2 - Math.floor((1461 * I) / 4) + 31;
  // 80/2447 and its inverse encode month lengths with integer-rounding guards.
  const J = Math.floor((80 * L3) / 2447);
  const day = L3 - Math.floor((2447 * J) / 80);
  // March-based months 11 and 12 are January/February in the following year.
  const L4 = Math.floor(J / 11);
  // +2 maps March to month 3; subtracting 12 wraps January/February to 1/2.
  const month = J + 2 - 12 * L4;
  // 100 converts centuries to years; 49 reverses the shifted century origin.
  const year = 100 * (N - 49) + I + L4;
  return { year, month, day };
}

/**
 * Convert a JavaScript Date object to Julian Day Number
 *
 * @param date - JavaScript Date object
 * @returns Julian Day Number
 */
export function dateToJulian(date: Date): number {
  // JavaScript months are zero-based; +1 converts them to calendar months 1-12.
  return gregorianToJulian(
    date.getUTCFullYear(),
    date.getUTCMonth() + 1,
    date.getUTCDate()
  );
}

/**
 * Convert Julian Day Number to JavaScript Date object
 * Preserves fractional time from Julian Day Number
 *
 * @param jd - Julian Day Number (can include fractional days for precise time)
 * @returns JavaScript Date object
 */
export function julianToDate(jd: number): Date {
  // Separate integer and fractional parts
  const jdInt = Math.floor(jd);
  const jdFrac = jd - jdInt;

  // Get basic date from integer part
  const { year, month, day } = julianToGregorian(jdInt);

  // Convert fractional day to hours, minutes, seconds, milliseconds
  const totalSeconds = jdFrac * 86400; // 24 * 60 * 60
  // 3600 seconds per hour; 60 seconds per minute. Modulo keeps the remainder.
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = Math.floor(totalSeconds % 60);
  // Modulo 1 retains fractional seconds; 1000 converts seconds to milliseconds.
  const milliseconds = Math.round((totalSeconds % 1) * 1000);

  // Create date with precise time
  // Date.UTC uses zero-based months, so subtract 1 from the calendar month.
  const date = new Date(
    Date.UTC(year, month - 1, day, hours, minutes, seconds, milliseconds)
  );
  return date;
}

/**
 * Get Julian Day Number as a rounded integer
 *
 * @param date - JavaScript Date object
 * @returns Rounded Julian Day Number
 */
export function julian(date: Date): number {
  // dateToJulian already returns a whole-day JDN; rounding preserves that contract.
  return Math.round(dateToJulian(date));
}
