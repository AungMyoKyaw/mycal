# Myanmar Calendar (MYCAL) - TypeScript Edition

A Myanmar calendar library completely rewritten in TypeScript with **zero external dependencies**.

## Features

- 🚀 **Zero Dependencies**: No external packages required
- 📦 **TypeScript**: Full type safety and modern development experience  
- 🌏 **Myanmar Calendar**: Accurate Myanmar calendar calculations
- 🎎 **Cultural Features**: Thingyan, Watat years, Buddhist era, and more
- 📅 **Date Conversion**: Convert between Gregorian and Myanmar calendar systems
- 🏗️ **Modern Build**: Clean TypeScript compilation, no complex build tools

## Installation

```bash
npm install mycal
```

## Usage

```javascript
const MYCAL = require('mycal').default;

// Create calendar instance
const cal = new MYCAL('1/1/2000');

// Get Myanmar calendar information
console.log(cal.year);          // { en: '1361', my: '၁၃၆၁' }
console.log(cal.month);         // { en: 'Nadaw', my: 'နတ်တော်' }
console.log(cal.day);           // { fd: { en: '10', my: '၁၀' }, mp: { en: 'Waning', my: 'လပြည့်ကျော်' } }
console.log(cal.weekday);       // { en: 'Saturday', my: 'စနေ' }

// Get special calendar information
console.log(cal.buddhistEraYear);  // Buddhist Era year
console.log(cal.watatYear);        // Intercalary year info
console.log(cal.thingyan);         // Thingyan festival dates
```

## API

### Constructor
- `new MYCAL(dateString?)` - Create a calendar instance for the given date (defaults to current date)

### Properties
- `year` - Myanmar year in English and Myanmar numerals
- `buddhistEraYear` - Buddhist Era year
- `month` - Myanmar month name
- `day` - Myanmar day with fortnight day and moon phase
- `weekday` - Day of the week
- `watatYear` - Intercalary year information
- `waso` - Waso full moon date
- `firstDayOfTagu` - First day of Tagu
- `thingyan` - Thingyan festival dates

## Migration from v1.x

Version 2.0 is a complete rewrite with:
- ✅ **Zero breaking changes** - Same API as v1.x
- ✅ **No external dependencies** - Removed `julian` and `mynum` dependencies
- ✅ **TypeScript support** - Full type definitions included
- ✅ **Modern build system** - Simplified build process
- ✅ **Better performance** - Optimized calculations

## Development

```bash
# Install dependencies
npm install

# Build the project
npm run build

# Run tests
npm test

# Watch mode for development
npm run dev
```

## License

MIT - see [LICENSE](LICENSE) file for details.

## Credits

Original algorithm and implementation by Aung Myo Kyaw.
TypeScript rewrite maintains full compatibility while modernizing the codebase.