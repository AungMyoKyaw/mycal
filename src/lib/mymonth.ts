/**
 * Myanmar Month Calculation
 * Determines the Myanmar month from a Gregorian date
 */

import { dateToJulian } from '../utils/julian.js';
import { month } from '../localization.js';
import type { MyanmarMonthResult, LocalizedString } from '../types.js';

/**
 * Calculate Myanmar month from Gregorian date
 *
 * @param gDate - Gregorian Date
 * @param tg1 - First Day of Tagu by Julian Day Number
 * @param c - Is Watat Year (0 = watat, 1 = common year)
 * @param b - Is Big Watat Year (0 = small, 1 = big)
 * @returns Myanmar month information
 */
export function myMonth(
  gDate: Date,
  tg1: number,
  c: number,
  b: number
): MyanmarMonthResult {
  let myanmarMonth: LocalizedString;
  const jdn = Math.round(dateToJulian(gDate));

  let dd = jdn - tg1 + 1;

  const myl = 354 + 30 * (1 - c) + b;
  const mmt = Math.floor((dd - 1) / myl);

  if (mmt) {
    dd -= mmt * myl;
  }

  const a = Math.floor((dd + 423) / 512);

  const mm = Math.floor((dd - a * b + 30 * a * c + 29.26) / 29.544);

  const e = Math.floor((mm + 12) / 16);

  const f = Math.floor((mm + 11) / 16);

  const md = dd - Math.floor(29.544 * mm - 29.26) - b * e + 30 * c * f;

  const mmAdjusted = mm + 3 * f - 4 * e;

  let mml = 30 - (mmAdjusted % 2);

  if (mmAdjusted === 3) {
    mml = mml + b;
  }

  myanmarMonth = month[mmAdjusted - 1] as LocalizedString;

  if (!c && mmAdjusted === 4) {
    // Watat year - second waso
    myanmarMonth = (month[3] as LocalizedString[])[2];
  }

  if (!c && mmAdjusted === 0) {
    // Watat year - first waso
    myanmarMonth = (month[3] as LocalizedString[])[1];
  }

  if (c && mmAdjusted === 4) {
    // Common year - waso
    myanmarMonth = (month[3] as LocalizedString[])[0];
  }

  return {
    mm: myanmarMonth,
    mml, // Length of Myanmar month
    md, // Myanmar day
  };
}
