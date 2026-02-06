# MYCAL

> Myanmar Calendar - Zero dependency TypeScript library with performance optimizations

[![code style: prettier][prettier]][prettier-url]
[![npm][npm-download]][npm-dl-url]
[![contributions welcome][contri]][contri-url]
[![License: MIT][license]][license-url]
[![TypeScript][typescript]][typescript-url]

## Algorithm

[Algorithm, Program and Calculation of Myanmar Calendar][algorithm]

## What's New?

### v2.3 - Performance Optimizations (Latest)

**MyCal v2.3** brings massive performance improvements:

- ✅ **310x Faster Thingyan** - 1.8M ops/sec with LRU caching (was 5.8K ops/sec)
- ✅ **47x Faster Watat** - 703K ops/sec with cached nearest watat lookup (was 14.8K ops/sec)
- ✅ **99x Faster All Properties** - 161K ops/sec (was 1.6K ops/sec)
- ✅ **O(1) Zodiac Lookup** - Constant-time lookup table (was linear search)
- ✅ **Optimized Date Formatting** - Custom formatDate() replacing toLocaleDateString()
- ✅ **Smart Caching** - 256-entry LRU caches for expensive calculations

| Metric                 | Before       | After           | Improvement       |
| ---------------------- | ------------ | --------------- | ----------------- |
| Access all properties  | 1,629 ops/s  | 161,148 ops/s   | **98.9x faster**  |
| Thingyan calculation   | 5,796 ops/s  | 1,800,180 ops/s | **310.5x faster** |
| Watat year calculation | 14,813 ops/s | 702,967 ops/s   | **47.4x faster**  |
| Zodiac lookup          | 21.7M ops/s  | 25.3M ops/s     | **1.16x faster**  |

### v2.2 - Astrology Features

**MyCal v2.2** adds complete astrology support:

- ✅ **Maharbote** - Birth sign calculation based on weekday
- ✅ **Numerology** - Digital root calculation for any number
- ✅ **Chinese Zodiac** - Chinese zodiac with Burmese translations
- ✅ **Western Zodiac** - Zodiac sign from day/month
- ✅ **Number Formatting** - Convert numbers to Burmese words
- ✅ **Validation Tools** - Calendar consistency validation framework

### v2.0 - Major Rewrite

**MyCal v2.0** was a complete rewrite with:

- ✅ **Zero Dependencies** - No external packages required
- ✅ **Full TypeScript** - Type safety and better IDE support
- ✅ **Bun Runtime** - Modern tooling and faster builds
- ✅ **Smaller Bundle** - No dependency bloat (34.31 KB)
- ✅ **100% Backward Compatible** - Same API as v1.x

## Installation

### npm

```shell
npm install --save mycal
```

### bun

```shell
bun add mycal
```

### yarn

```shell
yarn add mycal
```

### web (Browser)

```html
<script type="module">
  import { Mycal } from 'https://unpkg.com/mycal@latest/dist/browser/index.js';
  // or use the IIFE build
  // <script src="https://unpkg.com/mycal@latest/dist/browser/index.js"></script>
</script>
```

## Usage

### JavaScript (CommonJS)

```javascript
const { Mycal } = require('mycal');

// Myanmar Independence Day
const myanmarDate = new Mycal('1/4/1948');

console.log(myanmarDate.year); // { en: '1309', my: '၁၃၀၉' }
console.log(myanmarDate.month); // { en: 'Pyatho', my: 'ပြာသို' }
console.log(myanmarDate.day); // { fd: { en: '9', my: '၉' }, mp: { en: 'Waning', my: 'လပြည့်ကျော်' } }
console.log(myanmarDate.weekday); // { en: 'Sunday', my: 'တနင်္ဂနွေ' }
console.log(myanmarDate.buddhistEraYear); // { en: '2491', my: '၂၄၉၁' }
```

### TypeScript (ESM)

```typescript
import { Mycal, type LocalizedString } from 'mycal';

// Type-safe usage
const myanmarDate: Mycal = new Mycal('2000-01-01');

const year: LocalizedString = myanmarDate.year;
console.log(year); // { en: '1361', my: '၁၃၆၁' }

// For today's date (no parameters)
const today = new Mycal();
console.log(today.month);
```

