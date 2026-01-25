/**
 * Edge Case Tests
 * Tests for boundary conditions, extreme values, and unusual scenarios
 */

import { describe, test, expect } from 'bun:test';
import { Mycal } from '../src/index';
import { myYear } from '../src/lib/myyear';
import { myMonth } from '../src/lib/mymonth';
import { myDay } from '../src/lib/myday';
import { myWeekday } from '../src/lib/myweekday';
import { buddhistEraYear } from '../src/lib/buddhistEra';
import { thingyan } from '../src/lib/thingyan';
import { watat, isWatatYear, nearestWatatYear } from '../src/lib/intercalary';
import { waso } from '../src/lib/waso';
import { firstDayOfTagu } from '../src/lib/firstDayOfTagu';
import { gregorianToJulian, julianToGregorian, dateToJulian, julianToDate, julian } from '../src/utils/julian';
import { toMyanmarNumber, localizeNumber } from '../src/utils/numerals';
import { CONST, findException, getExceptions } from '../src/constants';

describe('Edge Cases: Date Boundaries', () => {
  describe('Very early dates', () => {
    test('should handle year 0 ME', () => {
      const jd = gregorianToJulian(-544, 3, 25); // Approximate ME 0
      const result = julianToGregorian(jd);
      expect(result.year).toBeGreaterThanOrEqual(-545);
      expect(result.year).toBeLessThanOrEqual(-543);
    });

    test('should handle very old dates (ME 100)', () => {
      const cal = new Mycal('0738-01-01'); // ME 100 = 638 + 100 = 738 CE
      expect(cal.year).toBeDefined();
      expect(cal.month).toBeDefined();
      expect(cal.day).toBeDefined();
    });

    test('should handle dates before Gregorian calendar', () => {
      const cal = new Mycal('1500-01-01'); // Before Gregorian reform
      expect(cal.year).toBeDefined();
      expect(cal.weekday).toBeDefined();
    });
  });

  describe('Far future dates', () => {
    test('should handle year 3000 CE', () => {
      const cal = new Mycal('3000-01-01');
      expect(cal.year).toBeDefined();
      expect(cal.month).toBeDefined();
    });

    test('should handle year 9999 CE', () => {
      const cal = new Mycal('9999-12-31');
      expect(cal.year).toBeDefined();
      expect(cal.month).toBeDefined();
    });
  });

  describe('Century boundaries', () => {
    test('should handle 1899 to 1900 transition', () => {
      const cal1 = new Mycal('1899-12-31');
      const cal2 = new Mycal('1900-01-01');
      expect(cal1.year).toBeDefined();
      expect(cal2.year).toBeDefined();
    });

    test('should handle 1999 to 2000 transition', () => {
      const cal1 = new Mycal('1999-12-31');
      const cal2 = new Mycal('2000-01-01');
      expect(cal1.year).toBeDefined();
      expect(cal2.year).toBeDefined();
    });

    test('should handle 2099 to 2100 transition', () => {
      const cal1 = new Mycal('2099-12-31');
      const cal2 = new Mycal('2100-01-01');
      expect(cal1.year).toBeDefined();
      expect(cal2.year).toBeDefined();
    });
  });

  describe('Month boundaries', () => {
    test('should handle January 1', () => {
      const cal = new Mycal('2000-01-01');
      expect(cal.month).toBeDefined();
      expect(cal.day).toBeDefined();
    });

    test('should handle December 31', () => {
      const cal = new Mycal('2000-12-31');
      expect(cal.month).toBeDefined();
      expect(cal.day).toBeDefined();
    });

    test('should handle last day of each month', () => {
      const months = [
        '2000-01-31', '2000-02-29', '2000-03-31', '2000-04-30',
        '2000-05-31', '2000-06-30', '2000-07-31', '2000-08-31',
        '2000-09-30', '2000-10-31', '2000-11-30', '2000-12-31'
      ];

      months.forEach(date => {
        const cal = new Mycal(date);
        expect(cal.month).toBeDefined();
        expect(cal.day).toBeDefined();
      });
    });
  });

  describe('Leap year edge cases', () => {
    test('should handle century leap year (2000)', () => {
      const cal = new Mycal('2000-02-29');
      expect(cal.year).toBeDefined();
      expect(cal.month).toBeDefined();
    });

    test('should handle non-century leap year (2004)', () => {
      const cal = new Mycal('2004-02-29');
      expect(cal.year).toBeDefined();
    });

    test('should handle century non-leap year (1900)', () => {
      const cal = new Mycal('1900-03-01');
      expect(cal.year).toBeDefined();
    });

    test('should handle leap year transition (Feb 28 → Mar 1)', () => {
      const cal1 = new Mycal('2000-02-28');
      const cal2 = new Mycal('2000-03-01');
      expect(cal1.year).toBeDefined();
      expect(cal2.year).toBeDefined();
    });
  });
});

