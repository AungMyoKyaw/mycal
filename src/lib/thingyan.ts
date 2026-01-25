/**
 * Thingyan (Water Festival) Calculation
 * Calculates Thingyan festival dates and times for a given Myanmar year
 */

import { julianToDate } from '../utils/julian.js';
import { CONST } from '../constants.js';
import type { ThingyanResult } from '../types.js';

const { SY, MO, SE3 } = CONST;

/**
 * Calculate Thingyan (Water Festival) dates for a Myanmar year
 *
 * @param mmyear - Myanmar Year
 * @returns Thingyan festival information including dates and times
 */
export function thingyan(mmyear: number): ThingyanResult {
  let akyaTime: number;
  const atatTime = SY * mmyear + MO;

  if (mmyear >= SE3) {
    akyaTime = atatTime - 2.169918982;
  } else {
    akyaTime = atatTime - 2.1675;
  }

  const atat = julianToDate(atatTime);
  const akya = julianToDate(akyaTime);

  atat.setHours(0, 0, 0, 0);
  akya.setHours(0, 0, 0, 0);

  const akyo = new Date(Date.UTC(akya.getFullYear(), akya.getMonth(), akya.getDate() - 1));
  const new_year_day = new Date(
    Date.UTC(atat.getFullYear(), atat.getMonth(), atat.getDate() + 1)
  );

  const akyat: string[] = [];
  for (let i = 1; i < atat.getUTCDate() - akya.getUTCDate(); i++) {
    akyat.push(
      new Date(Date.UTC(akya.getFullYear(), akya.getMonth(), akya.getDate() + i))
        .toLocaleDateString('en-US')
    );
  }

  return {
    akyo: akyo.toLocaleDateString('en-US'),
    akya: akya.toLocaleDateString('en-US'),
    akyat,
    atat: atat.toLocaleDateString('en-US'),
    new_year_day: new_year_day.toLocaleDateString('en-US'),
    akyaTime: julianToDate(akyaTime).toISOString(),
    atatTime: julianToDate(atatTime).toISOString(),
  };
}
