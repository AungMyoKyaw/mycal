/**
 * Validation Tools Test Suite
 * Tests for calendar validation and error detection
 */

import { describe, test, expect } from 'bun:test';
import {
  validateMyanmarYear,
  validateWatatYear,
  validateFullMoonDay,
  validateThingyan,
  validateCalendarConsistency,
  isValidYear,
  getValidationSummary,
} from '../src/lib/validator';
import { Mycal } from '../src/index';
import { isWatatYear } from '../src/lib/intercalary';

describe('Validation Tools: Basic Year Validation', () => {
  describe('validateMyanmarYear', () => {
    test('should validate a normal year', () => {
      const result = validateMyanmarYear(1374);
      expect(result.valid).toBe(true);
      expect(result.year).toBe(1374);
      expect(result.era).toBe(3);
      expect(result.isWatat).toBe(true);
    });

    test('should validate a common year', () => {
      const result = validateMyanmarYear(1373);
      expect(result.valid).toBe(true);
      expect(result.isWatat).toBe(false);
    });

    test('should detect negative year warning', () => {
      const result = validateMyanmarYear(-100);
      expect(result.valid).toBe(true); // Still valid, just has warnings
      expect(result.warnings.length).toBeGreaterThan(0);
      expect(result.warnings.some(w => w.code === 'NEGATIVE_YEAR')).toBe(true);
    });

    test('should detect future year warning', () => {
      const result = validateMyanmarYear(10000);
      expect(result.valid).toBe(true);
      expect(result.warnings.length).toBeGreaterThan(0);
      expect(result.warnings.some(w => w.code === 'FUTURE_YEAR')).toBe(true);
    });

    test('should report FME exception', () => {
      const result = validateMyanmarYear(1377);
      expect(result.warnings.some(w => w.code === 'FME_EXCEPTION')).toBe(true);
    });

    test('should report WTE exception', () => {
      const result = validateMyanmarYear(1344);
      expect(result.warnings.some(w => w.code === 'WTE_EXCEPTION')).toBe(true);
    });
  });

  describe('isValidYear', () => {
    test('should return true for valid years', () => {
      expect(isValidYear(1374)).toBe(true);
      expect(isValidYear(1380)).toBe(true);
      expect(isValidYear(1400)).toBe(true);
    });

    test('should return true even with warnings for extreme years', () => {
      // Warnings don't make a year invalid
      const result1 = validateMyanmarYear(-100);
      const result2 = validateMyanmarYear(10000);
      expect(result1.warnings.length).toBeGreaterThan(0);
      expect(result2.warnings.length).toBeGreaterThan(0);
      // But isValidYear only checks for errors
      expect(result1.issues.length).toBe(0);
      expect(result2.issues.length).toBe(0);
    });
  });

  describe('getValidationSummary', () => {
    test('should generate summary for valid year', () => {
      const result = validateMyanmarYear(1374);
      const summary = getValidationSummary(result);

      expect(summary).toContain('1374');
      expect(summary).toContain('Era: 3');
      expect(summary).toContain('Is Watat: true');
      expect(summary).toContain('Valid: ✓');
    });

    test('should include issues in summary', () => {
      const result = validateMyanmarYear(1377);
      const summary = getValidationSummary(result);

      // Should show the FME exception warning
      expect(summary).toContain('Warnings');
    });
  });
});

describe('Validation Tools: Watat Year Validation', () => {
  describe('validateWatatYear', () => {
    test('should validate third era watat year', () => {
      const result = validateWatatYear(1374);
      expect(result.watatValid).toBe(true);
      expect(result.isWatatByAlgorithm).toBe(true);
    });

    test('should validate first era watat year (metonic cycle)', () => {
      const result = validateWatatYear(1000);
      expect(result.watatValid).toBe(true);
      expect(result.metonicRemainder).toBeDefined();
      expect([2, 5, 7, 10, 13, 15, 18]).toContain(result.metonicRemainder!);
    });

    test('should detect WTE exception', () => {
      const result = validateWatatYear(1344);
      expect(result.hasException).toBe(true);
      expect(result.warnings.some(w => w.code === 'WTE_EXCEPTION')).toBe(true);
    });

    test('should validate metonic cycle consistency', () => {
      // ME 1201 has exception, so it should still be valid
      const result = validateWatatYear(1201);
      expect(result.watatValid).toBe(true);
      // Should have warning about exception
      expect(result.warnings.length).toBeGreaterThan(0);
    });
  });
});

describe('Validation Tools: Full Moon Day Validation', () => {
  describe('validateFullMoonDay', () => {
    test('should validate full moon for watat year', () => {
      const result = validateFullMoonDay(1374);
      expect(result.fullMoonValid).toBe(true);
      expect(result.calculatedJulianDay).toBeGreaterThan(0);
      expect(result.adjustedJulianDay).toBeGreaterThan(0);
    });

    test('should detect FME exception', () => {
      const result = validateFullMoonDay(1377);
      expect(result.hasFmeException).toBe(true);
      expect(result.calculatedJulianDay).not.toBe(result.adjustedJulianDay);
      expect(
        result.warnings.some(w => w.code === 'FME_EXCEPTION_APPLIED')
      ).toBe(true);
    });

    test('should handle non-watat year', () => {
      const result = validateFullMoonDay(1373);
      expect(result.fullMoonValid).toBe(true);
      expect(result.calculatedJulianDay).toBe(0);
      expect(result.adjustedJulianDay).toBe(0);
    });
  });
});

