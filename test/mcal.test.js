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

  it('SHOULD RETURN TYINGYAN DAYS', () => {
    const cal = new mcal('1/1/2000');
    const {thingyan} = cal;

    assert.deepEqual(thingyan, {
      akyo: '4/13/1999',
      akya: '4/14/1999',
      akyat: ['4/15/1999'],
      atat: '4/16/1999',
      akyaTime: '4/14/1999, 7:39:30 PM',
      atatTime: '4/16/1999, 11:44:11 PM'
    });
  });
});
