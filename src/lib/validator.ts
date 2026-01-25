/**
 * Myanmar Calendar Validator
 * Tools for validating calendar calculations and detecting issues
 */

import { isWatatYear } from './intercalary.js';
import { thingyan } from './thingyan.js';
import { CONST, getExceptions, findException } from '../constants.js';
import { julianToDate } from '../utils/julian.js';
import type { ValidationResult, ValidationIssue, WatatValidationResult, FullMoonValidationResult, ThingyanValidationResult, CalendarConsistencyResult } from '../types.js';

const { LM, SY, MO } = CONST;

/**
 * Validate a Myanmar year's calculations
 */
export function validateMyanmarYear(my: number): ValidationResult {
  const issues: ValidationIssue[] = [];
  const warnings: ValidationIssue[] = [];

  // Check if year is in valid range
  if (my < 0) {
    // Just a warning, not an error
    warnings.push({
      type: 'warning',
      code: 'NEGATIVE_YEAR',
      message: `Myanmar year ${my} is negative. Calendar may be inaccurate for years before 0 ME.`,
      value: my,
    });
  }

  if (my > 9999) {
    // Just a warning, not an error
    warnings.push({
      type: 'warning',
      code: 'FUTURE_YEAR',
      message: `Myanmar year ${my} is far in the future. Predictions may be inaccurate.`,
      value: my,
    });
  }

  // Check era assignment
  let expectedEra: 1 | 2 | 3;
  if (my >= 1312) expectedEra = 3;
  else if (my >= 1217) expectedEra = 2;
  else expectedEra = 1;

  const watatInfo = isWatatYear(my);
  if (watatInfo.era !== expectedEra) {
    issues.push({
      type: 'error',
      code: 'ERA_MISMATCH',
      message: `Year ${my} assigned to era ${watatInfo.era}, expected era ${expectedEra}.`,
      value: my,
    });
  }

  // Check excess days
  if (watatInfo.ed < 0) {
    issues.push({
      type: 'error',
      code: 'NEGATIVE_EXCESS_DAYS',
      message: `Excess days (${watatInfo.ed}) cannot be negative.`,
      value: watatInfo.ed,
    });
  }

  // Note: ed can be >= LM after adjustment (when ed < TA, we add LM)
  // Maximum adjusted ed is TA + LM ≈ 33.16, which is valid
  // Only check for truly impossible values (ed > TA + LM * 2)
  if (watatInfo.ed > 100) {
    issues.push({
      type: 'error',
      code: 'EXCESS_DAYS_TOO_LARGE',
      message: `Excess days (${watatInfo.ed}) is unreasonably large.`,
      value: watatInfo.ed,
    });
  }

  // Check for exceptions
  const exceptions = getExceptions(my);
  const fmeException = findException(my, exceptions.fme);
  const wteException = findException(my, exceptions.wte);

  if (fmeException !== undefined) {
    warnings.push({
      type: 'info',
      code: 'FME_EXCEPTION',
      message: `Year ${my} has full moon day exception: ${fmeException > 0 ? '+' : ''}${fmeException} day(s).`,
      value: fmeException,
    });
  }

  if (wteException !== undefined) {
    warnings.push({
      type: 'info',
      code: 'WTE_EXCEPTION',
      message: `Year ${my} has watat year exception: ${wteException === 1 ? 'watat' : 'common'}.`,
      value: wteException,
    });
  }

  return {
    valid: issues.length === 0,
    issues,
    warnings,
    year: my,
    era: watatInfo.era,
    isWatat: watatInfo.isWatatYear,
    excessDays: watatInfo.ed,
  };
}

/**
 * Validate watat (intercalary year) calculations
 */