### Browser

```html
<!DOCTYPE html>
<html>
  <head>
    <script type="module">
      import { Mycal } from 'https://unpkg.com/mycal@latest/dist/browser/index.js';

      const date = new Mycal('2000-01-01');
      document.body.textContent = `${date.month.en} ${date.year.en}`;
    </script>
  </head>
  <body></body>
</html>
```

## API Reference

### `new Mycal(dateString?, options?)`

Creates a new Mycal instance.

**Parameters:**

- `dateString` (optional): Date string in formats like '2000-01-01', '1/1/2000', or undefined for current date
- `options` (optional): Configuration options (reserved for future use)

**Returns:** `Mycal` instance

### Properties

All properties are **read-only** and computed lazily.

#### `year`

Returns the Myanmar year (English and Myanmar numerals).

```typescript
const cal = new Mycal('2000-01-01');
console.log(cal.year);
// { en: '1361', my: '၁၃၆၁' }
```

#### `month`

Returns the Myanmar month name.

```typescript
const cal = new Mycal('2012-07-01'); // First Waso
console.log(cal.month);
// { en: 'First Waso', my: 'ပဝါဆို' }
```

#### `day`

Returns the fortnight day and moon phase.

```typescript
const cal = new Mycal('2012-05-23');
console.log(cal.day);
// {
//   fd: { en: '4', my: '၄' },    // Fortnight day
//   mp: { en: 'Waxing', my: 'လဆန်း' }  // Moon phase
// }
```

**Moon phases:**

- `Waxing` (လဆန်း) - Growing moon
- `Full Moon` (လပြည့်) - Full moon
- `Waning` (လပြည့်ကျော်) - Shrinking moon
- `New Moon` (လကွယ်) - New moon

#### `weekday`

Returns the Myanmar weekday.

```typescript
const cal = new Mycal('1948-01-04'); // Myanmar Independence Day
console.log(cal.weekday);
// { en: 'Sunday', my: 'တနင်္ဂနွေ' }
```

#### `buddhistEraYear`

Returns the Buddhist Era year.

```typescript
const cal = new Mycal('2000-01-01');
console.log(cal.buddhistEraYear);
// { en: '2543', my: '၂၅၄၃' }
```

#### `thingyan`

Returns Thingyan (Water Festival) information for the Myanmar year.

```typescript
const cal = new Mycal('2000-01-01');
console.log(cal.thingyan);
// {
//   akyo: '4/13/1999',              // Akyo day
//   akya: '4/14/1999',              // Akya day
//   akyat: ['4/15/1999'],           // Akyat days
//   atat: '4/16/1999',              // Atat day
//   new_year_day: '4/17/1999',      // New Year day
//   akyaTime: '1999-04-14T...',     // Akya exact time (ISO 8601)
//   atatTime: '1999-04-16T...'      // Atat exact time (ISO 8601)
// }
```

#### `watatYear`

Returns information about intercalary (leap) months/days.

```typescript
const cal = new Mycal('2013-01-01');
console.log(cal.watatYear);
// {
//   watat: true,       // Has extra month (35-day month)
//   isBigWatat: false  // Has extra day (30-day intercalary month)
// }
```

#### `waso`

Returns the full moon day of Waso.

```typescript
const cal = new Mycal('2013-01-01');
console.log(cal.waso);
// '8/2/2012'
```

#### `firstDayOfTagu`

Returns the first day of Tagu (Myanmar New Year).

```typescript
const cal = new Mycal('2013-01-01');
console.log(cal.firstDayOfTagu);
// '3/23/2012'
```

#### `maharbote`

Returns the birth sign (Maharbote) based on the day of the week.

```typescript
const cal = new Mycal('2000-01-01');
console.log(cal.maharbote);
// 'အထွန်း' (Binga)
```

**Birth signs:**

