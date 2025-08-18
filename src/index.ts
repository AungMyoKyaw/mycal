import { getMyanmarYear } from './lib/myanmar-year';
import { getMyanmarMonth } from './lib/myanmar-month';
import { getMyanmarDay } from './lib/myanmar-day';
import { getMyanmarWeekday } from './lib/myanmar-weekday';
import { getBuddhistEraYear } from './lib/buddhist-era-year';
import { getThingyan } from './lib/thingyan';
import { getWatatInfo } from './lib/intercalary';
import { getWaso } from './lib/waso';
import { getFirstDayOfTagu } from './lib/first-day-of-tagu';

import type { MyanmarNumberResult } from './utils/myanmar-number';
import type { LocalizedText } from './lib/localization';
import type { ThingyanInfo } from './lib/thingyan';
import type { MyanmarMonthInfo } from './lib/myanmar-month';
import type { MyanmarDayInfo } from './lib/myanmar-day';

export interface WatatYearResult {
  watat: boolean;
  isBigWatat: boolean;
}

export class MYCAL {
  private gDate: Date;
  private nearestWatatYear!: number;
  private nearestWaso!: number;
  private c!: number; // Is Watat Year (0 = watat, 1 = not watat)
  private b!: number; // Is Big Watat Year (1 = big watat, 0 = not big watat)

  constructor(dateString?: string) {
    this.gDate = dateString ? new Date(dateString) : new Date(); //get gregorian date
    this.gDate.setHours(12, 0);

    //myanmar time
    const utcTime = Date.UTC(
      this.gDate.getUTCFullYear(),
      this.gDate.getUTCMonth(),
      this.gDate.getUTCDate()
    );
    this.gDate = new Date(utcTime + 5.5 * 60 * 60 * 1e3);
  }

  get year(): MyanmarNumberResult {
    return getMyanmarYear(this.gDate);
  }

  get buddhistEraYear(): MyanmarNumberResult {
    return getBuddhistEraYear(+this.year.en);
  }

  get thingyan(): ThingyanInfo {
    return getThingyan(+this.year.en);
  }

  get watatYear(): WatatYearResult {
    const watat = getWatatInfo(+this.year.en);
    const { nearestWatatInfo } = watat;
    let isBigWatat = false;
    const currentWaso = getWaso(watat, +this.year.en);
    const nearestWaso = getWaso(nearestWatatInfo, nearestWatatInfo.year);
    this.nearestWatatYear = nearestWatatInfo.year;
    this.nearestWaso = nearestWaso.jd;

    if (watat.isWatatYear) {
      isBigWatat = (currentWaso.jd - nearestWaso.jd) % 354 == 30 ? false : true;
    }

    this.c = watat.isWatatYear ? 0 : 1;
    this.b = isBigWatat ? 1 : 0;

    return { watat: watat.isWatatYear, isBigWatat };
  }

  get waso(): string {
    return getWaso(getWatatInfo(+this.year.en), +this.year.en).gd;
  }

  get firstDayOfTagu(): string {
    // Ensure watatYear is calculated first to set nearestWatatYear and nearestWaso
    this.watatYear;
    const yd = +this.year.en - this.nearestWatatYear;
    return getFirstDayOfTagu(this.nearestWaso, yd).gd;
  }

  get month(): LocalizedText | LocalizedText[] {
    // Ensure watatYear is calculated first
    this.watatYear;
    const yd = +this.year.en - this.nearestWatatYear;
    const tg1 = getFirstDayOfTagu(this.nearestWaso, yd).jd;
    return getMyanmarMonth(this.gDate, tg1, this.c, this.b).mm;
  }

  get day(): MyanmarDayInfo {
    // Ensure watatYear is calculated first
    this.watatYear;
    const yd = +this.year.en - this.nearestWatatYear;
    const tg1 = getFirstDayOfTagu(this.nearestWaso, yd).jd;
    const monthInfo = getMyanmarMonth(this.gDate, tg1, this.c, this.b);
    return getMyanmarDay(monthInfo.md, monthInfo.mml);
  }

  get weekday(): LocalizedText {
    return getMyanmarWeekday(this.gDate);
  }
}

export default MYCAL;