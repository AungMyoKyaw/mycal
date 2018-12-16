# MYCAL

> Myanmar Calendar

[![Build Status][travis]][travis-url]
[![code style: prettier][prettier]][prettier-url]
[![npm][npm-download]][npm-dl-url]
[![contributions welcome][contri]][contri-url]
[![License: MIT][license]][license-url]

## Algorithm

[Algorithm, Program and Calculation of Myanmar Calendar][algorithm]

## Installation

### npm

```shell
npm install --save mycal
```

### web

```html
<script src="https://unpkg.com/mycal@latest/dist/client/mycal.min.js"></script>
```

## API

- [Day](#day)
- [Weekday](#weekday)
- [Month](#month)
- [Year](#year)
- [Buddhist Era Year](#buddhist-era-year)
- [THINGYAN](#thingyan)

### Day

<details>
<summary>Day</summary>

```javascript
const mycal = require('mycal');
//mycal
//new mycal('month/day/year');

//for today date
//use without params
//new mycal()
const myanmarDate = new mycal('1/4/1948');

const { day } = myanmarDate;
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

</details>

### Weekday

<details>
<summary>Weekday</summary>

```javascript
const mycal = require('mycal');
//mycal
//new mycal('month/day/year');

//for today date
//use without params
//new mycal()
const myanmarDate = new mycal('1/4/1948');

const { weekday } = myanmarDate;
console.log(weekday);
// {
//    en:'Sunday',
//    my:'တနင်္ဂနွေ'
// }
```

</details>

### Month

<details>
<summary>Month</summary>

```javascript
const mycal = require('mycal');
//mycal
//new mycal('month/day/year');

//for today date
//use without params
//new mycal()
const myanmarDate = new mycal('1/4/1948');

const { month } = myanmarDate;
console.log(month);
// {
//    en:'Pyatho',
//    my:'ပြာသို'
// }
```

</details>

## Year

<details>
<summary>Year</summary>

```javascript
const mycal = require('mycal');
//mycal
//new mycal('month/day/year');

//for today date
//use without params
//new mycal()
const myanmarDate = new mycal('1/4/1948');

const { year } = myanmarDate;
console.log(year);
// {
//    en:'1309',
//    my:'၁၃၀၉'
// }
```

</details>

## Buddhist Era Year

<details>
<summary>Buddhist Era Year</summary>

```javascript
const mycal = require('mycal');
//mycal
//new mycal('month/day/year');

//for today date
//use without params
//new mycal()
const myanmarDate = new mycal('1/4/1948');

const { buddhistEraYear } = myanmarDate;
console.log(buddhistEraYear);
// {
//    en:'2491',
//    my:'၂၄၉၁'
// }
```

</details>

## THINGYAN

<details>
<summary>THINGYAN</summary>

```javascript
const mycal = require('mycal');
//mycal
//new mycal('month/day/year');

//for today date
//use without params
//new mycal()
const myanmarDate = new mycal('1/4/1948');

const { thingyan } = myanmarDate;
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

</details>

## Usage

<details>
<summary>Usage</summary>

```javascript
const mycal = require('mycal');

const today = new mycal();

//mycal
//new mycal('month/day/year');
const myanmarDate = new mycal('1/4/1948');

const { weekday, day, month, year, buddhistEraYear, thingyan } = myanmarDate;

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

</details>

## Test

```shell
npm t
```

## Build

```shell
npm run build
```

## License

MIT © [Aung Myo Kyaw](https://github.com/AungMyoKyaw)

[algorithm]: https://coolemerald.blogspot.com/2013/06/algorithm-program-and-calculation-of.html
[contri]: https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat-square
[contri-url]: https://github.com/AungMyoKyaw/mycal/issues
[travis]: https://img.shields.io/travis/AungMyoKyaw/mycal/master.svg?style=flat-square
[travis-url]: https://travis-ci.org/AungMyoKyaw/mycal
[npm-download]: https://img.shields.io/npm/dt/mycal.svg?style=flat-square
[npm-dl-url]: https://www.npmjs.com/package/mycal
[license]: https://img.shields.io/badge/License-MIT-brightgreen.svg?style=flat-square
[license-url]: https://opensource.org/licenses/MIT
[prettier]: https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square
[prettier-url]: https://github.com/prettier/prettier
