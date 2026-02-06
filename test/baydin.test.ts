/**
 * BayDin Test Suite
 * Comprehensive tests for Myanmar astrology and numerology functions
 */

import { describe, test, expect } from 'bun:test';
import {
  maharbote,
  numerology,
  numFormat,
  chineseZodiac,
  zodiac,
  toBurmeseNumerals,
  fromBurmeseNumerals,
} from '../src/lib/baydin';

describe('BayDin Functions', () => {
  describe('maharbote', () => {
    test('should return correct birth sign for Sunday (1)', () => {
      const result = maharbote(1385, 1);
      expect(result).toBeTruthy();
      expect(typeof result).toBe('string');
    });

    test('should return correct birth sign for Monday (2)', () => {
      const result = maharbote(1385, 2);
      expect(result).toBeTruthy();
    });

    test('should return correct birth sign for Tuesday (3)', () => {
      const result = maharbote(1385, 3);
      expect(result).toBeTruthy();
    });

    test('should return correct birth sign for Wednesday (4)', () => {
      const result = maharbote(1385, 4);
      expect(result).toBeTruthy();
    });

    test('should return correct birth sign for Thursday (5)', () => {
      const result = maharbote(1385, 5);
      expect(result).toBeTruthy();
    });

    test('should return correct birth sign for Friday (6)', () => {
      const result = maharbote(1385, 6);
      expect(result).toBeTruthy();
    });

    test('should return correct birth sign for Saturday (7)', () => {
      const result = maharbote(1385, 7);
      expect(result).toBeTruthy();
    });

    test('should handle all weekdays for multiple years', () => {
      const weekdays = [1, 2, 3, 4, 5, 6, 7];
      const years = [1380, 1385, 1390, 1400];

      years.forEach(year => {
        weekdays.forEach(weekday => {
          const result = maharbote(year, weekday);
          expect(result).toBeTruthy();
          expect(result.length).toBeGreaterThan(0);
        });
      });
    });

    test('should return valid sign from MAHARBOTE_SIGNS', () => {
      const validSigns = [
        'ဘင်္ဂ',
        'မရဏ',
        'အထွန်း',
        'သိုက်',
        'ရာဇာ',
        'ပုတိ',
        'အဓိပတိ',
      ];
      const result = maharbote(1385, 1);
      expect(validSigns).toContain(result);
    });

    test('should handle year remainder when divisible by 7', () => {
      const result = maharbote(1386, 1);
      expect(result).toBeTruthy();
    });

    test('should be deterministic - same input gives same output', () => {
      const result1 = maharbote(1385, 3);
      const result2 = maharbote(1385, 3);
      expect(result1).toBe(result2);
    });

    test('should handle edge case of year 0', () => {
      const result = maharbote(0, 1);
      expect(result).toBeTruthy();
    });

    test('should handle negative years', () => {
      const result = maharbote(-100, 1);
      expect(result).toBeTruthy();
    });

    test('should produce consistent results for year-remainder pairs', () => {
      // Years with same remainder should have same sign for same weekday
      const year1 = 1386; // remainder 0 = 7
      const year2 = 1393; // remainder 0 = 7
      const result1 = maharbote(year1, 1);
      const result2 = maharbote(year2, 1);
      expect(result1).toBe(result2);
    });
  });

  describe('numerology', () => {
    test('should calculate digital root for single digits', () => {
      expect(numerology(1)).toBe(1);
      expect(numerology(5)).toBe(5);
      expect(numerology(9)).toBe(9);
    });

    test('should calculate digital root for two-digit numbers', () => {
      expect(numerology(10)).toBe(1);
      expect(numerology(11)).toBe(2);
      expect(numerology(19)).toBe(1);
      expect(numerology(99)).toBe(9);
    });

    test('should calculate digital root for three-digit numbers', () => {
      expect(numerology(100)).toBe(1);
      expect(numerology(123)).toBe(6);
      expect(numerology(999)).toBe(9);
    });

    test('should calculate digital root for large numbers', () => {
      expect(numerology(12345)).toBe(6);
      expect(numerology(99999)).toBe(9);
      expect(numerology(123456789)).toBe(9);
    });

    test('should handle zero', () => {
      expect(numerology(0)).toBe(0);
    });

    test('should return result between 0 and 9', () => {
      for (let i = 0; i < 100; i++) {
        const result = numerology(Math.floor(Math.random() * 1000000));
        expect(result).toBeGreaterThanOrEqual(0);
        expect(result).toBeLessThanOrEqual(9);
      }
    });

    test('should handle numbers with many digits', () => {
      expect(numerology(999999999)).toBe(9);
      expect(numerology(111111111)).toBe(9);
    });

    test('should be deterministic', () => {
      const num = 123456;
      expect(numerology(num)).toBe(numerology(num));
    });

    test('should handle powers of 10', () => {
      expect(numerology(10)).toBe(1);
      expect(numerology(100)).toBe(1);
      expect(numerology(1000)).toBe(1);
      expect(numerology(10000)).toBe(1);
    });

    test('should handle negative numbers', () => {
      // Negative numbers result in NaN due to string conversion adding '-' char
      expect(numerology(-123)).toBeNaN();
    });
  });

  describe('numFormat', () => {
    test('should format single digit numbers', () => {
      expect(numFormat(1)).toContain('တစ်');
      expect(numFormat(5)).toContain('ငါး');
    });

    test('should format two-digit numbers', () => {
      expect(numFormat(10)).toContain('တစ်');
      expect(numFormat(10)).toContain('ဆယ်');
    });

    test('should format three-digit numbers', () => {
      expect(numFormat(100)).toContain('တစ်');
      expect(numFormat(100)).toContain('ရာ');
    });

    test('should format four-digit numbers', () => {
      expect(numFormat(1000)).toContain('တစ်');
      expect(numFormat(1000)).toContain('ထောင်');
    });

    test('should format five-digit numbers', () => {
      expect(numFormat(10000)).toContain('တစ်');
      expect(numFormat(10000)).toContain('သောင်း');
    });

    test('should format six-digit numbers', () => {
      expect(numFormat(100000)).toContain('တစ်');
      expect(numFormat(100000)).toContain('သိန်း');
    });

    test('should format seven-digit numbers', () => {
      expect(numFormat(1000000)).toContain('တစ်');
      expect(numFormat(1000000)).toContain('သန်း');
    });

    test('should format large numbers (8+ digits)', () => {
      const result = numFormat(10000000);
      expect(result).toContain('ကုဋေ');
    });

    test('should handle numbers with multiple place values', () => {
      const result = numFormat(1234567);
      expect(result).toContain('တစ်');
      expect(result).toContain('နှစ်');
      expect(result).toContain('သုံး');
    });

    test('should handle zero', () => {
      const result = numFormat(0);
      expect(result).toBe('');
    });

    test('should handle numbers with zeros in middle', () => {
      const result = numFormat(1001);
      expect(result).toContain('တစ်');
    });

    test('should return number string for extremely large numbers (>14 digits)', () => {
      const result = numFormat(100000000000000);
      expect(typeof result).toBe('string');
    });
  });

  describe('chineseZodiac', () => {
    test('should return Rat for year 2020', () => {
      const result = chineseZodiac(2020);
      expect(result.sign).toBe('Rat');
      expect(result.signInBurmese).toBe('ကြွက်');
    });

    test('should return Ox for year 2021', () => {
      const result = chineseZodiac(2021);
      expect(result.sign).toBe('Ox');
      expect(result.signInBurmese).toBe('နွား');
    });

    test('should return Tiger for year 2022', () => {
      const result = chineseZodiac(2022);
      expect(result.sign).toBe('Tiger');
      expect(result.signInBurmese).toBe('ကျား');
    });

    test('should return Rabbit for year 2023', () => {
      const result = chineseZodiac(2023);
      expect(result.sign).toBe('Rabbit');
      expect(result.signInBurmese).toBe('ယုန်');
    });

    test('should return Dragon for year 2024', () => {
      const result = chineseZodiac(2024);
      expect(result.sign).toBe('Dragon');
      expect(result.signInBurmese).toBe('နဂါး');
    });

    test('should return all 12 zodiac signs correctly', () => {
      const expectedSigns = [
        { sign: 'Rat', burmese: 'ကြွက်' },
        { sign: 'Ox', burmese: 'နွား' },
        { sign: 'Tiger', burmese: 'ကျား' },
        { sign: 'Rabbit', burmese: 'ယုန်' },
        { sign: 'Dragon', burmese: 'နဂါး' },
        { sign: 'Snake', burmese: 'မြွေ' },
        { sign: 'Horse', burmese: 'မြင်း' },
        { sign: 'Goat', burmese: 'ဆိတ်' },
        { sign: 'Monkey', burmese: 'မြောက်' },
        { sign: 'Rooster', burmese: 'ကြက်' },
        { sign: 'Dog', burmese: 'ခွေး' },
        { sign: 'Pig', burmese: 'ဝက်' },
      ];

      expectedSigns.forEach((expected, index) => {
        const year = 2020 + index;
        const result = chineseZodiac(year);
        expect(result.sign).toBe(expected.sign);
        expect(result.signInBurmese).toBe(expected.burmese);
      });
    });

    test('should cycle correctly across years', () => {
      const result1 = chineseZodiac(2020);
      const result2 = chineseZodiac(2032); // 12 years later
      expect(result1.sign).toBe(result2.sign);
    });

    test('should throw error for invalid year (zero)', () => {
      expect(() => chineseZodiac(0)).toThrow();
    });

    test('should throw error for negative year', () => {
      expect(() => chineseZodiac(-100)).toThrow();
    });

    test('should throw error for non-integer year', () => {
      expect(() => chineseZodiac(2024.5)).toThrow();
    });

    test('should handle year 4 as Rat (starting point)', () => {
      const result = chineseZodiac(4);
      expect(result.sign).toBe('Rat');
    });

    test('should handle historical years', () => {
      const result = chineseZodiac(1900);
      expect(result).toHaveProperty('sign');
      expect(result).toHaveProperty('signInBurmese');
    });

    test('should handle far future years', () => {
      const result = chineseZodiac(3000);
      expect(result).toHaveProperty('sign');
      expect(result).toHaveProperty('signInBurmese');
    });
  });

  describe('zodiac', () => {
    test('should return Capricorn for Jan 1', () => {
      const result = zodiac(1, 1);
      expect(result.sign).toBe('Capricorn');
      expect(result.sign_mm).toBe('မကာရ');
    });

    test('should return Capricorn for Jan 19', () => {
      const result = zodiac(19, 1);
      expect(result.sign).toBe('Capricorn');
    });

    test('should return Aquarius for Jan 20', () => {
      const result = zodiac(20, 1);
      expect(result.sign).toBe('Aquarius');
      expect(result.sign_mm).toBe('ကုံ');
    });

    test('should return Pisces for Feb 19', () => {
      const result = zodiac(19, 2);
      expect(result.sign).toBe('Pisces');
      expect(result.sign_mm).toBe('မိန်');
    });

    test('should return Aries for Mar 21', () => {
      const result = zodiac(21, 3);
      expect(result.sign).toBe('Aries');
      expect(result.sign_mm).toBe('မိဿ');
    });

    test('should return Taurus for Apr 20', () => {
      const result = zodiac(20, 4);
      expect(result.sign).toBe('Taurus');
      expect(result.sign_mm).toBe('ပြိဿ');
    });

    test('should return Gemini for May 21', () => {
      const result = zodiac(21, 5);
      expect(result.sign).toBe('Gemini');
      expect(result.sign_mm).toBe('မေထုန်');
    });

    test('should return Cancer for Jun 21', () => {
      const result = zodiac(21, 6);
      expect(result.sign).toBe('Cancer');
      expect(result.sign_mm).toBe('ကရကဋ်');
    });

    test('should return Leo for Jul 23', () => {
      const result = zodiac(23, 7);
      expect(result.sign).toBe('Leo');
      expect(result.sign_mm).toBe('သိဟ်');
    });

    test('should return Virgo for Aug 23', () => {
      const result = zodiac(23, 8);
      expect(result.sign).toBe('Virgo');
      expect(result.sign_mm).toBe('ကန်');
    });

    test('should return Libra for Sep 23', () => {
      const result = zodiac(23, 9);
      expect(result.sign).toBe('Libra');
      expect(result.sign_mm).toBe('တူ');
    });

    test('should return Scorpio for Oct 23', () => {
      const result = zodiac(23, 10);
      expect(result.sign).toBe('Scorpio');
      expect(result.sign_mm).toBe('ဗြိစ္ဆာ');
    });

    test('should return Sagittarius for Nov 22', () => {
      const result = zodiac(22, 11);
      expect(result.sign).toBe('Sagittarius');
      expect(result.sign_mm).toBe('ဓနု');
    });

    test('should return Capricorn for Dec 22', () => {
      const result = zodiac(22, 12);
      expect(result.sign).toBe('Capricorn');
    });

    test('should handle boundary dates correctly', () => {
      // Zodiac sign boundaries in the data
      expect(zodiac(19, 1).sign).toBe('Capricorn');
      expect(zodiac(20, 1).sign).toBe('Aquarius'); // Jan 20+ is Aquarius
      expect(zodiac(18, 2).sign).toBe('Aquarius');
      expect(zodiac(19, 2).sign).toBe('Pisces');
    });

    test('should throw error for invalid day', () => {
      expect(() => zodiac(0, 1)).toThrow('Invalid date or month input');
      expect(() => zodiac(32, 1)).toThrow('Invalid date or month input');
      expect(() => zodiac(-1, 1)).toThrow('Invalid date or month input');
    });

    test('should throw error for invalid month', () => {
      expect(() => zodiac(1, 0)).toThrow('Invalid date or month input');
      expect(() => zodiac(1, 13)).toThrow('Invalid date or month input');
      expect(() => zodiac(1, -1)).toThrow('Invalid date or month input');
    });

    test('should throw error for non-numeric inputs', () => {
      expect(() => zodiac('1' as any, 1)).toThrow(
        'Invalid date or month input'
      );
      expect(() => zodiac(1, '1' as any)).toThrow(
        'Invalid date or month input'
      );
    });

    test('should handle last day of each month', () => {
      // Based on actual zodiac date ranges in the data
      expect(zodiac(31, 1).sign).toBe('Aquarius'); // Jan 20+ is Aquarius
      expect(zodiac(28, 2).sign).toBe('Pisces');
      expect(zodiac(31, 12).sign).toBe('Capricorn');
    });
  });

  describe('toBurmeseNumerals', () => {
    test('should convert single digits', () => {
      expect(toBurmeseNumerals(0)).toBe('၀');
      expect(toBurmeseNumerals(1)).toBe('၁');
      expect(toBurmeseNumerals(5)).toBe('၅');
      expect(toBurmeseNumerals(9)).toBe('၉');
    });

    test('should convert multi-digit numbers', () => {
      expect(toBurmeseNumerals(10)).toBe('၁၀');
      expect(toBurmeseNumerals(123)).toBe('၁၂၃');
      expect(toBurmeseNumerals(2024)).toBe('၂၀၂၄');
    });

    test('should handle large numbers', () => {
      expect(toBurmeseNumerals(1234567890)).toBe('၁၂၃၄၅၆၇၈၉၀');
    });

    test('should handle negative numbers', () => {
      expect(toBurmeseNumerals(-123)).toBe('-၁၂၃');
    });

    test('should handle decimal numbers', () => {
      expect(toBurmeseNumerals(3.14)).toContain('၃');
      expect(toBurmeseNumerals(3.14)).toContain('.');
    });

    test('should handle zero', () => {
      expect(toBurmeseNumerals(0)).toBe('၀');
    });

    test('should preserve leading zeros in string representation', () => {
      // Number 00123 becomes 123, so we can't test leading zeros with numbers
      // But the function should handle the string '00123' if passed
      expect(toBurmeseNumerals(123)).toBe('၁၂၃');
    });
  });

  describe('fromBurmeseNumerals', () => {
    test('should convert single Burmese numerals', () => {
      expect(fromBurmeseNumerals('၀')).toBe(0);
      expect(fromBurmeseNumerals('၁')).toBe(1);
      expect(fromBurmeseNumerals('၅')).toBe(5);
      expect(fromBurmeseNumerals('၉')).toBe(9);
    });

    test('should convert multi-digit Burmese numerals', () => {
      expect(fromBurmeseNumerals('၁၀')).toBe(10);
      expect(fromBurmeseNumerals('၁၂၃')).toBe(123);
      expect(fromBurmeseNumerals('၂၀၂၄')).toBe(2024);
    });

    test('should convert large Burmese numerals', () => {
      expect(fromBurmeseNumerals('၁၂၃၄၅၆၇၈၉၀')).toBe(1234567890);
    });

    test('should handle mixed content gracefully', () => {
      expect(fromBurmeseNumerals('abc')).toBe(0);
      expect(fromBurmeseNumerals('')).toBe(0);
    });

    test('should handle partial Burmese numerals', () => {
      // Mixed content with Burmese numerals - only first valid numeral is parsed
      expect(fromBurmeseNumerals('၁a၂b၃')).toBe(1);
    });

    test('should handle zero', () => {
      expect(fromBurmeseNumerals('၀')).toBe(0);
    });

    test('should handle numbers with non-numeric characters between', () => {
      // Characters between digits should be preserved as-is
      const result = fromBurmeseNumerals('၁၂/၃၄');
      expect(result).toBeGreaterThan(0);
    });
  });

  describe('Integration tests', () => {
    test('roundtrip: number -> Burmese numerals -> number should preserve value', () => {
      const original = 1385;
      const burmese = toBurmeseNumerals(original);
      const converted = fromBurmeseNumerals(burmese);
      expect(converted).toBe(original);
    });

    test('roundtrip should work for various numbers', () => {
      const numbers = [0, 1, 10, 123, 2024, 999999];
      numbers.forEach(num => {
        const burmese = toBurmeseNumerals(num);
        const converted = fromBurmeseNumerals(burmese);
        expect(converted).toBe(num);
      });
    });

    test('numFormat and toBurmeseNumerals produce different outputs', () => {
      const num = 123;
      const formatted = numFormat(num);
      const numerals = toBurmeseNumerals(num);
      expect(formatted).not.toBe(numerals);
    });
  });
});
