/**
 * Julian Date Utilities
 * Custom implementation to replace 'julian' dependency
 */

export interface JulianUtilities {
  (date: Date): number;
  toDate(julianDay: number): Date;
  toJulianDay(date: Date): number;
}

/**
 * Convert a Gregorian date to Julian Day Number (with fractional part)
 */
function dateToJulian(date: Date): number {
  const julianDay = toJulianDay(date);
  const millisInDay = date.getUTCHours() * 3600000 + date.getUTCMinutes() * 60000 + date.getUTCSeconds() * 1000 + date.getUTCMilliseconds();
  const fractionalDay = millisInDay / 86400000; // 24 * 60 * 60 * 1000
  return julianDay + 0.5 + fractionalDay;
}

/**
 * Convert a Gregorian date to Julian Day Number (integer part only)
 */
function toJulianDay(date: Date): number {
  const year = date.getUTCFullYear();
  const month = date.getUTCMonth() + 1; // JavaScript months are 0-based
  const day = date.getUTCDate();

  let a = Math.floor((14 - month) / 12);
  let y = year + 4800 - a;
  let m = month + 12 * a - 3;

  let jdn = day + Math.floor((153 * m + 2) / 5) + 365 * y + Math.floor(y / 4) - Math.floor(y / 100) + Math.floor(y / 400) - 32045;
  
  // The Julian Day starts at noon, so for consistency with the original library
  // we need to subtract 1 for dates before noon
  return jdn - 1;
}

/**
 * Convert Julian Day Number to Gregorian date
 */
function toDate(julianDay: number): Date {
  const jd = Math.floor(julianDay + 0.5);
  const fractionalPart = julianDay + 0.5 - jd;

  let a = jd + 32044;
  let b = Math.floor((4 * a + 3) / 146097);
  let c = a - Math.floor((146097 * b) / 4);
  let d = Math.floor((4 * c + 3) / 1461);
  let e = c - Math.floor((1461 * d) / 4);
  let m = Math.floor((5 * e + 2) / 153);

  const day = e - Math.floor((153 * m + 2) / 5) + 1;
  const month = m + 3 - 12 * Math.floor(m / 10);
  const year = 100 * b + d - 4800 + Math.floor(m / 10);

  const millisFromFraction = Math.round(fractionalPart * 86400000);
  const hours = Math.floor(millisFromFraction / 3600000);
  const minutes = Math.floor((millisFromFraction % 3600000) / 60000);
  const seconds = Math.floor((millisFromFraction % 60000) / 1000);
  const milliseconds = millisFromFraction % 1000;

  return new Date(year, month - 1, day, hours, minutes, seconds, milliseconds);
}

// Create the main function with attached methods
const julian: JulianUtilities = dateToJulian as JulianUtilities;
julian.toDate = toDate;
julian.toJulianDay = toJulianDay;

export default julian;