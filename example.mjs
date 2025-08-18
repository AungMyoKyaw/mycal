import MYCAL from './dist/index.js';

// Example usage of the Myanmar Calendar library
console.log('Myanmar Calendar Library Demo\n');

// Create a calendar instance for January 1, 2000
const cal = new MYCAL('1/1/2000');

console.log('Date: January 1, 2000');
console.log('Myanmar Year:', cal.year);
console.log('Buddhist Era Year:', cal.buddhistEraYear);
console.log('Myanmar Month:', cal.month);
console.log('Myanmar Day:', cal.day);
console.log('Weekday:', cal.weekday);
console.log('Watat Year Info:', cal.watatYear);
console.log('Waso Full Moon:', cal.waso);
console.log('First Day of Tagu:', cal.firstDayOfTagu);

console.log('\nThingyan Festival Dates:');
const thingyan = cal.thingyan;
console.log('Akyo:', thingyan.akyo);
console.log('Akya:', thingyan.akya);
console.log('Akyat:', thingyan.akyat);
console.log('Atat:', thingyan.atat);
console.log('New Year Day:', thingyan.new_year_day);