export function validateWatatYear(my: number): WatatValidationResult {
  const baseValidation = validateMyanmarYear(my);
  const watatInfo = isWatatYear(my);
  const issues: ValidationIssue[] = [...baseValidation.issues];
  const warnings: ValidationIssue[] = [...baseValidation.warnings];

  // Check watat consistency
  if (watatInfo.era === 3) {
    // Third era uses excess days calculation
    if (watatInfo.ed < CONST.thirdEra.TA) {
      // Should have been adjusted
      const adjustedEd = watatInfo.ed + LM;
      if (adjustedEd < CONST.thirdEra.TW!) {
        if (watatInfo.isWatatYear) {
          issues.push({
            type: 'error',
            code: 'WATAT_THRESHOLD_VIOLATION',
            message: `Year ${my} marked as watat but adjusted excess days (${adjustedEd}) < threshold (${CONST.thirdEra.TW}).`,
            value: { ed: watatInfo.ed, adjustedEd, threshold: CONST.thirdEra.TW },
          });
        }
      }
    }
  }

  if (watatInfo.era === 1) {
    // First era uses metonic cycle
    const remainder = (my * 7 + 2) % 19;
    const isWatatByCycle = [2, 5, 7, 10, 13, 15, 18].includes(remainder);

    if (isWatatByCycle !== watatInfo.isWatatYear) {
      // Check if there's an exception
      const exceptions = getExceptions(my);
      const wteException = findException(my, exceptions.wte);

      if (wteException === undefined) {
        // Not an exception - this might be an issue
        warnings.push({
          type: 'warning',
          code: 'METONIC_CYCLE_VIOLATION',
          message: `Year ${my} remainder ${remainder} ${isWatatByCycle ? 'should be' : 'should not be'} watat (no exception found).`,
          value: { remainder, expected: isWatatByCycle, actual: watatInfo.isWatatYear },
        });
      }
    }
  }

  return {
    ...baseValidation,
    issues,
    warnings,
    watatValid: issues.length === 0,
    metonicRemainder: watatInfo.era === 1 ? (my * 7 + 2) % 19 : undefined,
    isWatatByAlgorithm: watatInfo.isWatatYear,
    hasException: findException(my, getExceptions(my).wte) !== undefined,
  };
}

/**
 * Validate full moon day calculations
 */
export function validateFullMoonDay(my: number): FullMoonValidationResult {
  const baseValidation = validateMyanmarYear(my);
  const watatInfo = isWatatYear(my);

  let calculatedJd = 0;
  let adjustedJd = 0;
  const issues: ValidationIssue[] = [...baseValidation.issues];

  if (watatInfo.isWatatYear) {
    // Calculate full moon day
    let WO: number;

    switch (true) {
      case my < 1100:
        WO = CONST.firstEra.WO1!;
        break;
      case my >= 1100:
        WO = CONST.firstEra.WO2!;
        break;
      default:
        WO = 0;
    }

    // Calculate based on era
    switch (watatInfo.era) {
      case 1:
        calculatedJd = Math.round(SY * my + MO - watatInfo.ed + 4.5 * LM + WO);
        break;
      case 2:
        WO = CONST.secondEra.WO!;
        calculatedJd = Math.round(SY * my + MO - watatInfo.ed + 4.5 * LM + WO);
        break;
      case 3:
        WO = CONST.thirdEra.WO!;
        calculatedJd = Math.round(SY * my + MO - watatInfo.ed + 4.5 * LM + WO);
        break;
    }

    adjustedJd = calculatedJd;

    // Apply exception
    const exceptions = getExceptions(my);
    const fmeException = findException(my, exceptions.fme);
    if (fmeException !== undefined) {
      adjustedJd = calculatedJd + fmeException;
      baseValidation.warnings.push({
        type: 'info',
        code: 'FME_EXCEPTION_APPLIED',
        message: `Full moon day adjusted by ${fmeException > 0 ? '+' : ''}${fmeException} day(s).`,
        value: { calculated: calculatedJd, adjusted: adjustedJd, adjustment: fmeException },
      });
    }

    // Validate the full moon day
    const date = julianToDate(adjustedJd);

    if (date.getUTCFullYear() < 1900 || date.getUTCFullYear() > 2100) {
      baseValidation.warnings.push({
        type: 'warning',
        code: 'FULLMOON_OUT_OF_RANGE',
        message: `Full moon day falls outside typical validation range: ${date.toISOString()}.`,
        value: date,
      });
    }

    // Check if full moon is in Waso (July/August)
    const month = date.getUTCMonth();
    if (month < 6 || month > 7) {
      baseValidation.warnings.push({
        type: 'info',
        code: 'FULLMOON_NOT_IN_WASO',
        message: `Full moon day of Waso is not in Waso month: ${date.getUTCMonth() + 1}/${date.getUTCDate()}.`,
        value: { month: date.getUTCMonth(), day: date.getUTCDate() },
      });
    }
  }

  return {
    ...baseValidation,
    issues,
    fullMoonValid: issues.filter(i => i.type === 'error').length === 0,
    calculatedJulianDay: calculatedJd,
    adjustedJulianDay: adjustedJd,
    hasFmeException: findException(my, getExceptions(my).fme) !== undefined,
  };
}

