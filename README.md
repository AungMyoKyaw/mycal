# MYCAL

> Myanmar Calendar - Zero dependency TypeScript library

[![code style: prettier][prettier]][prettier-url]
[![npm][npm-download]][npm-dl-url]
[![contributions welcome][contri]][contri-url]
[![License: MIT][license]][license-url]
[![TypeScript][typescript]][typescript-url]

## Algorithm

[Algorithm, Program and Calculation of Myanmar Calendar][algorithm]

## v2.0 - What's New?

**MyCal v2.0** is a complete rewrite with:

- ✅ **Zero Dependencies** - No external packages required
- ✅ **TypeScript** - Full type safety and better IDE support
- ✅ **Bun Runtime** - Faster performance and modern tooling
- ✅ **Smaller Bundle** - No dependency bloat
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

console.log(myanmarDate.year);         // { en: '1309', my: '၁၃၀၉' }
console.log(myanmarDate.month);        // { en: 'Pyatho', my: 'ပြာသို' }
console.log(myanmarDate.day);          // { fd: { en: '9', my: '၉' }, mp: { en: 'Waning', my: 'လပြည့်ကျော်' } }
console.log(myanmarDate.weekday);      // { en: 'Sunday', my: 'တနင်္ဂနွေ' }
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

## TypeScript Types

All types are exported for TypeScript users:

```typescript
import type {
  LocalizedString,        // { en: string, my: string }
  ThingyanResult,         // Thingyan information
  WatatYearResult,        // Watat year information
  MyanmarDayResult,       // Day and moon phase
  MoonPhase,              // 'waxing' | 'full' | 'waning' | 'new'
  MonthType,              // 'hma' | 'hgu'
  MyanmarMonth,           // 0 | 1 | 2 | ... | 12
} from 'mycal';
```

## Migration from v1.x to v2.0

**Good news!** The API is 100% backward compatible. The only changes are internal:

### Before (v1.x)
```javascript
const mycal = require('mycal');
const date = new mycal('2000-01-01');
console.log(date.year); // { en: '1361', my: '၁၃၆၁' }
```

### After (v2.0) - Same API!
```javascript
const { Mycal } = require('mycal');
const date = new Mycal('2000-01-01');
console.log(date.year); // { en: '1361', my: '၁၃၆၁' }
```

**Or use TypeScript:**
```typescript
import { Mycal } from 'mycal';
const date = new Mycal('2000-01-01');
console.log(date.year); // { en: '1361', my: '၁၃၆၁' }
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
```

### Build Outputs

The build process creates three outputs:

1. **Node.js**: `dist/node/index.js` - CommonJS build for Node.js
2. **Browser**: `dist/browser/index.js` - ESM build for browsers
3. **Types**: `dist/types/` - TypeScript declaration files

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
