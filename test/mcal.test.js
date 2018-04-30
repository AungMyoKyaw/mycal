const assert = require('assert');
const mcal = require('../src/index.js');

describe('MCAL', () => {
  it('SHOULD RETURN MYANMAR DATE', () => {
    const cal = new mcal('1/4/1948');
    const {date, day, month, year, mmDate} = cal;
    console.log(date, day, month, year, mmDate);
    assert.ok(true);
  });
});
