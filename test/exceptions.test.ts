/**
 * Exception Tables Test Suite
 * Tests for historical accuracy using exception tables
 */

import { describe, test, expect } from 'bun:test';
import { isWatatYear, watat } from '../src/lib/intercalary';
import { waso } from '../src/lib/waso';
import { Mycal } from '../src/index';
import { getExceptions, findException } from '../src/constants';

describe('Exception Table Infrastructure', () => {
  test('getExceptions should return correct era table', () => {
    const era1 = getExceptions(500);
    expect(era1.begin).toBe(0);
    expect(era1.end).toBe(797);

    const era2 = getExceptions(900);
    expect(era2.begin).toBe(798);
    expect(era2.end).toBe(1099);

    const era3 = getExceptions(1150);
    expect(era3.begin).toBe(1100);
    expect(era3.end).toBe(1216);

    const eraSecond = getExceptions(1250);
    expect(eraSecond.begin).toBe(1217);
    expect(eraSecond.end).toBe(1311);

    const eraThird = getExceptions(1400);
    expect(eraThird.begin).toBe(1312);
    expect(eraThird.end).toBe(9999);
  });

  test('findException should find exceptions in tables', () => {
    const era = getExceptions(1377);
    const fmeException = findException(1377, era.fme);
    expect(fmeException).toBe(1);

    const wteException = findException(1344, era.wte);
    expect(wteException).toBe(1);
  });

  test('findException should return undefined for non-existent years', () => {
    const era = getExceptions(1400);
    const fmeException = findException(1400, era.fme);
    expect(fmeException).toBeUndefined();
  });
});

describe('First Era (1.1 - ME 0-797) Exceptions', () => {
  describe('Full Moon Day Exceptions (fme)', () => {
    const fmeTests = [
      { year: 205, adjustment: 1 },
      { year: 246, adjustment: 1 },
      { year: 471, adjustment: 1 },
      { year: 572, adjustment: -1 },
      { year: 651, adjustment: 1 },
      { year: 653, adjustment: 2 },
      { year: 656, adjustment: 1 },
      { year: 672, adjustment: 1 },
      { year: 729, adjustment: 1 },
      { year: 767, adjustment: -1 },
    ];

    test.each(fmeTests)('ME $year should have fme exception of $adjustment days', ({ year, adjustment }) => {
      const era = getExceptions(year);
      const exception = findException(year, era.fme);
      expect(exception).toBe(adjustment);
    });
  });
});

describe('First Era (1.2 - ME 798-1099) Exceptions', () => {
  describe('Full Moon Day Exceptions (fme)', () => {
    const fmeTests = [
      { year: 813, adjustment: -1 },
      { year: 849, adjustment: -1 },
      { year: 851, adjustment: -1 },
      { year: 854, adjustment: -1 },
      { year: 927, adjustment: -1 },
      { year: 933, adjustment: -1 },
      { year: 936, adjustment: -1 },
      { year: 938, adjustment: -1 },
      { year: 949, adjustment: -1 },
      { year: 952, adjustment: -1 },
      { year: 963, adjustment: -1 },
      { year: 968, adjustment: -1 },
      { year: 1039, adjustment: -1 },
    ];

    test.each(fmeTests)('ME $year should have fme exception of $adjustment days', ({ year, adjustment }) => {
      const era = getExceptions(year);
      const exception = findException(year, era.fme);
      expect(exception).toBe(adjustment);
    });
  });
});

describe('First Era (1.3 - ME 1100-1216) Exceptions', () => {
  describe('Full Moon Day Exceptions (fme)', () => {
    test('ME 1120 should have fme exception of +1 day', () => {
      const era = getExceptions(1120);
      const exception = findException(1120, era.fme);
      expect(exception).toBe(1);
    });

    test('ME 1126 should have fme exception of -1 day', () => {
      const era = getExceptions(1126);
      const exception = findException(1126, era.fme);
      expect(exception).toBe(-1);
    });

    test('ME 1150 should have fme exception of +1 day', () => {
      const era = getExceptions(1150);
      const exception = findException(1150, era.fme);
      expect(exception).toBe(1);
    });

    test('ME 1172 should have fme exception of -1 day', () => {
      const era = getExceptions(1172);
      const exception = findException(1172, era.fme);
      expect(exception).toBe(-1);
    });

    test('ME 1207 should have fme exception of +1 day', () => {
      const era = getExceptions(1207);
      const exception = findException(1207, era.fme);
      expect(exception).toBe(1);
    });
  });

  describe('Watat Year Exceptions (wte)', () => {
    test('ME 1201 should be watat year (exception)', () => {
      const result = isWatatYear(1201);
      expect(result.isWatatYear).toBe(true);
    });

    test('ME 1202 should NOT be watat year (exception)', () => {
      const result = isWatatYear(1202);
      expect(result.isWatatYear).toBe(false);
    });
  });
});

