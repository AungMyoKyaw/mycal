const assert = require('assert');
const mcal = require('../src/index.js');

describe('MYCAL', () => {
  it('SHOULD RETURN MYANMAR YEAR', () => {
    const cal = new mcal('1/1/2000');
    const {year} = cal;
    assert.deepEqual(year, {en: '1361', my: '၁၃၆၁'});
  });

  it('SHOULD RETURN BUDDHIST ERA YEAR', () => {
    const cal = new mcal('1/1/2000');
    const {buddhistEraYear} = cal;
    assert.deepEqual(buddhistEraYear, {en: '2543', my: '၂၅၄၃'});
  });

  it('SHOULD RETURN THINGYAN DAYS', () => {
    const cal = new mcal('1/1/2000');
    const {thingyan} = cal;

    assert.deepEqual(thingyan, {
      akyo: '4/13/1999',
      akya: '4/14/1999',
      akyat: ['4/15/1999'],
      atat: '4/16/1999',
      new_year_day: '4/17/1999',
      akyaTime: '4/14/1999, 7:39:30 PM',
      atatTime: '4/16/1999, 11:44:11 PM'
    });
  });

  it('SHOULD RETURN YEAR IS WITH INTERCALARY MONTH OR NOT', () => {
    const cal = new mcal('1/1/2001');
    const {watatYear} = cal;

    assert.equal(watatYear.watat, false);
  });

  it('SHOULD RETURN FULLMON DAY OF SECOND WASO (THIRD ERA)', () => {
    const cal = new mcal('1/1/2013');
    const {waso} = cal;
    assert.equal(waso, '8/2/2012');
  });

  it('SHOULD RETURN FULLMON DAY OF SECOND WASO (SECOND ERA)', () => {
    const cal = new mcal('1/1/1900');
    const {waso} = cal;
    assert.equal(waso, '7/22/1899');
  });

  it('SHOULD RETURN FULLMON DAY OF SECOND WASO (FIRST ERA)', () => {
    const cal = new mcal('1/1/1803');
    const {waso} = cal;
    assert.equal(waso, '7/14/1802');
  });

  it('SHOULD RETURN YEAR IS WITH INTERCALARY DAY OR NOT', () => {
    const cal = new mcal('1/1/2013');
    const {watatYear} = cal;

    assert.equal(watatYear.isBigWatat, false);
  });

  it('SHOULD RETURN FIRST DAY OF TAGU', () => {
    const cal = new mcal('1/1/2013');
    const {firstDayOfTagu} = cal;

    assert.equal(firstDayOfTagu, '3/23/2012');
  });

  it('SHOULD RETURN MYANMAR MONTH', () => {
    const cal = new mcal('7/1/2012');
    const {month} = cal;

    assert.deepEqual(month, {en: 'First Waso', my: 'ပဝါဆို'});
  });

  it('SHOULD RETURN MYANMAR DAY', () => {
    const cal = new mcal('5/23/2012');
    const {day} = cal;

    assert.deepEqual(day, {
      fd: {en: '3', my: '၃'},
      mp: {en: 'Waxing', my: 'လဆန်း'}
    });
  });
});
