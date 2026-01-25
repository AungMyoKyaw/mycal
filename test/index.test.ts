/**
 * MyCal Test Suite
 * Bun test format
 */

import { describe, test, expect } from 'bun:test';
import { Mycal } from '../src/index';

describe('MYCAL', () => {
  test('SHOULD RETURN MYANMAR YEAR', () => {
    const cal = new Mycal('1/1/2000');
    const { year } = cal;
    expect(year).toEqual({ en: '1361', my: '၁၃၆၁' });
  });

  test('SHOULD RETURN BUDDHIST ERA YEAR', () => {
    const cal = new Mycal('1/1/2000');
    const { buddhistEraYear } = cal;
    expect(buddhistEraYear).toEqual({ en: '2543', my: '၂၅၄၃' });
  });

  test('SHOULD RETURN THINGYAN DAYS', () => {
    const cal = new Mycal('1/1/2000');
    const { thingyan } = cal;

    expect(thingyan).toEqual({
      akyo: '4/13/1999',
      akya: '4/14/1999',
      akyat: ['4/15/1999'],
      atat: '4/16/1999',
      new_year_day: '4/17/1999',
      akyaTime: expect.any(String), // ISO string format
      atatTime: expect.any(String), // ISO string format
    });
  });

  test('SHOULD RETURN YEAR IS WITH INTERCALARY MONTH OR NOT', () => {
    const cal = new Mycal('1/1/2001');
    const { watatYear } = cal;

    expect(watatYear.watat).toBe(false);
  });

  test('SHOULD RETURN FULLMOON DAY OF SECOND WASO (THIRD ERA)', () => {
    const cal = new Mycal('1/1/2013');
    const { waso } = cal;
    expect(waso).toBe('8/2/2012');
  });

  test('SHOULD RETURN FULLMOON DAY OF SECOND WASO (SECOND ERA)', () => {
    const cal = new Mycal('1/1/1900');
    const { waso } = cal;
    // ME 1261 has fme exception of -1 day, so full moon is 7/21 instead of 7/22
    expect(waso).toBe('7/21/1899');
  });

  test('SHOULD RETURN FULLMOON DAY OF SECOND WASO (FIRST ERA)', () => {
    const cal = new Mycal('1/1/1803');
    const { waso } = cal;
    expect(waso).toBe('7/14/1802');
  });

  test('SHOULD RETURN YEAR IS WITH INTERCALARY DAY OR NOT', () => {
    const cal = new Mycal('1/1/2013');
    const { watatYear } = cal;

    expect(watatYear.isBigWatat).toBe(false);
  });

  test('SHOULD RETURN FIRST DAY OF TAGU', () => {
    const cal = new Mycal('1/1/2013');
    const { firstDayOfTagu } = cal;

    expect(firstDayOfTagu).toBe('3/23/2012');
  });

  test('SHOULD RETURN MYANMAR MONTH', () => {
    const cal = new Mycal('7/1/2012');
    const { month } = cal;

    expect(month).toEqual({ en: 'First Waso', my: 'ပဝါဆို' });
  });

  test('SHOULD RETURN MYANMAR DAY', () => {
    const cal = new Mycal('5/23/2012');
    const { day } = cal;

    expect(day).toEqual({
      fd: { en: '4', my: '၄' }, // Fortnight day (number)
      mp: { en: 'Waxing', my: 'လဆန်း' }, // Moon phase
    });
  });

  test('SHOULD RETURN MYANMAR WEEK DAY', () => {
    const cal = new Mycal('1/4/1948');
    const { weekday } = cal;
    expect(weekday).toEqual({
      en: 'Sunday',
      my: 'တနင်္ဂနွေ',
    });
  });

  test('SHOULD WORK WITH CURRENT DATE', () => {
    const cal = new Mycal();
    expect(cal.year).toBeDefined();
    expect(cal.month).toBeDefined();
    expect(cal.day).toBeDefined();
    expect(cal.weekday).toBeDefined();
  });

  test('SHOULD RETURN CONSISTENT RESULTS FOR MULTIPLE ACCESSES', () => {
    const cal = new Mycal('2000-01-01');
    const year1 = cal.year;
    const year2 = cal.year;
    expect(year1).toEqual(year2);
  });

  test('SHOULD HANDLE DIFFERENT DATE FORMATS', () => {
    const cal1 = new Mycal('1/1/2000');
    const cal2 = new Mycal('2000-01-01');
    expect(cal1.year).toEqual(cal2.year);
  });
});
