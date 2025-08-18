import { moon, number } from './localization';
import type { LocalizedText, MyanmarNumberResult } from './localization';

export interface MyanmarDayInfo {
  fd: MyanmarNumberResult; // FortNight Day
  mp: LocalizedText; // Phase of Moon
}

/**
 * Calculate Myanmar Day information
 * 
 * @param md Myanmar Day (1-30)
 * @param mml Myanmar Month Length
 * @returns Myanmar Day information with fortnight day and moon phase
 */
export function getMyanmarDay(md: number, mml: number): MyanmarDayInfo {
  const fd = md - 15 * Math.floor(md / 16);
  const mp = Math.floor((md + 1) / 16) + Math.floor(md / 16) + Math.floor(md / mml);

  return {
    fd: number(fd), //FortNight Day
    mp: moon[mp] //Phase of Moon
  };
}