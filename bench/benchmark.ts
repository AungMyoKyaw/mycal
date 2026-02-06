/**
 * Performance Benchmark Suite for MyCal
 *
 * Run with: bun run benchmark
 */

import { Mycal } from '../src/index.js';

// Simple benchmark helper
function benchmark(name: string, fn: () => void, iterations = 10000) {
  const start = performance.now();
  for (let i = 0; i < iterations; i++) {
    fn();
  }
  const end = performance.now();
  const totalTime = end - start;
  const avgTime = totalTime / iterations;
  const opsPerSec = (iterations / totalTime) * 1000;

  console.log(`${name}:`);
  console.log(`  Total: ${totalTime.toFixed(2)}ms`);
  console.log(`  Avg: ${avgTime.toFixed(4)}ms`);
  console.log(`  Ops/sec: ${opsPerSec.toFixed(0)}`);
  console.log('');

  return { totalTime, avgTime, opsPerSec };
}

console.log('=== MyCal Performance Benchmark ===\n');

// Benchmark 1: Single date instance creation (cold cache)
benchmark(
  'Single date instance (cold cache)',
  () => {
    new Mycal('2000-01-01');
  },
  1000
);

// Benchmark 2: Single date instance creation (warm cache - same date)
// Warm up the cache
void new Mycal('2000-01-01');
benchmark(
  'Single date instance (warm cache - same date)',
  () => {
    new Mycal('2000-01-01');
  },
  1000
);

// Benchmark 3: Different dates (cache miss scenario)
benchmark(
  'Different dates (cache miss)',
  () => {
    new Mycal(
      `2000-${Math.floor(Math.random() * 12 + 1)}-${Math.floor(Math.random() * 28 + 1)}`
    );
  },
  1000
);

// Benchmark 4: Access all properties
const cal = new Mycal('2000-01-01');
benchmark(
  'Access all properties',
  () => {
    void cal.year;
    void cal.month;
    void cal.day;
    void cal.weekday;
    void cal.thingyan;
    void cal.watatYear;
    void cal.waso;
    void cal.firstDayOfTagu;
    void cal.maharbote;
    void cal.numerology;
    void cal.chineseZodiac;
  },
  5000
);

// Benchmark 5: Thingyan only (expensive calculation)
benchmark(
  'Thingyan calculation only',
  () => {
    const c = new Mycal('2000-01-01');
    void c.thingyan;
  },
  1000
);

// Benchmark 6: Watat year only (has loop)
benchmark(
  'Watat year calculation only',
  () => {
    const c = new Mycal('2013-01-01');
    void c.watatYear;
  },
  1000
);

// Benchmark 7: Zodiac lookup
benchmark(
  'Zodiac lookup (static method)',
  () => {
    Mycal.zodiac(15, 1);
  },
  50000
);

// Benchmark 8: Numerology calculation
const cal2 = new Mycal('2000-01-15');
benchmark(
  'Numerology calculation',
  () => {
    void cal2.numerology;
  },
  50000
);

// Benchmark 9: Number formatting
const cal3 = new Mycal('2000-01-01');
benchmark(
  'Number formatting (1234)',
  () => {
    cal3.numFormat(1234);
  },
  10000
);

// Benchmark 10: Burmese numerals conversion
benchmark(
  'Burmese numerals conversion',
  () => {
    const c = new Mycal('2000-01-01');
    void c.year.my;
  },
  10000
);

console.log('=== Benchmark Complete ===');
