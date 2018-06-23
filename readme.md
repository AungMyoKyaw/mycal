# MYCAL

> Myanmar Calendar

[![Build Status][travis]][travis-url]
[![npm][npm-download]][npm-dl-url]
[![contributions welcome][contri]][contri-url]
[![NSP Status][nsp]][nsp-url]

## Algorithm

[Algorithm, Program and Calculation of Myanmar Calendar][algorithm]

## Installation

### npm

```shell
npm install --save mycal
```

## API

- [Day](#day)
- [Weekday](#weekday)
- [Month](#month)
- [Year](#year)
- [Buddhist Era Year](#buddhist-era-year)
- [THINGYAN](#thingyan)

### Day

```javascript
const mycal = require('mycal');
//mycal
//new mycal(month,day,year);

//for today date
//use without params
//new mycal()
const myanmarDate = new mycal('1/4/1948');

const {day} = myanmarDate;
console.log(day);
// {
//    fd:{
//       en:'9',
//       my:'၉'
//    },
//    mp:{
//       en:'Waning',
//       my:'လပြည့်ကျော်'
//    }
// }
```

### Weekday

```javascript
const mycal = require('mycal');
//mycal
//new mycal(month,day,year);

//for today date
//use without params
//new mycal()
const myanmarDate = new mycal('1/4/1948');

const {weekday} = myanmarDate;
console.log(weekday);
// {
//    en:'Sunday',
//    my:'တနင်္ဂနွေ'
// }
```

### Month

```javascript
const mycal = require('mycal');
//mycal
//new mycal(month,day,year);

//for today date
//use without params
//new mycal()
const myanmarDate = new mycal('1/4/1948');

const {month} = myanmarDate;
console.log(month);
// {
//    en:'Pyatho',
//    my:'ပြာသို'
// }
```

## Year

```javascript
const mycal = require('mycal');
//mycal
//new mycal(month,day,year);

//for today date
//use without params
//new mycal()
const myanmarDate = new mycal('1/4/1948');

const {year} = myanmarDate;
console.log(year);
// {
//    en:'1309',
//    my:'၁၃၀၉'
// }
```

## Buddhist Era Year

```javascript
const mycal = require('mycal');
//mycal
//new mycal(month,day,year);

//for today date
//use without params
//new mycal()
const myanmarDate = new mycal('1/4/1948');

const {buddhistEraYear} = myanmarDate;
console.log(buddhistEraYear);
// {
//    en:'2491',
//    my:'၂၄၉၁'
// }
```

## THINGYAN

```javascript
const mycal = require('mycal');
//mycal
//new mycal(month,day,year);

//for today date
//use without params
//new mycal()
const myanmarDate = new mycal('1/4/1948');

const {thingyan} = myanmarDate;
console.log(thingyan);
// {
//    akyo:'4/13/1947',
//    akya:'4/14/1947',
//    akyat:[
//       '4/15/1947'
//    ],
//    atat:'4/16/1947',
//    new_year_day:'4/17/1947',
//    akyaTime:'4/14/1947, 8:47:18 AM',
//    atatTime:'4/16/1947, 12:48:30 PM'
// }
```

## Usage

```javascript
const mycal = require('mycal');

const today = new mycal();

//mycal
//new mycal(month,day,year);
const myanmarDate = new mycal('1/4/1948');

const {weekday, day, month, year, buddhistEraYear, thingyan} = myanmarDate;

console.log(weekday);
// {
//    en:'Sunday',
//    my:'တနင်္ဂနွေ'
// }
console.log(day);
// {
//    fd:{
//       en:'9',
//       my:'၉'
//    },
//    mp:{
//       en:'Waning',
//       my:'လပြည့်ကျော်'
//    }
// }
console.log(month);
// {
//    en:'Pyatho',
//    my:'ပြာသို'
// }
console.log(year);
// {
//    en:'1309',
//    my:'၁၃၀၉'
// }
console.log(buddhistEraYear);
// {
//    en:'2491',
//    my:'၂၄၉၁'
// }
console.log(thingyan);
// {
//    akyo:'4/13/1947',
//    akya:'4/14/1947',
//    akyat:[
//       '4/15/1947'
//    ],
//    atat:'4/16/1947',
//    new_year_day:'4/17/1947',
//    akyaTime:'1947-04-14T02:17:18.868Z',
//    atatTime:'1947-04-16T06:18:30.868Z'
// }
```

## Test

```javascript
npm t
```

## License

[MIT](./LICENSE)

[algorithm]: https://coolemerald.blogspot.com/2013/06/algorithm-program-and-calculation-of.html
[contri]: https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat
[contri-url]: https://github.com/AungMyoKyaw/mycal/issues
[travis]: https://travis-ci.org/AungMyoKyaw/mycal.svg?branch=master
[travis-url]: https://travis-ci.org/AungMyoKyaw/mycal
[nsp]: https://nodesecurity.io/orgs/aung-myo-kyaw/projects/ee320ba2-3ac2-468d-a886-c8d06850a671/badge
[nsp-url]: https://nodesecurity.io/orgs/aung-myo-kyaw/projects/ee320ba2-3ac2-468d-a886-c8d06850a671
[npm-download]: https://img.shields.io/npm/dt/mycal.svg
[npm-dl-url]: https://www.npmjs.com/package/mycal
