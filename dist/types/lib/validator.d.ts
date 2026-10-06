/**
 * Myanmar Calendar Validator
 * Tools for validating calendar calculations and detecting issues
 */
import type { ValidationResult, WatatValidationResult, FullMoonValidationResult, ThingyanValidationResult, CalendarConsistencyResult } from '../types.js';
/**
 * Validate a Myanmar year's calculations
 */
export declare function validateMyanmarYear(my: number): ValidationResult;
/**
 * Validate watat (intercalary year) calculations
 */
export declare function validateWatatYear(my: number): WatatValidationResult;
/**
 * Validate full moon day calculations
 */
export declare function validateFullMoonDay(my: number): FullMoonValidationResult;
/**
 * Validate Thingyan calculations
 */
export declare function validateThingyan(my: number): ThingyanValidationResult;
/**
 * Validate calendar consistency across multiple years
 */
export declare function validateCalendarConsistency(startYear: number, endYear: number): CalendarConsistencyResult;
/**
 * Quick validation check - returns true if all validations pass
 */
export declare function isValidYear(my: number): boolean;
/**
 * Get validation summary for display
 */
export declare function getValidationSummary(validation: ValidationResult): string;
//# sourceMappingURL=validator.d.ts.map