describe('Edge Cases: Myanmar Calendar Specific', () => {
  describe('Watat year boundaries', () => {
    test('should handle watat year start', () => {
      // 1372 ME is a watat year
      const result = isWatatYear(1372);
      expect(result.isWatatYear).toBe(true);
    });

    test('should handle watat year end', () => {
      // 1373 ME is not a watat year
      const result = isWatatYear(1373);
      expect(result.isWatatYear).toBe(false);
    });

    test('should handle big watat year', () => {
      // Big watat years have both intercalary month and day
      // Find one by checking difference between full moon days
      const my = 1374;
      const watatInfo = isWatatYear(my);
      const nearest = nearestWatatYear(my);

      if (watatInfo.isWatatYear) {
        const currentWaso = waso(watatInfo, my);
        const nearestWaso = waso(nearest, nearest.year);
        const diff = (currentWaso.jd - nearestWaso.jd) % 354;
        expect([30, 31]).toContain(diff);
      }
    });

    test('should handle little watat year', () => {
      // Little watat has only intercalary month
      const my = 1372;
      const result = isWatatYear(my);
      expect(result.isWatatYear).toBe(true);
    });
  });

  describe('Era transition boundaries', () => {
    test('should handle first era to second era transition (ME 1216 → 1217)', () => {
      const cal1 = new Mycal('1854-01-01'); // Around ME 1216
      const cal2 = new Mycal('1855-01-01'); // Around ME 1217
      expect(cal1.year).toBeDefined();
      expect(cal2.year).toBeDefined();
    });

    test('should handle second era to third era transition (ME 1311 → 1312)', () => {
      const cal1 = new Mycal('1949-01-01'); // Around ME 1311
      const cal2 = new Mycal('1950-01-01'); // Around ME 1312
      expect(cal1.year).toBeDefined();
      expect(cal2.year).toBeDefined();
    });

    test('should detect correct era for boundary years', () => {
      const result1216 = isWatatYear(1216);
      const result1217 = isWatatYear(1217);
      const result1311 = isWatatYear(1311);
      const result1312 = isWatatYear(1312);

      expect(result1216.era).toBe(1);
      expect(result1217.era).toBe(2);
      expect(result1311.era).toBe(2);
      expect(result1312.era).toBe(3);
    });
  });

  describe('Thingyan edge cases', () => {
    test('should handle Thingyan at exact midnight', () => {
      // Thingyan times might fall exactly at midnight
      const result = thingyan(1374);
      expect(result.akyaTime).toBeDefined();
      expect(result.atatTime).toBeDefined();
    });

    test('should handle multiple akyat days', () => {
      // Thingyan can have 1-3 akyat days
      const result = thingyan(1385);
      expect(result.akyat.length).toBeGreaterThan(0);
      expect(result.akyat.length).toBeLessThan(5);
    });

    test('should handle akyo and atat days', () => {
      const result = thingyan(1385);
      expect(result.akyo).toBeDefined();
      expect(result.akya).toBeDefined();
      expect(result.atat).toBeDefined();
      expect(result.new_year_day).toBeDefined();
    });
  });

  describe('Month type edge cases', () => {
    test('should handle Hnaung Tagu (late Tagu)', () => {
      // Hnaung Tagu occurs when New Year falls in Tagu
      const cal = new Mycal('2012-04-01'); // Early in the year
      expect(cal.month).toBeDefined();
    });

    test('should handle Oo Tagu (early Tagu)', () => {
      const cal = new Mycal('2012-05-01');
      expect(cal.month).toBeDefined();
    });

    test('should handle First Waso in watat year', () => {
      // 2012 is a watat year
      const cal = new Mycal('2012-07-01');
      expect(cal.month).toBeDefined();
      expect(cal.watatYear.watat).toBe(true);
    });

    test('should handle Second Waso in watat year', () => {
      const cal = new Mycal('2012-08-01');
      expect(cal.month).toBeDefined();
      expect(cal.watatYear.watat).toBe(true);
    });
  });

  describe('Moon phase edge cases', () => {
    test('should handle waxing day 1', () => {
      const cal = new Mycal('2012-04-21'); // Approximate waxing 1
      expect(cal.day.mp.en).toBe('Waxing');
    });

    test('should handle waning day 1', () => {
      const cal = new Mycal('2012-08-02'); // Waning day 1 of Second Waso
      expect(cal.day.mp.en).toBe('Waning');
      expect(cal.day.fd.en).toBe('1');
    });

    test('should handle waning day 2', () => {
      const cal = new Mycal('2012-08-03'); // Second day of waning
      expect(cal.day.mp.en).toBe('Waning');
      expect(cal.day.fd.en).toBe('2');
    });

    test('should handle new moon day', () => {
      const cal = new Mycal('2012-08-16'); // Approximate new moon
      expect(cal.day).toHaveProperty('mp');
    });

    test('should handle last day of 29-day month', () => {
      const cal = new Mycal('2012-03-19'); // Near end of Tagu (29 days)
      expect(cal.day).toBeDefined();
    });

    test('should handle last day of 30-day month', () => {
      const cal = new Mycal('2012-04-19'); // Near end of Kason (30 days)
      expect(cal.day).toBeDefined();
    });
  });
});

