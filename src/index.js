const mmyear = require('./lib/mmyear.lib.js');
const buddhistYear = require('./lib/buddhist_era_year.lib.js');

class MCAL {
  constructor(dateString) {
    const gDate = dateString ? new Date(dateString) : new Date(); //get gregorian date
    this.mmdate = gDate.getDate();
    this.mmday = gDate.getDay();
    this.mmmonth = gDate.getMonth();
    this.mmyear = mmyear(gDate);
    this.buddhistYear = buddhistYear(this.mmyear);
    this.mmDateString = gDate.toLocaleString();
  }

  get date() {
    return this.mmdate;
  }

  get day() {
    return this.mmday;
  }

  get month() {
    return this.mmmonth;
  }

  get year() {
    return this.mmyear;
  }

  get buddhistEraYear() {
    return this.buddhistYear;
  }

  get mmDate() {
    return this.mmDateString;
  }
}

module.exports = MCAL;
