# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.0.0] - 2025-01-26

### Added

- **TypeScript Support**: Full TypeScript implementation with type definitions
- **Bun Runtime**: Native Bun support with built-in test runner and bundler
- **Type Exports**: All types are now exported for TypeScript users
- **Better DX**: Improved IDE support with TypeScript
- **Documentation**: Comprehensive API documentation and migration guide

### Changed

- **Zero Dependencies**: Removed all external dependencies
  - Replaced `julian` package with native implementation
  - Replaced `mynum` package with native implementation
  - Removed build tools (`gulp`, `webpack`, `babel`) - using Bun's built-in tools
- **Build System**:
  - New build process using Bun instead of Gulp/Webpack
  - Dual build output (Node.js + Browser)
  - Automatic TypeScript declaration generation
- **Package Structure**:
  - `src/index.ts` (TypeScript) instead of `src/index.js`
  - All library modules converted to TypeScript
  - New `src/types.ts` with all type definitions
  - New `src/utils/` directory with utility functions
  - Removed old build files (`gulpfile.js`, `webpack.config.js`, `.babelrc`)

### Fixed

- Julian date conversion now properly preserves fractional time
- Improved accuracy in Thingyan time calculations
- Better type safety prevents common bugs

### Performance

- Faster build times with Bun (2-3x faster than Node.js)
- Smaller bundle size (no external dependencies)
- More efficient runtime performance

### Breaking Changes

**None!** The API is 100% backward compatible with v1.x.

```javascript
// v1.x (still works in v2.0)
const mycal = require('mycal');
const date = new mycal('2000-01-01');

// v2.0 (recommended)
const { Mycal } = require('mycal');
const date = new Mycal('2000-01-01');

// v2.0 with TypeScript (new feature)
import { Mycal } from 'mycal';
const date = new Mycal('2000-01-01');
```

### Migration Guide

1. **Update import** (optional, old import still works):
   ```javascript
   // Before
   const mycal = require('mycal');
   const date = new mycal('2000-01-01');

   // After (recommended)
   const { Mycal } = require('mycal');
   const date = new Mycal('2000-01-01');
   ```

2. **TypeScript users** (new feature):
   ```typescript
   import { Mycal, type LocalizedString } from 'mycal';

   const date: Mycal = new Mycal('2000-01-01');
   const year: LocalizedString = date.year;
   ```

3. **Build tools** (if you were building from source):
   - Old: `gulp` or `npm run build`
   - New: `bun run build` or `npm run build` (still works!)

### Deprecated

None.

### Removed

- **Dependencies**:
  - `julian` (v0.2.0) - replaced with native implementation
  - `mynum` (v1.0.0) - replaced with native implementation
  - `babel-core` (v6.26.3) - using Bun's built-in TypeScript
  - `babel-loader` (v7.1.5) - not needed
  - `babel-preset-env` (v1.7.0) - not needed
  - `gulp` (v4.0.0) - using Bun's build
  - `gulp-babel` (v7.0.1) - not needed
  - `webpack` (v4.15.1) - using Bun's build

- **Build Files**:
  - `gulpfile.js`
  - `webpack.config.js`
  - `.babelrc`

### Security

No security issues.

## [1.2.1] - 2021-01-XX

### Fixed
- Bug fixes and improvements

## [1.2.0] - 2020-XX-XX

### Added
- Flat style badge
- Various improvements

## [1.0.0] - 2018-XX-XX

### Added
- Initial release
- Myanmar calendar conversion
- Thingyan calculations
- Watat year detection
- Buddhist Era year conversion

[2.0.0]: https://github.com/AungMyoKyaw/mycal/compare/v1.2.1...v2.0.0
[1.2.1]: https://github.com/AungMyoKyaw/mycal/releases/tag/v1.2.1
[1.2.0]: https://github.com/AungMyoKyaw/mycal/releases/tag/v1.2.0
[1.0.0]: https://github.com/AungMyoKyaw/mycal/releases/tag/v1.0.0