- `ဘင်္ဂ` (Binga) - Saturday
- `မရဏ` (Marana) - Sunday
- `အထွန်း` (Ahtone) - Monday
- `သိုက်` (Thike) - Tuesday
- `ရာဇာ` (Yaza) - Wednesday
- `ပုတိ` (Puti) - Thursday
- `အဓိပတိ` (Adipati) - Friday

#### `numerology`

Returns the numerology number (digital root) of the day of the month (1-9).

```typescript
const cal = new Mycal('2000-01-15');
console.log(cal.numerology);
// 6
```

#### `chineseZodiac`

Returns the Chinese zodiac sign with Burmese translation.

```typescript
const cal = new Mycal('2000-01-01');
console.log(cal.chineseZodiac);
// { en: 'Dragon', my: 'မြွေ' }
```

### Static Methods

#### `Mycal.zodiac(day, month)`

Returns the Western zodiac sign for a given day and month.

```typescript
const zodiac = Mycal.zodiac(15, 1); // January 15
console.log(zodiac);
// { en: 'Capricorn', my: 'ဆင်သည်' }
```

### Instance Methods

#### `numFormat(num)`

Formats a number to Burmese words.

```typescript
const cal = new Mycal('2000-01-01');
console.log(cal.numFormat(1234));
// 'တစ်ထောင်နှစ်ရာသုံးဆယ့်လေး'
```

## Standalone Functions

You can also import functions directly without creating a Mycal instance:

### BayDin (Astrology) Functions

```typescript
import {
  maharbote,
  numerology,
  numFormat,
  chineseZodiac,
  zodiac,
  toBurmeseNumerals,
  fromBurmeseNumerals,
} from 'mycal';

// Birth sign from weekday (0=Saturday, 6=Friday)
const sign = maharbote(0); // Saturday -> 'ဘင်္ဂ'

// Numerology from day of month
const num = numerology(15); // 6

// Format number to Burmese words
const words = numFormat(1234); // 'တစ်ထောင်နှစ်ရာသုံးဆယ့်လေး'

// Chinese zodiac from year
const cz = chineseZodiac(2000); // { en: 'Dragon', my: 'မြွေ' }

// Western zodiac from day and month
const wz = zodiac(15, 1); // { en: 'Capricorn', my: 'ဆင်သည်' }

// Number to Burmese numerals
const burmeseNum = toBurmeseNumerals(1234); // '၁၂၃၄'

// Burmese numerals to number
const normalNum = fromBurmeseNumerals('၁၂၃၄'); // 1234
```

### Validation Functions

```typescript
import {
  validateMyanmarYear,
  validateWatatYear,
  validateFullMoonDay,
  validateThingyan,
  validateCalendarConsistency,
  isValidYear,
  getValidationSummary,
} from 'mycal';

// Validate a Myanmar year
const result = validateMyanmarYear(1361);
console.log(result.valid); // true/false
console.log(result.issues); // Array of issues if any

// Get validation summary for a range
const summary = getValidationSummary(1300, 1400);
```

## TypeScript Types

All types are exported for TypeScript users:

```typescript
import type {
  LocalizedString, // { en: string, my: string }
  ThingyanResult, // Thingyan information
  WatatYearResult, // Watat year information
  MyanmarDayResult, // Day and moon phase
  MoonPhase, // 'waxing' | 'full' | 'waning' | 'new'
  MonthType, // 'hma' | 'hgu'
  MyanmarMonth, // 0 | 1 | 2 | ... | 12
  ChineseZodiacResult, // { en: string, my: string }
  ZodiacResult, // { en: string, my: string }
  ValidationResult, // { valid: boolean, issues: ValidationIssue[] }
  ValidationIssue, // { type: string, message: string, ... }
} from 'mycal';
```

## Migration from v1.x to v2.x

**Good news!** The API is 100% backward compatible. All your existing code will continue to work:

### Before (v1.x)

```javascript
const mycal = require('mycal');
const date = new mycal('2000-01-01');
console.log(date.year); // { en: '1361', my: '၁၃၆၁' }
```

### After (v2.x) - Same API!

```javascript
const { Mycal } = require('mycal');
const date = new Mycal('2000-01-01');
console.log(date.year); // { en: '1361', my: '၁၃၆၁' }
```

