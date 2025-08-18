import julian from '../utils/julian';
import { SY, MO, LM, firstEra, secondEra, thirdEra } from './constants';
import type { WatatInfo, WatatYearInfo } from './intercalary';

export interface WasoInfo {
  jd: number; // Julian Day
  gd: string; // Gregorian Date
}

/**
 * Calculate Waso full moon day
 * 
 * @param watatInfo Watat information
 * @param mmYear Myanmar Year
 * @returns Waso full moon information
 */
export function getWaso(watatInfo: WatatInfo | WatatYearInfo, mmYear: number): WasoInfo {
  let w: number = 0;
  let WO: number = 0;

  switch (true) {
    case mmYear < 1100:
      WO = firstEra.WO1;
      break;

    case mmYear >= 1100:
      WO = firstEra.WO2;
      break;
  }

  switch (watatInfo.era) {
    case 1:
      if (watatInfo.isWatatYear) {
        w = Math.round(SY * mmYear + MO - watatInfo.ed + 4.5 * LM + WO);
      }
      break;
    case 2:
      WO = secondEra.WO;
      if (watatInfo.isWatatYear) {
        w = Math.round(SY * mmYear + MO - watatInfo.ed + 4.5 * LM + WO);
      }
      break;
    case 3:
      WO = thirdEra.WO;
      if (watatInfo.isWatatYear) {
        w = Math.round(SY * mmYear + MO - watatInfo.ed + 4.5 * LM + WO);
      }
      break;
  }

  return {
    jd: w, //julian day
    gd: julian.toDate(w).toLocaleDateString('en-US') //gregorian date
  };
}