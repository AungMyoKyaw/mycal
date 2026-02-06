/**
 * Thingyan (Water Festival) Calculation
 * Calculates Thingyan festival dates and times for a given Myanmar year
 */

import { julianToDate } from '../utils/julian.js';
import { CONST } from '../constants.js';
import { caches } from '../utils/cache.js';
import type { ThingyanResult } from '../types.js';

const { SY, MO, SE3 } = CONST;

/**
 * Format date to US date string (faster than toLocaleDateString)
 */
function formatDate(date: Date): string {
  const month = date.getUTCMonth() + 1;
  const day = date.getUTCDate();
  const year = date.getUTCFullYear();
  return `${month}/${day}/${year}`;
}

/**
 * Calculate Thingyan (Water Festival) dates for a Myanmar year (with caching)
 *
 * @param mmyear - Myanmar Year
 * @returns Thingyan festival information including dates and times
 */
export function thingyan(mmyear: number): ThingyanResult {
  // Check cache first
  const cached = caches.thingyan.get(mmyear);
  if (cached) return cached;

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

  const akyoDate = new Date(
    Date.UTC(akya.getUTCFullYear(), akya.getUTCMonth(), akya.getUTCDate() - 1)
  );
  const new_year_dayDate = new Date(
    Date.UTC(atat.getUTCFullYear(), atat.getUTCMonth(), atat.getUTCDate() + 1)
  );

  // Use optimized date formatting
  const akyo = formatDate(akyoDate);
  const akyaDateStr = formatDate(akya);
  const atatDateStr = formatDate(atat);
  const new_year_day = formatDate(new_year_dayDate);

  // Optimize akyat array generation - reduce Date object creation
  const akyat: string[] = [];
  const dayDiff = atat.getUTCDate() - akya.getUTCDate();
  for (let i = 1; i < dayDiff; i++) {
    akyat.push(
      formatDate(
        new Date(
          Date.UTC(
            akya.getUTCFullYear(),
            akya.getUTCMonth(),
            akya.getUTCDate() + i
          )
        )
      )
    );
  }

  const result: ThingyanResult = {
    akyo,
    akya: akyaDateStr,
    akyat,
    atat: atatDateStr,
    new_year_day,
    akyaTime: julianToDate(akyaTime).toISOString(),
    atatTime: julianToDate(atatTime).toISOString(),
  };

  // Cache the result
  caches.thingyan.set(mmyear, result);

  return result;
}