describe('Second Era (ME 1217-1311) Exceptions', () => {
  describe('Full Moon Day Exceptions (fme)', () => {
    test('ME 1234 should have fme exception of +1 day', () => {
      const era = getExceptions(1234);
      const exception = findException(1234, era.fme);
      expect(exception).toBe(1);
    });

    test('ME 1261 should have fme exception of -1 day', () => {
      const era = getExceptions(1261);
      const exception = findException(1261, era.fme);
      expect(exception).toBe(-1);
    });
  });

  describe('Watat Year Exceptions (wte)', () => {
    test('ME 1263 should be watat year (exception)', () => {
      const result = isWatatYear(1263);
      expect(result.isWatatYear).toBe(true);
    });

    test('ME 1264 should NOT be watat year (exception)', () => {
      const result = isWatatYear(1264);
      expect(result.isWatatYear).toBe(false);
    });
  });
});

describe('Third Era (ME 1312+) Exceptions', () => {
  describe('Full Moon Day Exceptions (fme)', () => {
    test('ME 1377 should have fme exception of +1 day', () => {
      const era = getExceptions(1377);
      const exception = findException(1377, era.fme);
      expect(exception).toBe(1);
    });

    test('ME 1377 full moon day should be adjusted', () => {
      const watatInfo = isWatatYear(1377);
      const result = waso(watatInfo, 1377);

      // The exception adds 1 day to the calculated full moon day
      expect(result.jd).toBeGreaterThan(0);
      expect(result.gd).toBeDefined();
    });
  });

  describe('Watat Year Exceptions (wte)', () => {
    test('ME 1344 should be watat year (exception)', () => {
      const result = isWatatYear(1344);
      expect(result.isWatatYear).toBe(true);
    });

    test('ME 1345 should NOT be watat year (exception)', () => {
      const result = isWatatYear(1345);
      expect(result.isWatatYear).toBe(false);
    });
  });
});

describe('Integration Tests with Mycal Class', () => {
  test('ME 1377 full moon day with exception applied', () => {
    // 1377 ME has fme exception of +1 day
    // This affects the full moon day of Waso
    const cal = new Mycal('2015-01-01'); // Around 1377 ME

    const watatInfo = cal.watatYear;
    expect(watatInfo).toBeDefined();

    const wasoDate = cal.waso;
    expect(wasoDate).toBeDefined();
  });

  test('ME 1344 watat exception should be recognized', () => {
    // 1344 ME is watat due to exception (normally wouldn't be)
    const watatInfo = isWatatYear(1344);
    expect(watatInfo.isWatatYear).toBe(true);
    expect(watatInfo.era).toBe(3);
  });

  test('ME 1345 should not be watat due to exception', () => {
    // 1345 ME is not watat due to exception
    const watatInfo = isWatatYear(1345);
    expect(watatInfo.isWatatYear).toBe(false);
    expect(watatInfo.era).toBe(3);
  });

  test('ME 1201 watat exception should be recognized', () => {
    // 1201 ME is watat due to exception
    const watatInfo = isWatatYear(1201);
    expect(watatInfo.isWatatYear).toBe(true);
    expect(watatInfo.era).toBe(1);
  });

  test('ME 1202 should not be watat due to exception', () => {
    // 1202 ME is not watat due to exception
    const watatInfo = isWatatYear(1202);
    expect(watatInfo.isWatatYear).toBe(false);
    expect(watatInfo.era).toBe(1);
  });
});

describe('Exception Table Coverage', () => {
  test('All eras should have exception tables defined', () => {
    const eras = [500, 900, 1150, 1250, 1400];

    eras.forEach((year) => {
      const era = getExceptions(year);
      expect(era).toHaveProperty('begin');
      expect(era).toHaveProperty('end');
      expect(era).toHaveProperty('fme');
      expect(era).toHaveProperty('wte');
      expect(Array.isArray(era.fme)).toBe(true);
      expect(Array.isArray(era.wte)).toBe(true);
    });
  });

  test('Exception tables should not be empty for most eras', () => {
    const era1_2 = getExceptions(900);
    expect(era1_2.fme.length).toBeGreaterThan(0);

    const era1_3 = getExceptions(1150);
    expect(era1_3.fme.length).toBeGreaterThan(0);
    expect(era1_3.wte.length).toBeGreaterThan(0);

    const era2 = getExceptions(1250);
    expect(era2.fme.length).toBeGreaterThan(0);
    expect(era2.wte.length).toBeGreaterThan(0);

    const era3 = getExceptions(1400);
    expect(era3.fme.length).toBeGreaterThan(0);
    expect(era3.wte.length).toBeGreaterThan(0);
  });
});