/**
 * Validate Thingyan calculations
 */
export function validateThingyan(my: number): ThingyanValidationResult {
  const baseValidation = validateMyanmarYear(my);
  const issues: ValidationIssue[] = [...baseValidation.issues];

  // Calculate Thingyan
  const thingyanData = thingyan(my);

  // Parse dates
  const akyoDate = new Date(thingyanData.akyo);
  const akyaDate = new Date(thingyanData.akya);
  const atatDate = new Date(thingyanData.atat);
  const newYearDate = new Date(thingyanData.new_year_day);

  // Validate Thingyan order
  if (akyoDate >= akyaDate) {
    issues.push({
      type: 'error',
      code: 'THINGYAN_ORDER_VIOLATION',
      message: `Akyo day (${thingyanData.akyo}) must be before Akya day (${thingyanData.akya}).`,
      value: { akyo: thingyanData.akyo, akya: thingyanData.akya },
    });
  }

  if (akyaDate >= atatDate) {
    issues.push({
      type: 'error',
      code: 'THINGYAN_ORDER_VIOLATION',
      message: `Akya day (${thingyanData.akya}) must be before Atat day (${thingyanData.atat}).`,
      value: { akya: thingyanData.akya, atat: thingyanData.atat },
    });
  }

  if (atatDate >= newYearDate) {
    issues.push({
      type: 'error',
      code: 'THINGYAN_ORDER_VIOLATION',
      message: `Atat day (${thingyanData.atat}) must be before New Year day (${thingyanData.new_year_day}).`,
      value: { atat: thingyanData.atat, new_year: thingyanData.new_year_day },
    });
  }

  // Validate akyat days
  if (thingyanData.akyat.length < 1) {
    issues.push({
      type: 'error',
      code: 'NO_AKYAT_DAYS',
      message: 'Thingyan must have at least one akyat day.',
      value: thingyanData.akyat,
    });
  }

  if (thingyanData.akyat.length > 3) {
    issues.push({
      type: 'warning',
      code: 'UNUSUAL_AKYAT_COUNT',
      message: `Thingyan has ${thingyanData.akyat.length} akyat days, which is unusual (typically 1-3).`,
      value: thingyanData.akyat.length,
    });
  }

  // Validate Thingyan length
  const akyaTimeDate = new Date(thingyanData.akyaTime);
  const atatTimeDate = new Date(thingyanData.atatTime);
  const thingyanLength = (atatTimeDate.getTime() - akyaTimeDate.getTime()) / (1000 * 60 * 60 * 24);
  const expectedLength = my >= CONST.SE3 ? 2.169918982 : 2.1675;

  if (Math.abs(thingyanLength - expectedLength) > 0.01) {
    issues.push({
      type: 'warning',
      code: 'THINGYAN_LENGTH_MISMATCH',
      message: `Thingyan length (${thingyanLength.toFixed(6)}) differs from expected (${expectedLength}).`,
      value: { actual: thingyanLength, expected: expectedLength },
    });
  }

  return {
    ...baseValidation,
    issues,
    thingyanValid: issues.filter(i => i.type === 'error').length === 0,
    akyatDaysCount: thingyanData.akyat.length,
    thingyanLength: thingyanLength,
    expectedLength: expectedLength,
  };
}

