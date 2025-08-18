import julian from '../utils/julian';
import { SY, MO } from './constants';
import { month } from './localization';
import type { LocalizedText } from './localization';

export interface MyanmarMonthInfo {
  mm: LocalizedText | LocalizedText[];
  mml: number; // length of myanmar month
  md: number; // myanmar day
}

/**
 * Calculate Myanmar Month information
 * 
 * @param gDate Gregorian Date
 * @param tg1 First Day of Tagu by Julian Day Number
 * @param c Is Watat Year (0 = watat, 1 = not watat)
 * @param b Is Big Watat Year (1 = big watat, 0 = not big watat)
 * @returns Myanmar Month information
 */
export function getMyanmarMonth(gDate: Date, tg1: number, c: number, b: number): MyanmarMonthInfo {
  let myanmarMonth: LocalizedText | LocalizedText[];
  const jdn = Math.round(julian(gDate));

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
  const adjustedMm = mm + 3 * f - 4 * e;

  let mml = 30 - (adjustedMm % 2);

  if (adjustedMm == 3) {
    mml = mml + b;
  }

  myanmarMonth = month[adjustedMm - 1];

  if (!c && adjustedMm == 4) {
    //watat year
    //second waso
    myanmarMonth = (month[3] as LocalizedText[])[2];
  }

  if (!c && adjustedMm == 0) {
    //watat year
    //first waso
    myanmarMonth = (month[3] as LocalizedText[])[1];
  }

  if (c && adjustedMm == 4) {
    //waso
    myanmarMonth = (month[3] as LocalizedText[])[0];
  }

  return {
    mm: myanmarMonth,
    mml, //length of myanmar month
    md //myanmar day
  };
}