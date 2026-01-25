/**
 * MyCal Comprehensive Test Suite
 * Tests for 100% coverage including edge cases
 */

import { describe, test, expect } from 'bun:test';
import { Mycal } from '../src/index';
import { myYear } from '../src/lib/myyear';
import { myWeekday } from '../src/lib/myweekday';
import { buddhistEraYear } from '../src/lib/buddhistEra';
import { thingyan } from '../src/lib/thingyan';
import { watat, isWatatYear, nearestWatatYear } from '../src/lib/intercalary';
import { waso } from '../src/lib/waso';
import { firstDayOfTagu } from '../src/lib/firstDayOfTagu';
import { myMonth } from '../src/lib/mymonth';
import { myDay } from '../src/lib/myday';
import { gregorianToJulian, julianToGregorian, dateToJulian, julianToDate, julian } from '../src/utils/julian';
import { toMyanmarNumber, localizeNumber } from '../src/utils/numerals';
import { CONST } from '../src/constants';

describe('Library Functions - Direct Tests', () => {
  describe('myYear', () => {
    test('should calculate Myanmar year for various dates', () => {
      const date1 = new Date('2000-01-01');
      expect(myYear(date1)).toEqual({ en: '1361', my: '၁၃၆၁' });

      const date2 = new Date('2024-01-01');
      expect(myYear(date2).en).toBe('1385');

      const date3 = new Date('1900-01-01');
      expect(myYear(date3).en).toBe('1261');
    });
  });

  describe('myWeekday', () => {
    test('should return correct weekday for each day', () => {
      const sunday = new Date('2024-01-07'); // Sunday
      expect(myWeekday(sunday)).toEqual({ en: 'Sunday', my: 'တနင်္ဂနွေ' });

      const monday = new Date('2024-01-08'); // Monday
      expect(myWeekday(monday)).toEqual({ en: 'Monday', my: 'တနင်္လာ' });

      const tuesday = new Date('2024-01-09'); // Tuesday
      expect(myWeekday(tuesday)).toEqual({ en: 'Tuesday', my: 'အင်္ဂါ' });

      const wednesday = new Date('2024-01-10'); // Wednesday
      expect(myWeekday(wednesday)).toEqual({ en: 'Wednesday', my: 'ဗုဒ္ဓဟူး' });

      const thursday = new Date('2024-01-11'); // Thursday
      expect(myWeekday(thursday)).toEqual({ en: 'Thursday', my: 'ကြာသပတေး' });

      const friday = new Date('2024-01-12'); // Friday
      expect(myWeekday(friday)).toEqual({ en: 'Friday', my: 'သောကြာ' });

      const saturday = new Date('2024-01-13'); // Saturday
      expect(myWeekday(saturday)).toEqual({ en: 'Saturday', my: 'စနေ' });
    });
  });

  describe('buddhistEraYear', () => {
    test('should calculate Buddhist Era year from Myanmar year', () => {
      expect(buddhistEraYear(1361)).toEqual({ en: '2543', my: '၂၅၄၃' });
      expect(buddhistEraYear(1385)).toEqual({ en: '2567', my: '၂၅၆၇' });
      expect(buddhistEraYear(1261)).toEqual({ en: '2443', my: '၂၄၄၃' });
    });
  });

  describe('thingyan', () => {
    test('should calculate Thingyan for third era', () => {
      const result = thingyan(1385);
      expect(result).toHaveProperty('akyo');
      expect(result).toHaveProperty('akya');
      expect(result).toHaveProperty('akyat');
      expect(result).toHaveProperty('atat');
      expect(result).toHaveProperty('new_year_day');
      expect(result).toHaveProperty('akyaTime');
      expect(result).toHaveProperty('atatTime');
      expect(result.akyaTime).toMatch(/^\d{4}-\d{2}-\d{2}T/);
      expect(result.atatTime).toMatch(/^\d{4}-\d{2}-\d{2}T/);
    });

    test('should calculate Thingyan for second era', () => {
      const result = thingyan(1261);
      expect(result).toHaveProperty('akya');
      expect(result).toHaveProperty('atat');
    });

    test('should calculate Thingyan for first era', () => {
      const result = thingyan(1000);
      expect(result).toHaveProperty('akya');
      expect(result).toHaveProperty('atat');
    });

    test('should have multiple akyat days', () => {
      const result = thingyan(1385);
      // Thingyan typically has 1-3 akyat days
      expect(result.akyat.length).toBeGreaterThan(0);
      expect(result.akyat.length).toBeLessThan(5);
    });
  });

  describe('watat (intercalary)', () => {
    test('should identify watat years in third era', () => {
      const result = watat(1385);
      expect(result).toHaveProperty('era');
      expect(result).toHaveProperty('ed');
      expect(result).toHaveProperty('isWatatYear');
      expect(result).toHaveProperty('nearestWatatInfo');
      expect(result.era).toBe(3);
    });

    test('should identify watat years in second era', () => {
      const result = watat(1261);
      expect(result.era).toBe(2);
      expect(result.nearestWatatInfo).toBeDefined();
    });

    test('should identify watat years in first era', () => {
      const result = watat(1000);
      expect(result.era).toBe(1);
      expect(result.nearestWatatInfo).toBeDefined();
    });

    test('should handle edge case for era boundary', () => {
      // Test year 1217 (second era boundary)
      const result1 = watat(1217);
      expect(result1.era).toBe(2);

      // Test year 1312 (third era boundary)
      const result2 = watat(1312);
      expect(result2.era).toBe(3);
    });

    test('isWatatYear should return correct era info', () => {
      const result = isWatatYear(1385);
      expect(result).toHaveProperty('era');
      expect(result).toHaveProperty('ed');
      expect(result).toHaveProperty('isWatatYear');
    });

    test('nearestWatatYear should find nearest watat year', () => {
      const result = nearestWatatYear(1385);
      expect(result).toHaveProperty('era');
      expect(result).toHaveProperty('ed');
      expect(result).toHaveProperty('isWatatYear');
      expect(result).toHaveProperty('year');
      expect(result.isWatatYear).toBe(true);
    });
  });

  describe('waso', () => {
    test('should calculate Waso for third era watat year', () => {
      const watatInfo = {
        era: 3,
        ed: 25,
        isWatatYear: true,
      };
      const result = waso(watatInfo, 1385);
      expect(result).toHaveProperty('jd');
      expect(result).toHaveProperty('gd');
      expect(result.jd).toBeGreaterThan(0);
      expect(result.gd).toMatch(/^\d+\/\d+\/\d+$/);
    });

    test('should calculate Waso for second era watat year', () => {
      const watatInfo = {
        era: 2,
        ed: 20,
        isWatatYear: true,
      };
      const result = waso(watatInfo, 1261);
      expect(result.jd).toBeGreaterThan(0);
      expect(result.gd).toBeDefined();
    });

    test('should calculate Waso for first era watat year (< 1100)', () => {
      const watatInfo = {
        era: 1,
        ed: 15,
        isWatatYear: true,
      };
      const result = waso(watatInfo, 1000);
      expect(result.jd).toBeGreaterThan(0);
      expect(result.gd).toBeDefined();
    });

    test('should calculate Waso for first era watat year (>= 1100)', () => {
      const watatInfo = {
        era: 1,
        ed: 15,
        isWatatYear: true,
      };
      const result = waso(watatInfo, 1150);
      expect(result.jd).toBeGreaterThan(0);
      expect(result.gd).toBeDefined();
    });

    test('should return empty result for non-watat year', () => {
      const watatInfo = {
        era: 3,
        ed: 10,
        isWatatYear: false,
      };
      const result = waso(watatInfo, 1385);
      expect(result.jd).toBe(0);
      expect(result.gd).toBe('');
    });
  });

  describe('firstDayOfTagu', () => {
    test('should calculate first day of Tagu', () => {
      const result = firstDayOfTagu(2456000, 0);
      expect(result).toHaveProperty('jd');
      expect(result).toHaveProperty('gd');
      expect(result.jd).toBeGreaterThan(0);
    });

    test('should handle positive year difference', () => {
      const result = firstDayOfTagu(2456000, 2);
      expect(result.jd).toBeGreaterThan(0);
      expect(result.gd).toBeDefined();
    });

    test('should handle negative year difference', () => {
      const result = firstDayOfTagu(2456000, -1);
      expect(result.jd).toBeGreaterThan(0);
      expect(result.gd).toBeDefined();
    });
  });

  describe('myMonth', () => {
    test('should calculate month for common year', () => {
      const date = new Date('2000-01-01');
      // Common year: c=1, b=0
      const result = myMonth(date, 2451545, 1, 0);
      expect(result).toHaveProperty('mm');
      expect(result).toHaveProperty('mml');
      expect(result).toHaveProperty('md');
      expect(result.mm).toHaveProperty('en');
      expect(result.mm).toHaveProperty('my');
    });

    test('should calculate month for watat year', () => {
      const date = new Date('2000-01-01');
      // Watat year: c=0, b=0
      const result = myMonth(date, 2451545, 0, 0);
      expect(result.mm).toBeDefined();
      expect(result.mml).toBeGreaterThan(0);
    });

    test('should handle big watat year', () => {
      const date = new Date('2000-01-01');
      // Big watat year: c=0, b=1
      const result = myMonth(date, 2451545, 0, 1);
      expect(result.mm).toBeDefined();
      expect(result.mml).toBeGreaterThan(0);
    });

    test('should handle first waso (watat year, month 0)', () => {
      const date = new Date('2012-07-01');
      // This should trigger First Waso logic
      const result = myMonth(date, 2456000, 0, 0);
      expect(result.mm).toBeDefined();
    });

    test('should handle second waso (watat year, month 4)', () => {
      const date = new Date('2012-08-01');
      // This should trigger Second Waso logic
      const result = myMonth(date, 2456000, 0, 0);
      expect(result.mm).toBeDefined();
    });

    test('should handle normal waso (common year, month 4)', () => {
      const date = new Date('2000-07-01');
      // This should trigger normal Waso logic
      const result = myMonth(date, 2451545, 1, 0);
      expect(result.mm).toBeDefined();
    });

    test('should trigger mmt calculation when dd > myl', () => {
      // Use a date far from Tagu to trigger mmt calculation
      // We need: (dd - 1) / myl >= 1, which means the date is more than one Myanmar year away
      const date = new Date('2000-12-01');
      // Use a small tg1 to make the date far from Tagu
      const tg1 = 2450000; // Much smaller than the actual Julian day
      const result = myMonth(date, tg1, 1, 0);
      expect(result.mm).toBeDefined();
      // Verify the calculation worked by checking md is in valid range
      expect(result.md).toBeGreaterThan(0);
    });

    test('should handle Second Waso period in watat year', () => {
      // Test with actual Myanmar calendar date during Second Waso
      // July 2012 is during Second Waso in 1373 ME (watat year)
      const date = new Date('2012-07-15');
      // Calculate tg1 for this approximate period
      const tg1 = 2456100; // Approximate first day of Tagu for this period
      const c = 0; // Watat year
      const b = 0; // Not big watat

      const result = myMonth(date, tg1, c, b);
      expect(result.mm).toBeDefined();
      expect(result.mm).toHaveProperty('en');
      expect(result.mm).toHaveProperty('my');
    });
  });

  describe('myDay', () => {
    test('should calculate waxing moon (day 1-15)', () => {
      const result = myDay(5, 30);
      expect(result.fd.en).toBe('5');
      expect(result.mp.en).toBe('Waxing');
    });

    test('should calculate full moon day', () => {
      const result = myDay(15, 30);
      expect(result.fd.en).toBe('15');
      expect(result.mp.en).toBe('Full Moon');
    });

    test('should calculate waning moon (day 16-30)', () => {
      const result = myDay(20, 30);
      expect(result.fd.en).toBe('5');
      expect(result.mp.en).toBe('Waning');
    });

    test('should calculate new moon day', () => {
      const result = myDay(30, 30);
      expect(result.fd.en).toBe('15');
      expect(result.mp.en).toBe('New Moon');
    });

    test('should handle last day of month', () => {
      const result = myDay(29, 29);
      expect(result.fd).toBeDefined();
      expect(result.mp).toBeDefined();
    });

    test('should handle edge case with month length', () => {
      // Test when md equals mml
      const result = myDay(30, 30);
      expect(result.mp).toBeDefined();
    });
  });

  describe('Julian date utilities', () => {
    describe('gregorianToJulian', () => {
      test('should convert Gregorian to Julian day number', () => {
        const jd = gregorianToJulian(2000, 1, 1);
        expect(jd).toBeGreaterThanOrEqual(2451544);
        expect(jd).toBeLessThanOrEqual(2451548);
      });

      test('should convert different dates correctly', () => {
        const jd1 = gregorianToJulian(2024, 1, 1);
        expect(jd1).toBeGreaterThan(2460300);

        const jd2 = gregorianToJulian(1900, 1, 1);
        expect(jd2).toBeGreaterThan(2415000);
      });

      test('should handle leap years', () => {
        const jd1 = gregorianToJulian(2000, 2, 29);
        expect(jd1).toBeGreaterThan(2451600);

        const jd2 = gregorianToJulian(2024, 2, 29);
        expect(jd2).toBeGreaterThan(2460300);
      });
    });

    describe('julianToGregorian', () => {
      test('should convert Julian day to Gregorian date', () => {
        const jd = gregorianToJulian(2000, 1, 1);
        const result = julianToGregorian(jd);
        expect(result.year).toBe(2000);
        expect(result.month).toBeGreaterThanOrEqual(1);
        expect(result.month).toBeLessThanOrEqual(12);
        expect(result.day).toBeGreaterThanOrEqual(1);
        expect(result.day).toBeLessThanOrEqual(31);
      });

      test('should convert different Julian days', () => {
        const jd1 = gregorianToJulian(2024, 1, 1);
        const result1 = julianToGregorian(jd1);
        expect(result1.year).toBe(2024);

        const jd2 = gregorianToJulian(1900, 1, 1);
        const result2 = julianToGregorian(jd2);
        expect(result2.year).toBe(1900);
      });
    });

    describe('dateToJulian', () => {
      test('should convert Date object to Julian day', () => {
        const date = new Date('2000-01-01');
        const jd = dateToJulian(date);
        expect(jd).toBeGreaterThan(2451540);
      });

      test('should handle different timezones', () => {
        const date = new Date('2024-01-01T12:00:00Z');
        const jd = dateToJulian(date);
        expect(jd).toBeGreaterThan(2460300);
      });
    });

    describe('julianToDate', () => {
      test('should convert Julian day to Date object', () => {
        const jd = gregorianToJulian(2000, 1, 1);
        const date = julianToDate(jd);
        expect(date.getUTCFullYear()).toBe(2000);
        expect(date.getUTCMonth()).toBeGreaterThanOrEqual(0);
        expect(date.getUTCMonth()).toBeLessThanOrEqual(11);
        expect(date.getUTCDate()).toBeGreaterThanOrEqual(1);
        expect(date.getUTCDate()).toBeLessThanOrEqual(31);
      });

      test('should preserve fractional time', () => {
        const jd = gregorianToJulian(2000, 1, 1);
        const date = julianToDate(jd + 0.5);
        expect(date.getUTCFullYear()).toBe(2000);
        expect(date.getUTCHours()).toBeGreaterThanOrEqual(11);
        expect(date.getUTCHours()).toBeLessThanOrEqual(13);
      });

      test('should handle fractional days with seconds', () => {
        const jd = gregorianToJulian(2000, 1, 1);
        const date = julianToDate(jd + 0.75);
        expect(date.getUTCHours()).toBeGreaterThanOrEqual(17);
        expect(date.getUTCHours()).toBeLessThanOrEqual(19);
      });
    });

    describe('julian (rounded)', () => {
      test('should return rounded Julian day number', () => {
        const date = new Date('2000-01-01');
        const jd = julian(date);
        expect(jd).toBeGreaterThan(2451540);
      });

      test('should handle date with time', () => {
        const date = new Date('2000-01-01T12:00:00Z');
        const jd = julian(date);
        expect(jd).toBeGreaterThan(2451540);
      });
    });
  });

  describe('Myanmar numerals', () => {
    describe('toMyanmarNumber', () => {
      test('should convert single digits', () => {
        expect(toMyanmarNumber(0)).toBe('၀');
        expect(toMyanmarNumber(5)).toBe('၅');
        expect(toMyanmarNumber(9)).toBe('၉');
      });

      test('should convert multiple digits', () => {
        expect(toMyanmarNumber(123)).toBe('၁၂၃');
        expect(toMyanmarNumber(2024)).toBe('၂၀၂၄');
        expect(toMyanmarNumber(1361)).toBe('၁၃၆၁');
      });

      test('should convert string numbers', () => {
        expect(toMyanmarNumber('123')).toBe('၁၂၃');
        expect(toMyanmarNumber('2024')).toBe('၂၀၂၄');
      });

      test('should keep non-digit characters', () => {
        expect(toMyanmarNumber('1/1/2000')).toBe('၁/၁/၂၀၀၀');
        expect(toMyanmarNumber('2024-01-01')).toBe('၂၀၂၄-၀၁-၀၁');
      });

      test('should handle negative numbers', () => {
        expect(toMyanmarNumber(-123)).toBe('-၁၂၃');
      });

      test('should handle decimal numbers', () => {
        expect(toMyanmarNumber('3.14')).toBe('၃.၁၄');
      });

      test('should handle strings with non-digit characters that cannot be parsed', () => {
        // This tests the fallback case when parseInt returns NaN
        expect(toMyanmarNumber('abc123def')).toBe('abc၁၂၃def');
      });
    });

    describe('localizeNumber', () => {
      test('should return both English and Myanmar numerals', () => {
        const result = localizeNumber(1361);
        expect(result).toEqual({ en: '1361', my: '၁၃၆၁' });
      });

      test('should handle string input', () => {
        const result = localizeNumber('2024');
        expect(result).toEqual({ en: '2024', my: '၂၀၂၄' });
      });

      test('should handle zero', () => {
        const result = localizeNumber(0);
        expect(result).toEqual({ en: '0', my: '၀' });
      });

      test('should handle large numbers', () => {
        const result = localizeNumber(99999);
        expect(result.en).toBe('99999');
        expect(result.my).toBe('၉၉၉၉၉');
      });
    });
  });

  describe('Constants', () => {
    test('should have all required constants', () => {
      expect(CONST).toHaveProperty('SY');
      expect(CONST).toHaveProperty('MO');
      expect(CONST).toHaveProperty('SE3');
      expect(CONST).toHaveProperty('LM');
      expect(CONST).toHaveProperty('KALI_YUGA');
      expect(CONST).toHaveProperty('thirdEra');
      expect(CONST).toHaveProperty('secondEra');
      expect(CONST).toHaveProperty('firstEra');
    });

    test('should have correct era constants', () => {
      expect(CONST.thirdEra).toHaveProperty('TA');
      expect(CONST.thirdEra).toHaveProperty('TW');
      expect(CONST.thirdEra).toHaveProperty('WO');

      expect(CONST.secondEra).toHaveProperty('TA');
      expect(CONST.secondEra).toHaveProperty('TW');
      expect(CONST.secondEra).toHaveProperty('WO');

      expect(CONST.firstEra).toHaveProperty('TA');
      expect(CONST.firstEra).toHaveProperty('WO1');
      expect(CONST.firstEra).toHaveProperty('WO2');
    });
  });
});