**Plus new features in v2.2 and v2.3:**

```typescript
import { Mycal } from 'mycal';
const date = new Mycal('2000-01-01');

// v2.2 - Astrology features
console.log(date.maharbote); // Birth sign
console.log(date.numerology); // Numerology number
console.log(date.chineseZodiac); // Chinese zodiac
console.log(Mycal.zodiac(15, 1)); // Western zodiac

// v2.3 - Performance improvements (automatic, no API changes)
// - 310x faster Thingyan calculations with LRU caching
// - 47x faster Watat year calculations
// - 99x faster when accessing all properties
// - O(1) zodiac lookups
```

## Development

### Setup

```bash
# Clone the repo
git clone https://github.com/AungMyoKyaw/mycal.git
cd mycal

# Install dependencies (with Bun)
bun install

# Or with npm
npm install
```

### Commands

```bash
# Run tests
bun test
# or
npm test

# Type checking
bun run typecheck
# or
npm run typecheck

# Build
bun run build
# or
npm run build

# Development mode (with watch)
bun run dev

# Linting
bun run lint
bun run lint:fix

# Formatting
bun run format
bun run format:check

# Full validation
bun run validate  # Type check + lint + format check
bun run ci        # Full CI pipeline

# Performance benchmark
bun run benchmark  # Run performance benchmarks
```

### Build Outputs

The build process creates three outputs:

1. **Node.js**: `dist/node/index.js` - CommonJS build for Node.js
2. **Browser**: `dist/browser/index.js` - ESM build for browsers
3. **Types**: `dist/types/` - TypeScript declaration files

## Performance

MyCal v2.3 includes significant performance optimizations:

### Benchmarks

| Operation                  | Before           | After            | Improvement       |
| -------------------------- | ---------------- | ---------------- | ----------------- |
| **Access all properties**  | 1,629 ops/s      | 161,148 ops/s    | **98.9x faster**  |
| **Thingyan calculation**   | 5,796 ops/s      | 1,800,180 ops/s  | **310.5x faster** |
| **Watat year calculation** | 14,813 ops/s     | 702,967 ops/s    | **47.4x faster**  |
| **Single date (cold)**     | 629,855 ops/s    | 1,134,859 ops/s  | **1.8x faster**   |
| **Zodiac lookup**          | 21,711,604 ops/s | 25,266,358 ops/s | **1.16x faster**  |

### Optimizations

1. **LRU Caching** - 256-entry caches for:
   - Watat year calculations
   - Thingyan calculations
   - Waso calculations
   - First day of Tagu calculations

2. **Nearest Watat Cache** - Eliminates repeated backward loops

3. **Optimized Date Formatting** - Custom `formatDate()` function replacing expensive `toLocaleDateString()`

4. **O(1) Zodiac Lookup** - Constant-time lookup table instead of linear search

5. **Cached Reversed Map** - Pre-computed Burmese numeral conversion map

Run benchmarks:

```bash
bun run benchmark
```

## Test

```shell
npm test
# or
bun test
```

## Build

```shell
npm run build
# or
bun run build
```

## License

MIT © [Aung Myo Kyaw](https://github.com/AungMyoKyaw)

## Algorithm

Based on [Algorithm, Program and Calculation of Myanmar Calendar][algorithm] by Coolemerald.

---

[algorithm]: https://coolemerald.blogspot.com/2013/06/algorithm-program-and-calculation-of.html
[contri]: https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat-square
[contri-url]: https://github.com/AungMyoKyaw/mycal/issues
[npm-download]: https://img.shields.io/npm/dt/mycal.svg?style=flat-square
[npm-dl-url]: https://www.npmjs.com/package/mycal
[license]: https://img.shields.io/badge/License-MIT-brightgreen.svg?style=flat-square
[license-url]: https://opensource.org/licenses/MIT
[prettier]: https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square
[prettier-url]: https://github.com/prettier/prettier
[typescript]: https://img.shields.io/badge/TypeScript-5.0-blue.svg?style=flat-square
[typescript-url]: https://www.typescriptlang.org/