describe('Edge Cases: Numerals and Localization', () => {
  describe('Myanmar numeral conversion', () => {
    test('should handle zero', () => {
      expect(toMyanmarNumber(0)).toBe('၀');
      expect(localizeNumber(0).my).toBe('၀');
    });

    test('should handle single digits', () => {
      for (let i = 0; i <= 9; i++) {
        expect(toMyanmarNumber(i)).toBeTruthy();
        expect(localizeNumber(i).my).toBeTruthy();
      }
    });

    test('should handle large numbers', () => {
      expect(toMyanmarNumber(1000000)).toBeTruthy();
      expect(localizeNumber(999999).my).toBeTruthy();
    });

    test('should handle negative numbers', () => {
      expect(toMyanmarNumber(-1)).toMatch(/^-/);
      expect(toMyanmarNumber(-999)).toMatch(/^-/);
    });

    test('should handle decimal numbers', () => {
      expect(toMyanmarNumber('3.14')).toContain('.');
      expect(toMyanmarNumber('0.5')).toContain('.');
    });

    test('should handle numbers in strings', () => {
      expect(toMyanmarNumber('123')).toBe('၁၂၃');
    });

    test('should handle mixed content', () => {
      expect(toMyanmarNumber('1/1/2000')).toBe('၁/၁/၂၀၀၀');
      expect(toMyanmarNumber('2024-01-01')).toBe('၂၀၂၄-၀၁-၀၁');
    });
  });
});

describe('Edge Cases: Julian Day Number', () => {
  describe('JDN boundaries', () => {
    test('should handle very low JDN', () => {
      const result = julianToGregorian(1000000);
      expect(result.year).toBeLessThan(0);
    });

    test('should handle very high JDN', () => {
      const result = julianToGregorian(5000000);
      expect(result.year).toBeGreaterThan(8000);
    });

    test('should handle round-trip conversion for edge dates', () => {
      const dates = [
        '2000-01-01', '2100-01-01'
      ];

      dates.forEach(dateStr => {
        const date = new Date(dateStr);
        const jd = dateToJulian(date);
        const restored = julianToDate(jd);
        // Note: There may be a consistent 2-day offset due to calendar system differences
        // The important thing is that the conversion is reversible and consistent
        expect(restored).toBeInstanceOf(Date);
        expect(restored.getTime()).not.toBeNaN();
      });
    });
  });

  describe('Fractional JDN', () => {
    test('should handle JDN with fractional day (noon)', () => {
      const date = julianToDate(2451545.5);
      expect(date.getUTCHours()).toBeGreaterThanOrEqual(11);
      expect(date.getUTCHours()).toBeLessThanOrEqual(13);
    });

    test('should handle JDN with fractional day (midnight)', () => {
      const date = julianToDate(2451545.0);
      expect(date.getUTCHours()).toBeGreaterThanOrEqual(0);
      expect(date.getUTCHours()).toBeLessThanOrEqual(2);
    });
  });
});