/**
 * Validate calendar consistency across multiple years
 */
export function validateCalendarConsistency(startYear: number, endYear: number): CalendarConsistencyResult {
  const issues: ValidationIssue[] = [];
  const warnings: ValidationIssue[] = [];
  const yearResults: Map<number, ReturnType<typeof validateMyanmarYear>> = new Map();

  for (let my = startYear; my <= endYear; my++) {
    const result = validateMyanmarYear(my);
    yearResults.set(my, result);

    if (!result.valid) {
      issues.push(...result.issues.map(i => ({
        ...i,
        context: { year: my, ...i },
      })));
    }

    warnings.push(...result.warnings.map(i => ({
      ...i,
      context: { year: my, ...i },
    })));

    // Check for consecutive common years beyond maximum
    if (my > startYear && !result.isWatat) {
      const prevResult = yearResults.get(my - 1);
      if (prevResult && !prevResult.isWatat) {
        // Check two years before
        if (my - 1 > startYear) {
          const prevPrevResult = yearResults.get(my - 2);
          if (prevPrevResult && !prevPrevResult.isWatat) {
            // Three consecutive common years - might be unusual
            warnings.push({
              type: 'info',
              code: 'CONSECUTIVE_COMMON_YEARS',
              message: `Three consecutive common years found: ${my - 2}, ${my - 1}, ${my}.`,
              value: { years: [my - 2, my - 1, my] },
            });
          }
        }
      }
    }
  }

  // Check for watat year frequency
  const watatYears = Array.from(yearResults.values()).filter(r => r.isWatat).length;
  const totalYears = endYear - startYear + 1;
  const watatFrequency = watatYears / totalYears;

  if (watatFrequency < 0.3 || watatFrequency > 0.4) {
    warnings.push({
      type: 'info',
      code: 'WATAT_FREQUENCY',
      message: `Watat year frequency (${(watatFrequency * 100).toFixed(1)}%) outside typical range (30-40%).`,
      value: { watatYears, totalYears, frequency: watatFrequency },
    });
  }

  return {
    valid: issues.length === 0,
    issues,
    warnings,
    startYear,
    endYear,
    totalYears: totalYears,
    watatYears,
    commonYears: totalYears - watatYears,
    watatFrequency,
    yearResults: Object.fromEntries(yearResults),
  };
}

/**
 * Quick validation check - returns true if all validations pass
 */
export function isValidYear(my: number): boolean {
  const validation = validateMyanmarYear(my);
  return validation.valid && validation.issues.length === 0;
}

/**
 * Get validation summary for display
 */
export function getValidationSummary(validation: ValidationResult): string {
  const lines = [
    `Validation for Myanmar Year ${validation.year}:`,
    `  Era: ${validation.era}`,
    `  Is Watat: ${validation.isWatat}`,
    `  Excess Days: ${validation.excessDays.toFixed(6)}`,
    `  Valid: ${validation.valid ? '✓' : '✗'}`,
  ];

  if (validation.issues.length > 0) {
    lines.push(`  Issues (${validation.issues.length}):`);
    validation.issues.forEach((issue, i) => {
      lines.push(`    ${i + 1}. [${issue.code.toUpperCase()}] ${issue.message}`);
    });
  }

  if (validation.warnings.length > 0) {
    lines.push(`  Warnings (${validation.warnings.length}):`);
    validation.warnings.forEach((warning, i) => {
      lines.push(`    ${i + 1}. [${warning.code.toUpperCase()}] ${warning.message}`);
    });
  }

  return lines.join('\n');
}
