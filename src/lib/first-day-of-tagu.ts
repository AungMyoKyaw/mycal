import julian from '../utils/julian';

export interface FirstDayOfTaguInfo {
  jd: number; // Julian Day Number
  gd: string; // Gregorian Date
}

/**
 * Calculate the first day of Tagu
 * 
 * @param w1 Julian Day Number of Nearest Waso
 * @param yd Difference between Current Year and Nearest Watat Year
 * @returns First Day of Tagu information
 */
export function getFirstDayOfTagu(w1: number, yd: number): FirstDayOfTaguInfo {
  const tg1 = w1 + 354 * yd - 102;
  return {
    jd: tg1, //julian day
    gd: julian.toDate(tg1).toLocaleDateString('en-US') //gregorian day
  };
}