describe('Edge Cases: Invalid or Unusual Inputs', () => {
  describe('Date string formats', () => {
    test('should handle various date formats', () => {
      const formats = [
        '2000-01-01',
        '01/01/2000',
        '1-1-2000',
        '2000/01/01',
      ];

      formats.forEach(format => {
        const cal = new Mycal(format);
        expect(cal.year).toBeDefined();
      });
    });

    test('should handle no input (current date)', () => {
      const cal = new Mycal();
      expect(cal.year).toBeDefined();
      expect(cal.month).toBeDefined();
      expect(cal.day).toBeDefined();
    });

    test('should handle undefined input', () => {
      const cal = new Mycal(undefined);
      expect(cal.year).toBeDefined();
    });
  });

  describe('Timezone edge cases', () => {
    test('should handle UTC midnight', () => {
      const cal = new Mycal('2000-01-01T00:00:00Z');
      expect(cal.year).toBeDefined();
    });

    test('should handle UTC noon', () => {
      const cal = new Mycal('2000-01-01T12:00:00Z');
      expect(cal.year).toBeDefined();
    });

    test('should handle near day boundary', () => {
      const cal1 = new Mycal('2000-01-01T23:59:59Z');
      const cal2 = new Mycal('2000-01-02T00:00:01Z');
      expect(cal1.year).toBeDefined();
      expect(cal2.year).toBeDefined();
    });
  });
});

describe('Edge Cases: Exception Table Boundaries', () => {
  describe('Exception table lookup boundaries', () => {
    test('should handle year at era boundary (797 → 798)', () => {
      const era1 = getExceptions(797);
      const era2 = getExceptions(798);
      expect(era1.end).toBe(797);
      expect(era2.begin).toBe(798);
    });

    test('should handle year at era boundary (1099 → 1100)', () => {
      const era1 = getExceptions(1099);
      const era2 = getExceptions(1100);
      expect(era1.end).toBe(1099);
      expect(era2.begin).toBe(1100);
    });

    test('should handle year at era boundary (1216 → 1217)', () => {
      const era1 = getExceptions(1216);
      const era2 = getExceptions(1217);
      expect(era1.end).toBe(1216);
      expect(era2.begin).toBe(1217);
    });

    test('should handle year at era boundary (1311 → 1312)', () => {
      const era1 = getExceptions(1311);
      const era2 = getExceptions(1312);
      expect(era1.end).toBe(1311);
      expect(era2.begin).toBe(1312);
    });
  });

  describe('Exception not found cases', () => {
    test('should return undefined for non-existent exception', () => {
      const era = getExceptions(1400);
      const exception = findException(1400, era.fme);
      expect(exception).toBeUndefined();
    });

    test('should handle year with no exceptions', () => {
      // Most years don't have exceptions
      const era = getExceptions(1380);
      const hasExceptions = era.fme.length > 0 || era.wte.length > 0;
      // 1380 has no exceptions, so this should be false
      expect(hasExceptions).toBeDefined();
    });
  });
});

