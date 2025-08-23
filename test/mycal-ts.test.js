const assert = require('assert');
const MYCAL = require('../dist/index.js').default;

describe('MYCAL TypeScript Version', () => {
  it('SHOULD RETURN MYANMAR YEAR', () => {
    const cal = new MYCAL('1/1/2000');
    const { year } = cal;
    assert.deepEqual(year, { en: '1361', my: '၁၃၆၁' });
  });

  it('SHOULD RETURN BUDDHIST ERA YEAR', () => {
    const cal = new MYCAL('1/1/2000');
    const { buddhistEraYear } = cal;
    assert.deepEqual(buddhistEraYear, { en: '2543', my: '၂၅၄၃' });
  });

  it('SHOULD RETURN THINGYAN DAYS', () => {
    const cal = new MYCAL('1/1/2000');
    const { thingyan } = cal;

    assert.deepEqual(thingyan, {
      akyo: '4/13/1999',
      akya: '4/14/1999',
      akyat: ['4/15/1999'],
      atat: '4/16/1999',
      new_year_day: '4/17/1999',
      akyaTime: '1999-04-14T13:09:30.987Z',
      atatTime: '1999-04-16T17:14:11.987Z'
    });
  });

  it('SHOULD RETURN YEAR IS WITH INTERCALARY MONTH OR NOT', () => {
    const cal = new MYCAL('1/1/2001');
    const { watatYear } = cal;

    assert.equal(watatYear.watat, false);
  });

  it('SHOULD RETURN FULLMON DAY OF SECOND WASO (THIRD ERA)', () => {
    const cal = new MYCAL('1/1/2013');
    const { waso } = cal;
    assert.equal(waso, '8/2/2012');
  });

  it('SHOULD RETURN FULLMON DAY OF SECOND WASO (SECOND ERA)', () => {
    const cal = new MYCAL('1/1/1900');
    const { waso } = cal;
    assert.equal(waso, '7/22/1899');
  });

  it('SHOULD RETURN FULLMON DAY OF SECOND WASO (FIRST ERA)', () => {
    const cal = new MYCAL('1/1/1803');
    const { waso } = cal;
    assert.equal(waso, '7/14/1802');
  });

  it('SHOULD RETURN YEAR IS WITH INTERCALARY DAY OR NOT', () => {
    const cal = new MYCAL('1/1/2013');
    const { watatYear } = cal;

    assert.equal(watatYear.isBigWatat, false);
  });

  it('SHOULD RETURN FIRST DAY OF TAGU', () => {
    const cal = new MYCAL('1/1/2013');
    const { firstDayOfTagu } = cal;

    assert.equal(firstDayOfTagu, '3/23/2012');
  });

  it('SHOULD RETURN MYANMAR MONTH', () => {
    const cal = new MYCAL('1/1/2000');
    const { month } = cal;

    assert.deepEqual(month, { en: 'Nadaw', my: 'နတ်တော်' });
  });

  it('SHOULD RETURN MYANMAR DAY', () => {
    const cal = new MYCAL('1/1/2000');
    const { day } = cal;

    assert.deepEqual(day, {
      fd: { en: '10', my: '၁၀' },
      mp: { en: 'Waning', my: 'လပြည့်ကျော်' }
    });
  });

  it('SHOULD RETURN MYANMAR WEEK DAY', () => {
    const cal = new MYCAL('1/1/2000');
    const { weekday } = cal;

    assert.deepEqual(weekday, { en: 'Saturday', my: 'စနေ' });
  });

  // Additional tests based on the algorithm examples from the reference
  it('EXAMPLE FROM PAPER: SECOND WASO FULL MOON FOR 1374 ME (2012-08-02)', () => {
    // The paper computes the full moon day of Second Waso for 1374 ME as 2012-08-02
    const cal = new MYCAL('1/1/2013');
    const { waso } = cal;
    assert.equal(waso, '8/2/2012');
  });

  it('EXAMPLE FROM PAPER: START OF 1375 ME (atat ~ 2013-04-16 08:10 UTC)', () => {
    // The paper gives ja for 1375 ME as 2456398.8407875 which converts to 2013-04-16 ~08:10
    // Ensure we construct a Gregorian date that maps to Myanmar year 1375 (e.g., 2013-04-17)
    const cal = new MYCAL('4/17/2013');
    const { thingyan } = cal;
    // atatTime should be an ISO string for 2013-04-16 (the atat time for 1375 ME)
    assert.ok(thingyan.atatTime.startsWith('2013-04-16'));
  });
});