describe('Mycal Class - Integration Tests', () => {
  describe('Edge cases and boundary conditions', () => {
    test('should handle very old dates', () => {
      const cal = new Mycal('1800-01-01');
      expect(cal.year).toBeDefined();
      expect(cal.month).toBeDefined();
    });

    test('should handle future dates', () => {
      const cal = new Mycal('2100-01-01');
      expect(cal.year).toBeDefined();
      expect(cal.month).toBeDefined();
    });

    test('should handle leap year dates', () => {
      const cal1 = new Mycal('2000-02-29');
      expect(cal1.weekday).toBeDefined();

      const cal2 = new Mycal('2024-02-29');
      expect(cal2.weekday).toBeDefined();
    });

    test('should handle end of year', () => {
      const cal = new Mycal('2000-12-31');
      expect(cal.year).toBeDefined();
      expect(cal.month).toBeDefined();
      expect(cal.day).toBeDefined();
    });

    test('should handle beginning of year', () => {
      const cal = new Mycal('2000-01-01');
      expect(cal.year).toBeDefined();
      expect(cal.month).toBeDefined();
      expect(cal.day).toBeDefined();
    });
  });

  describe('Getter dependency chain', () => {
    test('should properly cache values', () => {
      const cal = new Mycal('2000-01-01');

      // Access in different order to test caching
      const year1 = cal.year;
      const month1 = cal.month;
      const year2 = cal.year;
      const month2 = cal.month;

      expect(year1).toEqual(year2);
      expect(month1).toEqual(month2);
    });

    test('should handle accessing properties in any order', () => {
      const cal = new Mycal('2000-01-01');

      // Access in reverse order
      const weekday = cal.weekday;
      const day = cal.day;
      const month = cal.month;
      const year = cal.year;

      expect(weekday).toBeDefined();
      expect(day).toBeDefined();
      expect(month).toBeDefined();
      expect(year).toBeDefined();
    });
  });

  describe('Watat years', () => {
    test('should handle watat year (2024)', () => {
      const cal = new Mycal('2024-01-01');
      const watatInfo = cal.watatYear;
      expect(watatInfo).toHaveProperty('watat');
      expect(watatInfo).toHaveProperty('isBigWatat');
    });

    test('should handle common year (2023)', () => {
      const cal = new Mycal('2023-01-01');
      const watatInfo = cal.watatYear;
      expect(watatInfo).toHaveProperty('watat');
      expect(watatInfo).toHaveProperty('isBigWatat');
    });
  });

  describe('All months', () => {
    test('should handle all Myanmar months', () => {
      const months = [
        '2000-01-01', // Tagu
        '2000-02-01', // Kason
        '2000-03-01', // Nayon
        '2000-04-01', // Waso
        '2000-05-01', // Wagaung
        '2000-06-01', // Tawthalin
        '2000-07-01', // Thadingyut
        '2000-08-01', // Tazaungmon
        '2000-09-01', // Nadaw
        '2000-10-01', // Pyatho
        '2000-11-01', // Tabodwe
        '2000-12-01', // Tabaung
      ];

      months.forEach((dateStr) => {
        const cal = new Mycal(dateStr);
        expect(cal.month).toBeDefined();
        expect(cal.month.en).toBeTruthy();
        expect(cal.month.my).toBeTruthy();
      });
    });
  });

  describe('Watat year specific months', () => {
    test('should handle Second Waso in watat year', () => {
      // 2012 is a watat year, August should be Second Waso
      const cal = new Mycal('2012-08-15');
      expect(cal.month).toBeDefined();
      expect(cal.watatYear.watat).toBe(true);
    });

    test('should handle First Waso in watat year', () => {
      // 2012 is a watat year, early July should be First Waso
      const cal = new Mycal('2012-07-01');
      expect(cal.month).toBeDefined();
      expect(cal.watatYear.watat).toBe(true);
    });
  });

  describe('All weekdays', () => {
    test('should handle all weekdays', () => {
      const weekdays = [
        '2024-01-07', // Sunday
        '2024-01-08', // Monday
        '2024-01-09', // Tuesday
        '2024-01-10', // Wednesday
        '2024-01-11', // Thursday
        '2024-01-12', // Friday
        '2024-01-13', // Saturday
      ];

      weekdays.forEach((dateStr) => {
        const cal = new Mycal(dateStr);
        expect(cal.weekday).toBeDefined();
        expect(cal.weekday.en).toBeTruthy();
        expect(cal.weekday.my).toBeTruthy();
      });
    });
  });
});

describe('Historical and boundary dates', () => {
  test('should handle Independence Day (1948-01-04)', () => {
    const cal = new Mycal('1948-01-04');
    expect(cal.year).toBeDefined();
    expect(cal.month).toBeDefined();
    expect(cal.weekday.en).toBe('Sunday');
  });

  test('should handle Thingyan period', () => {
    // April dates around Thingyan
    const cal = new Mycal('2024-04-13');
    expect(cal.thingyan).toBeDefined();
    expect(cal.thingyan.akyo).toBeDefined();
    expect(cal.thingyan.akya).toBeDefined();
  });

  test('should handle dates across different eras', () => {
    // First era
    const cal1 = new Mycal('1000-01-01');
    expect(cal1.year).toBeDefined();

    // Second era
    const cal2 = new Mycal('1300-01-01');
    expect(cal2.year).toBeDefined();

    // Third era
    const cal3 = new Mycal('1400-01-01');
    expect(cal3.year).toBeDefined();
  });
});