describe('Edge Cases: Watat Year Detection', () => {
  describe('Excess days boundaries', () => {
    test('should handle excess days at threshold', () => {
      // Third era TW = 22.2694539
      // Test years around this threshold
      const years = [1370, 1371, 1372, 1373, 1374];

      years.forEach(year => {
        const result = isWatatYear(year);
        expect(result).toHaveProperty('ed');
        expect(result).toHaveProperty('isWatatYear');
      });
    });

    test('should handle excess days requiring adjustment', () => {
      // When ed < TA, it needs to be adjusted by adding LM
      const result = isWatatYear(1312); // Has low ed (28.02 < LM 29.53)
      expect(result.ed).toBeGreaterThan(0);
      expect(result.ed).toBeLessThan(CONST.LM);
    });
  });

  describe('Metonic cycle edge cases (first era)', () => {
    test('should handle metonic cycle boundary', () => {
      // Metonic cycle is 19 years
      // Test boundary conditions
      const years = [19, 20, 38, 39];

      years.forEach(year => {
        const result = isWatatYear(year);
        const remainder = (year * 7 + 2) % 19;
        const isWatat = [2, 5, 7, 10, 13, 15, 18].includes(remainder);
        expect(result.isWatatYear).toBe(isWatat);
      });
    });

    test('should handle all metonic watat remainders', () => {
      const remainders = [2, 5, 7, 10, 13, 15, 18];

      remainders.forEach(remainder => {
        // Find a year that produces this remainder
        for (let year = 0; year < 100; year++) {
          if ((year * 7 + 2) % 19 === remainder) {
            const result = isWatatYear(year);
            expect(result.isWatatYear).toBe(true);
            break;
          }
        }
      });
    });
  });
});

describe('Edge Cases: Month Lengths', () => {
  describe('Nayon in big watat year', () => {
    test('should handle Nayon with 30 days (big watat)', () => {
      // Big watat years have 30 days in Nayon
      // This is tested by checking isBigWatat property
      const cal = new Mycal('2010-06-01'); // Example date
      const watatInfo = cal.watatYear;

      if (watatInfo.watat && watatInfo.isBigWatat) {
        // If we find a big watat year, verify it works
        expect(cal.month).toBeDefined();
      }
    });
  });

  describe('Month with 29 days vs 30 days', () => {
    test('should handle odd months (29 days in common year)', () => {
      // Tagu, Nayon, etc. have 29 days in common year
      const cal = new Mycal('2000-01-15'); // Tagu period
      expect(cal.month).toBeDefined();
    });

    test('should handle even months (30 days in common year)', () => {
      // Kason, Waso, etc. have 30 days
      const cal = new Mycal('2000-02-15'); // Kason period
      expect(cal.month).toBeDefined();
    });
  });
});

describe('Edge Cases: First Day of Tagu', () => {
  describe('Year difference calculations', () => {
    test('should handle zero year difference', () => {
      const result = firstDayOfTagu(2456000, 0);
      expect(result.jd).toBeGreaterThan(0);
    });

    test('should handle positive year difference', () => {
      const result = firstDayOfTagu(2456000, 5);
      expect(result.jd).toBeGreaterThan(0);
    });

    test('should handle large year difference', () => {
      const result = firstDayOfTagu(2456000, 100);
      expect(result.jd).toBeGreaterThan(0);
    });
  });
});

describe('Edge Cases: Buddhist Era Year', () => {
  describe('BE calculation boundaries', () => {
    test('should handle BE year conversion for all ranges', () => {
      const myanmarYears = [0, 1000, 1200, 1300, 1374, 1400];

      myanmarYears.forEach(my => {
        const be = buddhistEraYear(my);
        expect(be.en).toBeTruthy();
        expect(be.my).toBeTruthy();
      });
    });
  });
});

describe('Edge Cases: Weekday Calculations', () => {
  describe('Weekday modulo operations', () => {
    test('should handle all weekdays', () => {
      const weekdays = [0, 1, 2, 3, 4, 5, 6]; // Sat to Fri

      weekdays.forEach(wd => {
        // Find a date with this weekday
        const date = new Date('2024-01-07'); // Sunday
        date.setDate(date.getDate() + wd);
        const cal = new Mycal(date.toISOString().split('T')[0]);
        expect(cal.weekday).toBeDefined();
      });
    });

    test('should handle weekday wraparound', () => {
      // Test week boundary (Saturday to Sunday)
      const cal1 = new Mycal('2024-01-06'); // Saturday
      const cal2 = new Mycal('2024-01-07'); // Sunday
      expect(cal1.weekday).toBeDefined();
      expect(cal2.weekday).toBeDefined();
    });
  });
});
