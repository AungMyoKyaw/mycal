/**
 * Myanmar Calendar Constants
 * Mathematical constants for Myanmar calendar calculations
 */

import type { CalendarConstants } from './types.js';

/**
 * Exception tables for historical accuracy
 * Based on https://coolemerald.blogspot.com/2013/06/algorithm-program-and-calculation-of.html
 *
 * fme[x,y]: for year x, add y days to the full moon day
 * wte[x,y]: for year x, set watat to y (1=watat, 0=common)
 */

// First Era (1.1 - ME 0-797): Makaranta system 1
const era1_1 = {
  begin: 0,
  end: 797,
  fme: [
    [205, 1],
    [246, 1],
    [471, 1],
    [572, -1],
    [651, 1],
    [653, 2],
    [656, 1],
    [672, 1],
    [729, 1],
    [767, -1],
  ] as [number, number][],
  wte: [] as [number, number][],
};

// First Era (1.2 - ME 798-1099): Makaranta system 2
const era1_2 = {
  begin: 798,
  end: 1099,
  fme: [
    [813, -1],
    [849, -1],
    [851, -1],
    [854, -1],
    [927, -1],
    [933, -1],
    [936, -1],
    [938, -1],
    [949, -1],
    [952, -1],
    [963, -1],
    [968, -1],
    [1039, -1],
  ] as [number, number][],
  wte: [] as [number, number][],
};

// First Era (1.3 - ME 1100-1216): Thandeikta
const era1_3 = {
  begin: 1100,
  end: 1216,
  fme: [
    [1120, 1],
    [1126, -1],
    [1150, 1],
    [1172, -1],
    [1207, 1],
  ] as [number, number][],
  wte: [
    [1201, 1],
    [1202, 0],
  ] as [number, number][],
};

// Second Era (ME 1217-1311)
const era2 = {
  begin: 1217,
  end: 1311,
  fme: [
    [1234, 1],
    [1261, -1],
  ] as [number, number][],
  wte: [
    [1263, 1],
    [1264, 0],
  ] as [number, number][],
};

// Third Era (ME 1312+)
const era3 = {
  begin: 1312,
  end: 9999,
  fme: [[1377, 1]] as [number, number][],
  wte: [
    [1344, 1],
    [1345, 0],
  ] as [number, number][],
};

/**
 * Get exception table for a given Myanmar year
 */
export function getExceptions(my: number) {
  if (my <= era1_1.end) return era1_1;
  if (my <= era1_2.end) return era1_2;
  if (my <= era1_3.end) return era1_3;
  if (my <= era2.end) return era2;
  return era3;
}

/**
 * Find exception value for a given year in an exception table
 * @param year - Myanmar year to lookup
 * @param table - Exception table (fme or wte)
 * @returns Exception value if found, undefined otherwise
 */
export function findException(
  year: number,
  table: [number, number][]
): number | undefined {
  const result = table.find(([y]) => y === year);
  return result?.[1];
}

/**
 * Calendar constants for Myanmar calendar calculations
 */
export const CONST: CalendarConstants = {
  SY: 1577917828 / 4320000, // Solar year
  MO: 1954168.050623, // Myanmar year zero
  SE3: 1312, // Beginning of 3rd Era
  LM: 1577917828 / 53433336, // Lunar month
  KALI_YUGA: 3739, // Kali Yuga
  thirdEra: {
    TA: 3.630567, // The number of excess days for 4 months
    TW: 22.2694539,
    WO: -0.5,
  },
  secondEra: {
    TA: 7.261134, // The number of excess days for 4 months
    TW: 25.90002,
    WO: -1,
  },
  firstEra: {
    TA: 11.799343, // The number of excess days for 4 months
    WO1: -1.1,
    WO2: -0.85,
  },
  exceptions: {
    era1_1,
    era1_2,
    era1_3,
    era2,
    era3,
  },
};

// Re-export individual constants for convenience
export const { SY, MO, SE3, LM, KALI_YUGA, thirdEra, secondEra, firstEra } =
  CONST;
