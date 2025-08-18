import {
  KALI_YUGA,
  LM,
  firstEra,
  secondEra,
  thirdEra,
  SY
} from './constants';

export interface WatatYearInfo {
  era: number;
  ed: number; // number of excess days
  isWatatYear: boolean;
}

export interface NearestWatatInfo extends WatatYearInfo {
  year: number;
}

export interface WatatInfo extends WatatYearInfo {
  nearestWatatInfo: NearestWatatInfo;
}

/**
 * Check if a Myanmar year is a Watat (intercalary) year
 * 
 * @param mmYear Myanmar Year
 * @returns Watat year information
 */
function isWatatYear(mmYear: number): WatatYearInfo {
  let isWatatYear: boolean;
  let era: number;
  let ed = (SY * (mmYear + KALI_YUGA)) % LM;

  switch (true) {
    case mmYear >= 1312: //third era
      era = 3;
      ed < thirdEra.TA ? (ed += LM) : '';
      isWatatYear = ed >= thirdEra.TW ? true : false;
      break;
    case mmYear >= 1217 && mmYear <= 1311: //second era
      era = 2;
      ed < secondEra.TA ? (ed += LM) : '';
      isWatatYear = ed >= secondEra.TW ? true : false;
      break;
    case mmYear <= 1216: //first era
      era = 1;
      ed < firstEra.TA ? (ed += LM) : '';
      isWatatYear = [2, 5, 7, 10, 13, 15, 18].includes((mmYear * 7 + 2) % 19);
      break;
    default:
      era = 0;
      isWatatYear = false;
      break;
  }

  return {
    era,
    ed, //number of excess days
    isWatatYear
  };
}

/**
 * Find the nearest previous Watat year
 * 
 * @param mmYear Myanmar Year
 * @returns Information about the nearest Watat year
 */
function findNearestWatatYear(mmYear: number): NearestWatatInfo {
  let isWatat = false;
  let watatInfo: WatatYearInfo;
  mmYear--;

  do {
    watatInfo = isWatatYear(mmYear);
    isWatat = watatInfo.isWatatYear;
    isWatat ? mmYear : mmYear--;
  } while (!isWatat);

  return {
    ...watatInfo,
    year: mmYear
  };
}

/**
 * Get complete Watat information including nearest Watat year
 * 
 * @param mmYear Myanmar Year
 * @returns Complete Watat information
 */
export function getWatatInfo(mmYear: number): WatatInfo {
  const watatInfo = isWatatYear(mmYear);
  const nearestWatatInfo = findNearestWatatYear(mmYear);
  
  return {
    ...watatInfo,
    nearestWatatInfo
  };
}