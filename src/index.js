class MCAL {
  constructor(dateString) {
    const gDate = dateString ? new Date(dateString) : new Date(); //get gregorian date
    this.mmdate = gDate.getDate();
    this.mmday = gDate.getDay();
    this.mmmonth = gDate.getMonth();
    this.mmyear = gDate.getFullYear();
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

  get mmDate() {
    return this.mmDateString;
  }
}

module.exports = MCAL;