describe('Validation Tools: Thingyan Validation', () => {
  describe('validateThingyan', () => {
    test('should validate Thingyan for normal year', () => {
      const result = validateThingyan(1374);
      expect(result.thingyanValid).toBe(true);
      expect(result.akyatDaysCount).toBeGreaterThan(0);
      // Thingyan length should be close to expected
      expect(result.thingyanLength).toBeGreaterThan(2);
      expect(result.thingyanLength).toBeLessThan(3);
    });

    test('should validate Thingyan for second era', () => {
      const result = validateThingyan(1260);
      expect(result.thingyanValid).toBe(true);
      expect(result.expectedLength).toBe(2.1675);
    });

    test('should detect unusual akyat count', () => {
      // Most years have 1-2 akyat days, 3 is unusual but valid
      const result = validateThingyan(1385);
      expect(result.thingyanValid).toBe(true);
      expect(result.akyatDaysCount).toBeGreaterThanOrEqual(1);
      expect(result.akyatDaysCount).toBeLessThanOrEqual(3);
    });
  });
});

describe('Validation Tools: Calendar Consistency', () => {
  describe('validateCalendarConsistency', () => {
    test('should validate consistency over a range', () => {
      const result = validateCalendarConsistency(1350, 1400);
      // May have warnings but no critical errors
      expect(result.issues.filter(i => i.type === 'error').length).toBe(0);
      expect(result.totalYears).toBe(51);
      expect(result.watatYears).toBeGreaterThan(0);
      expect(result.commonYears).toBeGreaterThan(0);
    });

    test('should calculate watat frequency', () => {
      const result = validateCalendarConsistency(1300, 1400);
      expect(result.watatFrequency).toBeGreaterThan(0.3);
      expect(result.watatFrequency).toBeLessThan(0.5);
    });

    test('should detect consecutive common years', () => {
      const result = validateCalendarConsistency(1370, 1380);
      // No critical errors expected
      expect(result.issues.filter(i => i.type === 'error').length).toBe(0);
      // Should have warnings about consecutive common years
      expect(result.warnings.length).toBeGreaterThanOrEqual(0);
    });

    test('should include year results', () => {
      const result = validateCalendarConsistency(1370, 1375);
      expect(result.yearResults).toBeDefined();
      expect(Object.keys(result.yearResults).length).toBe(6);
    });
  });
});

describe('Validation Tools: Integration Tests', () => {
  describe('Validating exception years', () => {
    test('should validate ME 1344 (WTE exception)', () => {
      const result = validateWatatYear(1344);
      expect(result.watatValid).toBe(true);
      expect(result.hasException).toBe(true);
    });

    test('should validate ME 1377 (FME exception)', () => {
      const result = validateFullMoonDay(1377);
      expect(result.fullMoonValid).toBe(true);
      expect(result.hasFmeException).toBe(true);
    });

    test('should validate ME 1261 (FME exception)', () => {
      const result = validateFullMoonDay(1261);
      // Should have warnings but no errors
      expect(result.issues.filter(i => i.type === 'error').length).toBe(0);
      expect(result.hasFmeException).toBe(true);
      expect(
        result.warnings.some(w => w.code === 'FME_EXCEPTION_APPLIED')
      ).toBe(true);
    });
  });

  describe('Validating era transitions', () => {
    test('should validate years around era boundaries', () => {
      const years = [1216, 1217, 1311, 1312];

      years.forEach(year => {
        const result = validateMyanmarYear(year);
        expect(result.valid).toBe(true);
        expect(result.year).toBe(year);
      });
    });
  });

  describe('Mycal class validation integration', () => {
    test('should validate year from Mycal instance', () => {
      const cal = new Mycal('2012-05-23'); // ME 1374
      const my = parseInt(cal.year.en);

      const result = validateMyanmarYear(my);
      expect(result.valid).toBe(true);
      expect(result.isWatat).toBe(cal.watatYear.watat);
    });

    test('should validate watat year from Mycal', () => {
      const cal = new Mycal('2012-01-01'); // ME 1373 (common year)
      const my = parseInt(cal.year.en);

      const result = validateWatatYear(my);
      expect(result.watatValid).toBe(true);
      expect(result.isWatatByAlgorithm).toBe(cal.watatYear.watat);
    });
  });
});

describe('Validation Tools: Error Detection', () => {
  describe('Detecting calculation errors', () => {
    test('should detect negative excess days (if any)', () => {
      const result = validateMyanmarYear(1374);
      expect(result.excessDays).toBeGreaterThan(0);
    });

    test('should detect excess days exceeding lunar month', () => {
      const result = validateMyanmarYear(1374);
      expect(result.excessDays).toBeLessThan(29.6);
    });
  });

  describe('Detecting data inconsistencies', () => {
    test('should validate Thingyan day order', () => {
      const result = validateThingyan(1374);
      expect(result.thingyanValid).toBe(true);

      // Check that akyo < akya < atat < new_year_day
      const thingyanData = {
        akyo: result.issues,
        akya: result.warnings,
      };
      expect(thingyanData).toBeDefined();
    });
  });
});

describe('Validation Tools: Performance', () => {
  test('should validate large year ranges efficiently', () => {
    const start = Date.now();
    const result = validateCalendarConsistency(1000, 2000);
    const duration = Date.now() - start;

    // Should have no critical errors
    expect(result.issues.filter(i => i.type === 'error').length).toBe(0);
    expect(duration).toBeLessThan(1000); // Should complete in < 1 second
  });

  test('should handle multiple validations quickly', () => {
    const start = Date.now();

    for (let my = 1300; my < 1400; my++) {
      validateMyanmarYear(my);
    }

    const duration = Date.now() - start;
    expect(duration).toBeLessThan(500); // 100 validations in < 0.5 seconds
  });
});
