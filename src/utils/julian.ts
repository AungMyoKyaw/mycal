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
  return Math.floor(
    (1461 * (year + 4800 + Math.floor((month - 14) / 12))) / 4 +
      Math.floor(
        (367 * (month - 2 - 12 * Math.floor((month - 14) / 12))) / 12
      ) -
      Math.floor(
        (3 * Math.floor((year + 4900 + Math.floor((month - 14) / 12)) / 100)) /
          4
      ) +
      day -
      32075
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
  const L = jd + 68569;
  const N = Math.floor((4 * L) / 146097);
  const L2 = L - Math.floor((146097 * N + 3) / 4);
  const I = Math.floor((4000 * (L2 + 1)) / 1461001);
  const L3 = L2 - Math.floor((1461 * I) / 4) + 31;
  const J = Math.floor((80 * L3) / 2447);
  const day = L3 - Math.floor((2447 * J) / 80);
  const L4 = Math.floor(J / 11);
  const month = J + 2 - 12 * L4;
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
  return gregorianToJulian(
    date.getFullYear(),
    date.getMonth() + 1,
    date.getDate()
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
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = Math.floor(totalSeconds % 60);
  const milliseconds = Math.round((totalSeconds % 1) * 1000);

  // Create date with precise time
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
  return Math.round(dateToJulian(date));
}
