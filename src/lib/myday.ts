/**
 * Myanmar Day Calculation
 * Determines the fortnight day and moon phase
 */

import { moon } from '../localization.js';
import { localization } from '../localization.js';
import type { MyanmarDayResult } from '../types.js';

/**
 * Calculate Myanmar day (fortnight day and moon phase)
 *
 * @param md - Myanmar Day
 * @param mml - Length of Myanmar Month
 * @returns Myanmar fortnight day and moon phase
 */
export function myDay(md: number, mml: number): MyanmarDayResult {
  const fd = md - 15 * Math.floor(md / 16);

  const mp =
    Math.floor((md + 1) / 16) + Math.floor(md / 16) + Math.floor(md / mml);

  return {
    fd: localization.number(Math.round(fd)), // Fortnight day with number localization
    mp: moon[mp] || moon[0], // Phase of moon (default to waxing if out of bounds)
  };
}
