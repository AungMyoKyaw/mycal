const assert = require('assert');
const mcal = require('../src/index.js');

describe('MCAL', () => {
  it('SHOULD RETURN MYANMAR YEAR', () => {
    const cal = new mcal('1/1/2000');
    const {date, day, month, year, mmDate} = cal;
    assert.equal(year, 1361);
  });

  it('SHOULD RETURN BUDDHIST ERA YEAR', () => {
    const cal = new mcal('1/1/2000');
    const {buddhistEraYear} = cal;
    assert.equal(buddhistEraYear, 2543);
  });
});
