/**
 * Myanmar Calendar Constants
 * Mathematical constants for Myanmar calendar calculations
 */

import type { CalendarConstants } from './types.js';

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
};

// Re-export individual constants for convenience
export const { SY, MO, SE3, LM, KALI_YUGA, thirdEra, secondEra, firstEra } = CONST;
