// src/utils/julian.ts
function gregorianToJulian(year, month, day) {
  const adjustment = Math.floor((14 - month) / 12);
  const adjustedYear = year + 4800 - adjustment;
  const adjustedMonth = month + 12 * adjustment - 3;
  return day + Math.floor((153 * adjustedMonth + 2) / 5) + 365 * adjustedYear + Math.floor(adjustedYear / 4) - Math.floor(adjustedYear / 100) + Math.floor(adjustedYear / 400) - 32045;
}
function julianToGregorian(jd) {
  const L = jd + 68569;
  const N = Math.floor(4 * L / 146097);
  const L2 = L - Math.floor((146097 * N + 3) / 4);
  const I = Math.floor(4000 * (L2 + 1) / 1461001);
  const L3 = L2 - Math.floor(1461 * I / 4) + 31;
  const J = Math.floor(80 * L3 / 2447);
  const day = L3 - Math.floor(2447 * J / 80);
  const L4 = Math.floor(J / 11);
  const month = J + 2 - 12 * L4;
  const year = 100 * (N - 49) + I + L4;
  return { year, month, day };
}
function dateToJulian(date) {
  return gregorianToJulian(date.getUTCFullYear(), date.getUTCMonth() + 1, date.getUTCDate());
}
function julianToDate(jd) {
  const jdInt = Math.floor(jd);
  const jdFrac = jd - jdInt;
  const { year, month, day } = julianToGregorian(jdInt);
  const totalSeconds = jdFrac * 86400;
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor(totalSeconds % 3600 / 60);
  const seconds = Math.floor(totalSeconds % 60);
  const milliseconds = Math.round(totalSeconds % 1 * 1000);
  const date = new Date(Date.UTC(year, month - 1, day, hours, minutes, seconds, milliseconds));
  return date;
}

// src/constants.ts
var era1_1 = {
  begin: 0,
  end: 797,
  fme: [
    [205, 1],
    [246, 1],
    [471, 1],
    [572, -1],
    [651, 1],
    [653, 2],
    [656, 1],
    [672, 1],
    [729, 1],
    [767, -1]
  ],
  wte: []
};
var era1_2 = {
  begin: 798,
  end: 1099,
  fme: [
    [813, -1],
    [849, -1],
    [851, -1],
    [854, -1],
    [927, -1],
    [933, -1],
    [936, -1],
    [938, -1],
    [949, -1],
    [952, -1],
    [963, -1],
    [968, -1],
    [1039, -1]
  ],
  wte: []
};
var era1_3 = {
  begin: 1100,
  end: 1216,
  fme: [
    [1120, 1],
    [1126, -1],
    [1150, 1],
    [1172, -1],
    [1207, 1]
  ],
  wte: [
    [1201, 1],
    [1202, 0]
  ]
};
var era2 = {
  begin: 1217,
  end: 1311,
  fme: [
    [1234, 1],
    [1261, -1]
  ],
  wte: [
    [1263, 1],
    [1264, 0]
  ]
};
var era3 = {
  begin: 1312,
  end: 9999,
  fme: [[1377, 1]],
  wte: [
    [1344, 1],
    [1345, 0]
  ]
};
function getExceptions(my) {
  if (my <= era1_1.end) {
    return era1_1;
  }
  if (my <= era1_2.end) {
    return era1_2;
  }
  if (my <= era1_3.end) {
    return era1_3;
  }
  if (my <= era2.end) {
    return era2;
  }
  return era3;
}
function findException(year, table) {
  const result = table.find(([y]) => y === year);
  return result?.[1];
}
var CONST = {
  SY: 1577917828 / 4320000,
  MO: 1954168.050623,
  SE3: 1312,
  LM: 1577917828 / 53433336,
  KALI_YUGA: 3739,
  thirdEra: {
    TA: 3.630567,
    TW: 22.2694539,
    WO: -0.5
  },
  secondEra: {
    TA: 7.261134,
    TW: 25.90002,
    WO: -1
  },
  firstEra: {
    TA: 11.799343,
    WO1: -1.1,
    WO2: -0.85
  },
  exceptions: {
    era1_1,
    era1_2,
    era1_3,
    era2,
    era3
  }
};

// src/utils/numerals.ts
var MYANMAR_DIGITS = [
  "၀",
  "၁",
  "၂",
  "၃",
  "၄",
  "၅",
  "၆",
  "၇",
  "၈",
  "၉"
];
function toMyanmarNumber(num) {
  return String(num).split("").map((d) => {
    const digit = parseInt(d, 10);
    if (!isNaN(digit) && digit >= 0 && digit <= 9) {
      return MYANMAR_DIGITS[digit];
    }
    return d;
  }).join("");
}
function localizeNumber(num) {
  const numStr = String(num);
  return {
    en: numStr,
    my: toMyanmarNumber(numStr)
  };
}

// src/localization.ts
var monthData = [
  { en: "Tagu", my: "တန်ခူး" },
  { en: "Kason", my: "ကဆုန်" },
  { en: "Nayon", my: "နယုန်" },
  [
    { en: "Waso", my: "ဝါဆို" },
    { en: "First Waso", my: "ပဝါဆို" },
    { en: "Second Waso", my: "ဒုဝါဆို" }
  ],
  { en: "Wagaung", my: "ဝါခေါင်" },
  { en: "Tawthalin", my: "တော်သလင်း" },
  { en: "Thadingyut", my: "သီတင်းကျွတ်" },
  { en: "Tazaungmon", my: "တန်ဆောင်မုန်း" },
  { en: "Nadaw", my: "နတ်တော်" },
  { en: "Pyatho", my: "ပြာသို" },
  { en: "Tabodwe", my: "တပို့တွဲ" },
  { en: "Tabaung", my: "တပေါင်း" }
];
var moonData = [
  { en: "Waxing", my: "လဆန်း" },
  { en: "Full Moon", my: "လပြည့်" },
  { en: "Waning", my: "လပြည့်ကျော်" },
  { en: "New Moon", my: "လကွယ်" }
];
var weekdayData = [
  { en: "Sunday", my: "တနင်္ဂနွေ" },
  { en: "Monday", my: "တနင်္လာ" },
  { en: "Tuesday", my: "အင်္ဂါ" },
  { en: "Wednesday", my: "ဗုဒ္ဓဟူး" },
  { en: "Thursday", my: "ကြာသပတေး" },
  { en: "Friday", my: "သောကြာ" },
  { en: "Saturday", my: "စနေ" }
];
var localization = {
  month: monthData,
  moon: moonData,
  number: localizeNumber,
  weekday: weekdayData
};
var { month, moon, weekday } = localization;

// src/lib/myyear.ts
var { SY, MO } = CONST;
function myYear(gDate) {
  const jd = Math.round(dateToJulian(gDate));
  const mmyear = Math.floor((jd - 0.5 - MO) / SY);
  return localization.number(mmyear);
}

// src/lib/mymonth.ts
function myMonth(gDate, tg1, c, b) {
  let myanmarMonth;
  const jdn = Math.round(dateToJulian(gDate));
  let dd = jdn - tg1 + 1;
  const myl = 354 + 30 * (1 - c) + b;
  const mmt = Math.floor((dd - 1) / myl);
  if (mmt) {
    dd -= mmt * myl;
  }
  const a = Math.floor((dd + 423) / 512);
  const mm = Math.floor((dd - a * b + 30 * a * c + 29.26) / 29.544);
  const e = Math.floor((mm + 12) / 16);
  const f = Math.floor((mm + 11) / 16);
  const md = dd - Math.floor(29.544 * mm - 29.26) - b * e + 30 * c * f;
  const mmAdjusted = mm + 3 * f - 4 * e;
  let mml = 30 - mmAdjusted % 2;
  if (mmAdjusted === 3) {
    mml = mml + b;
  }
  myanmarMonth = month[mmAdjusted - 1];
  if (!c && mmAdjusted === 4) {
    myanmarMonth = month[3][2];
  }
  if (!c && mmAdjusted === 0) {
    myanmarMonth = month[3][1];
  }
  if (c && mmAdjusted === 4) {
    myanmarMonth = month[3][0];
  }
  return {
    mm: myanmarMonth,
    mml,
    md
  };
}

// src/lib/myday.ts
function myDay(md, mml) {
  const fd = md - 15 * Math.floor(md / 16);
  const mp = Math.floor((md + 1) / 16) + Math.floor(md / 16) + Math.floor(md / mml);
  return {
    fd: localization.number(Math.round(fd)),
    mp: moon[mp] || moon[0]
  };
}

// src/lib/myweekday.ts
function myWeekday(gDate) {
  return weekday[gDate.getDay()];
}

// src/lib/buddhistEra.ts
function buddhistEraYear(mmYear) {
  return localization.number(mmYear + 1182);
}

// src/utils/cache.ts
class LRUCache {
  maxSize;
  cache;
  head;
  tail;
  constructor(maxSize = 128) {
    this.maxSize = maxSize;
    this.cache = new Map;
    this.head = null;
    this.tail = null;
  }
  get(key) {
    const node = this.cache.get(key);
    if (!node)
      return;
    this.moveToFront(node);
    return node.value;
  }
  set(key, value) {
    const existingNode = this.cache.get(key);
    if (existingNode) {
      existingNode.value = value;
      this.moveToFront(existingNode);
      return;
    }
    const newNode = {
      key,
      value,
      prev: null,
      next: this.head
    };
    if (this.head) {
      this.head.prev = newNode;
    }
    this.head = newNode;
    this.tail ??= newNode;
    this.cache.set(key, newNode);
    if (this.cache.size > this.maxSize) {
      this.evictLRU();
    }
  }
  has(key) {
    return this.cache.has(key);
  }
  clear() {
    this.cache.clear();
    this.head = null;
    this.tail = null;
  }
  size() {
    return this.cache.size;
  }
  moveToFront(node) {
    if (node === this.head)
      return;
    if (node.prev) {
      node.prev.next = node.next;
    }
    if (node.next) {
      node.next.prev = node.prev;
    }
    if (node === this.tail) {
      this.tail = node.prev;
    }
    node.prev = null;
    node.next = this.head;
    if (this.head) {
      this.head.prev = node;
    }
    this.head = node;
  }
  evictLRU() {
    if (!this.tail)
      return;
    const lruKey = this.tail.key;
    this.cache.delete(lruKey);
    if (this.tail.prev) {
      this.tail.prev.next = null;
    }
    this.tail = this.tail.prev;
    if (!this.tail) {
      this.head = null;
    }
  }
}
var caches = {
  watat: new LRUCache(256),
  thingyan: new LRUCache(256),
  waso: new LRUCache(256),
  firstDayOfTagu: new LRUCache(256)
};

// src/lib/thingyan.ts
var { SY: SY2, MO: MO2, SE3 } = CONST;
function formatDate(date) {
  const month2 = date.getUTCMonth() + 1;
  const day = date.getUTCDate();
  const year = date.getUTCFullYear();
  return `${month2}/${day}/${year}`;
}
function thingyan(mmyear) {
  const cached = caches.thingyan.get(mmyear);
  if (cached)
    return cached;
  let akyaTime;
  const atatTime = SY2 * mmyear + MO2;
  if (mmyear >= SE3) {
    akyaTime = atatTime - 2.169918982;
  } else {
    akyaTime = atatTime - 2.1675;
  }
  const atat = julianToDate(atatTime);
  const akya = julianToDate(akyaTime);
  atat.setHours(0, 0, 0, 0);
  akya.setHours(0, 0, 0, 0);
  const akyoDate = new Date(Date.UTC(akya.getUTCFullYear(), akya.getUTCMonth(), akya.getUTCDate() - 1));
  const new_year_dayDate = new Date(Date.UTC(atat.getUTCFullYear(), atat.getUTCMonth(), atat.getUTCDate() + 1));
  const akyo = formatDate(akyoDate);
  const akyaDateStr = formatDate(akya);
  const atatDateStr = formatDate(atat);
  const new_year_day = formatDate(new_year_dayDate);
  const akyat = [];
  const dayDiff = atat.getUTCDate() - akya.getUTCDate();
  for (let i = 1;i < dayDiff; i++) {
    akyat.push(formatDate(new Date(Date.UTC(akya.getUTCFullYear(), akya.getUTCMonth(), akya.getUTCDate() + i))));
  }
  const result = {
    akyo,
    akya: akyaDateStr,
    akyat,
    atat: atatDateStr,
    new_year_day,
    akyaTime: julianToDate(akyaTime).toISOString(),
    atatTime: julianToDate(atatTime).toISOString()
  };
  caches.thingyan.set(mmyear, result);
  return result;
}

// src/lib/intercalary.ts
var { KALI_YUGA, LM, firstEra, secondEra, thirdEra, SY: SY3 } = CONST;
var nearestWatatCache = new Map;
function mod(n, m) {
  return (n % m + m) % m;
}
function isWatatYear(mmYear) {
  let isWatatYear2;
  let era;
  let ed = mod(SY3 * (mmYear + KALI_YUGA), LM);
  switch (true) {
    case mmYear >= 1312:
      era = 3;
      if (ed < thirdEra.TA) {
        ed += LM;
      }
      isWatatYear2 = ed >= (thirdEra.TW ?? 0);
      break;
    case (mmYear >= 1217 && mmYear <= 1311):
      era = 2;
      if (ed < secondEra.TA) {
        ed += LM;
      }
      isWatatYear2 = ed >= (secondEra.TW ?? 0);
      break;
    case mmYear <= 1216:
      era = 1;
      if (ed < firstEra.TA) {
        ed += LM;
      }
      isWatatYear2 = [2, 5, 7, 10, 13, 15, 18].includes(mod(mmYear * 7 + 2, 19));
      break;
    default:
      era = 3;
      isWatatYear2 = false;
  }
  const exceptions = getExceptions(mmYear);
  const watatException = findException(mmYear, exceptions.wte);
  if (watatException !== undefined) {
    isWatatYear2 = watatException === 1;
  }
  return {
    era,
    ed,
    isWatatYear: isWatatYear2
  };
}
function nearestWatatYear(mmYear) {
  if (nearestWatatCache.has(mmYear)) {
    const cachedYear = nearestWatatCache.get(mmYear);
    return { ...isWatatYear(cachedYear), year: cachedYear };
  }
  let isWatat = false;
  let watatInfo;
  const requestedYear = mmYear;
  mmYear--;
  const MIN_YEAR = 0;
  do {
    if (mmYear < MIN_YEAR) {
      mmYear = MIN_YEAR;
    }
    watatInfo = isWatatYear(mmYear);
    isWatat = watatInfo.isWatatYear;
    if (!isWatat) {
      mmYear--;
    }
  } while (!isWatat);
  nearestWatatCache.set(requestedYear, mmYear);
  return { ...watatInfo, year: mmYear };
}
function watat(mmYear) {
  const cached = caches.watat.get(mmYear);
  if (cached)
    return cached;
  const watatInfo = isWatatYear(mmYear);
  const nearestWatatInfo = nearestWatatYear(mmYear);
  const result = { ...watatInfo, nearestWatatInfo };
  caches.watat.set(mmYear, result);
  return result;
}

// src/lib/waso.ts
var { SY: SY4, MO: MO3, LM: LM2, firstEra: firstEra2, secondEra: secondEra2, thirdEra: thirdEra2 } = CONST;
function formatDate2(date) {
  const month2 = date.getUTCMonth() + 1;
  const day = date.getUTCDate();
  const year = date.getUTCFullYear();
  return `${month2}/${day}/${year}`;
}
function waso(watatInfo, mmYear) {
  const cacheKey = `${mmYear}-${watatInfo.era}-${watatInfo.isWatatYear}-${watatInfo.ed}`;
  const cached = caches.waso.get(cacheKey);
  if (cached)
    return cached;
  let w;
  let WO;
  switch (true) {
    case mmYear < 1100:
      WO = firstEra2.WO1;
      break;
    case mmYear >= 1100:
      WO = firstEra2.WO2;
      break;
    default:
      WO = 0;
  }
  switch (watatInfo.era) {
    case 1:
      if (watatInfo.isWatatYear) {
        w = Math.round(SY4 * mmYear + MO3 - watatInfo.ed + 4.5 * LM2 + WO);
      }
      break;
    case 2:
      WO = secondEra2.WO;
      if (watatInfo.isWatatYear) {
        w = Math.round(SY4 * mmYear + MO3 - watatInfo.ed + 4.5 * LM2 + WO);
      }
      break;
    case 3:
      WO = thirdEra2.WO;
      if (watatInfo.isWatatYear) {
        w = Math.round(SY4 * mmYear + MO3 - watatInfo.ed + 4.5 * LM2 + WO);
      }
      break;
  }
  if (w === undefined) {
    return {
      jd: 0,
      gd: ""
    };
  }
  const exceptions = getExceptions(mmYear);
  const fmeException = findException(mmYear, exceptions.fme);
  if (fmeException !== undefined) {
    w += fmeException;
  }
  const result = {
    jd: w,
    gd: formatDate2(julianToDate(w))
  };
  caches.waso.set(cacheKey, result);
  return result;
}

// src/lib/firstDayOfTagu.ts
function formatDate3(date) {
  const month2 = date.getUTCMonth() + 1;
  const day = date.getUTCDate();
  const year = date.getUTCFullYear();
  return `${month2}/${day}/${year}`;
}
function firstDayOfTagu(w1, yd) {
  const cacheKey = `${w1}-${yd}`;
  const cached = caches.firstDayOfTagu.get(cacheKey);
  if (cached)
    return cached;
  const tg1 = w1 + 354 * yd - 102;
  const result = {
    jd: tg1,
    gd: formatDate3(julianToDate(tg1))
  };
  caches.firstDayOfTagu.set(cacheKey, result);
  return result;
}

// src/lib/baydin.ts
var BURMESE_NUMERALS = [
  "၀",
  "၁",
  "၂",
  "၃",
  "၄",
  "၅",
  "၆",
  "၇",
  "၈",
  "၉"
];
var REVERSED_NUMERAL_MAP = Object.freeze(BURMESE_NUMERALS.reduce((map, numeral, index) => ({ ...map, [numeral]: index }), {}));
var BURMESE_WORDS = [
  "သုည",
  "တစ်",
  "နှစ်",
  "သုံး",
  "လေး",
  "ငါး",
  "ခြောက်",
  "ခုနှစ်",
  "ရှစ်",
  "ကိုး"
];
var PLACE_VALUES = [
  "ကုဋေ",
  "သန်း",
  "သိန်း",
  "သောင်း",
  "ထောင်",
  "ရာ",
  "ဆယ်",
  ""
];
var MAHARBOTE_SIGNS = [
  "ဘင်္ဂ",
  "မရဏ",
  "အထွန်း",
  "သိုက်",
  "ရာဇာ",
  "ပုတိ",
  "အဓိပတိ"
];
var CHINESE_ZODIAC_EN = [
  "Rat",
  "Ox",
  "Tiger",
  "Rabbit",
  "Dragon",
  "Snake",
  "Horse",
  "Goat",
  "Monkey",
  "Rooster",
  "Dog",
  "Pig"
];
var CHINESE_ZODIAC_MY = [
  "ကြွက်",
  "နွား",
  "ကျား",
  "ယုန်",
  "နဂါး",
  "မြွေ",
  "မြင်း",
  "ဆိတ်",
  "မြောက်",
  "ကြက်",
  "ခွေး",
  "ဝက်"
];
var ZODIAC_LOOKUP = Object.freeze([
  null,
  Object.freeze({
    early: { sign: "Capricorn", sign_mm: "မကာရ", cutoffDay: 19 },
    late: { sign: "Aquarius", sign_mm: "ကုံ" }
  }),
  Object.freeze({
    early: { sign: "Aquarius", sign_mm: "ကုံ", cutoffDay: 18 },
    late: { sign: "Pisces", sign_mm: "မိန်" }
  }),
  Object.freeze({
    early: { sign: "Pisces", sign_mm: "မိန်", cutoffDay: 20 },
    late: { sign: "Aries", sign_mm: "မိဿ" }
  }),
  Object.freeze({
    early: { sign: "Aries", sign_mm: "မိဿ", cutoffDay: 19 },
    late: { sign: "Taurus", sign_mm: "ပြိဿ" }
  }),
  Object.freeze({
    early: { sign: "Taurus", sign_mm: "ပြိဿ", cutoffDay: 20 },
    late: { sign: "Gemini", sign_mm: "မေထုန်" }
  }),
  Object.freeze({
    early: { sign: "Gemini", sign_mm: "မေထုန်", cutoffDay: 20 },
    late: { sign: "Cancer", sign_mm: "ကရကဋ်" }
  }),
  Object.freeze({
    early: { sign: "Cancer", sign_mm: "ကရကဋ်", cutoffDay: 22 },
    late: { sign: "Leo", sign_mm: "သိဟ်" }
  }),
  Object.freeze({
    early: { sign: "Leo", sign_mm: "သိဟ်", cutoffDay: 22 },
    late: { sign: "Virgo", sign_mm: "ကန်" }
  }),
  Object.freeze({
    early: { sign: "Virgo", sign_mm: "ကန်", cutoffDay: 22 },
    late: { sign: "Libra", sign_mm: "တူ" }
  }),
  Object.freeze({
    early: { sign: "Libra", sign_mm: "တူ", cutoffDay: 22 },
    late: { sign: "Scorpio", sign_mm: "ဗြိစ္ဆာ" }
  }),
  Object.freeze({
    early: { sign: "Scorpio", sign_mm: "ဗြိစ္ဆာ", cutoffDay: 21 },
    late: { sign: "Sagittarius", sign_mm: "ဓနု" }
  }),
  Object.freeze({
    early: { sign: "Sagittarius", sign_mm: "ဓနု", cutoffDay: 21 },
    late: { sign: "Capricorn", sign_mm: "မကာရ" }
  })
]);
function maharbote(myanmarYear, weekday2) {
  const yearRemainder = myanmarYear % 7 || 7;
  const sequence = [yearRemainder];
  for (let i = 0;i < 6; i++) {
    let next = sequence[i] + 3;
    if (next > 7) {
      next -= 7;
    }
    sequence.push(next);
  }
  const signIndex = sequence.indexOf(weekday2);
  return MAHARBOTE_SIGNS[signIndex] || MAHARBOTE_SIGNS[0];
}
function numerology(num) {
  const sumDigits = (n) => {
    return n.toString().split("").reduce((acc, digit) => acc + parseInt(digit, 10), 0);
  };
  let result = sumDigits(num);
  while (result > 9) {
    result = sumDigits(result);
  }
  return result;
}
function numFormat(num) {
  const numStr = num.toString();
  const length = numStr.length;
  if (length > 7) {
    const kotiPart = numStr.slice(0, length - 7);
    const remainderPart = numStr.slice(length - 7);
    if (kotiPart.length >= 8) {
      return num.toString();
    }
    return formatPart(parseInt(kotiPart, 10)) + PLACE_VALUES[0] + formatPart(parseInt(remainderPart, 10));
  }
  return formatPart(num);
}
function formatPart(num) {
  const numStr = num.toString();
  const length = numStr.length;
  let result = "";
  if (!length)
    return result;
  numStr.split("").forEach((digit, index) => {
    const digitValue = parseInt(digit, 10);
    if (digitValue !== 0) {
      const placeIndex = 8 + index - length;
      result += BURMESE_WORDS[digitValue] + PLACE_VALUES[placeIndex];
    }
  });
  return result;
}
function chineseZodiac(year) {
  if (typeof year !== "number" || !Number.isInteger(year) || year <= 0) {
    throw new Error("Please provide a valid year as a positive integer.");
  }
  const index = (year - 4) % 12;
  return {
    sign: CHINESE_ZODIAC_EN[index],
    signInBurmese: CHINESE_ZODIAC_MY[index]
  };
}
function zodiac(day, month2) {
  if (typeof day !== "number" || typeof month2 !== "number" || day < 1 || day > 31 || month2 < 1 || month2 > 12) {
    throw new Error("Invalid date or month input");
  }
  const monthData2 = ZODIAC_LOOKUP[month2];
  if (!monthData2) {
    throw new Error("Could not determine zodiac sign");
  }
  if (day <= monthData2.early.cutoffDay) {
    return {
      sign: monthData2.early.sign,
      sign_mm: monthData2.early.sign_mm
    };
  }
  return {
    sign: monthData2.late.sign,
    sign_mm: monthData2.late.sign_mm
  };
}
// src/lib/validator.ts
var { LM: LM3, SY: SY5, MO: MO4 } = CONST;
function validateMyanmarYear(my) {
  const issues = [];
  const warnings = [];
  if (my < 0) {
    warnings.push({
      type: "warning",
      code: "NEGATIVE_YEAR",
      message: `Myanmar year ${my} is negative. Calendar may be inaccurate for years before 0 ME.`,
      value: my
    });
  }
  if (my > 9999) {
    warnings.push({
      type: "warning",
      code: "FUTURE_YEAR",
      message: `Myanmar year ${my} is far in the future. Predictions may be inaccurate.`,
      value: my
    });
  }
  let expectedEra;
  if (my >= 1312) {
    expectedEra = 3;
  } else if (my >= 1217) {
    expectedEra = 2;
  } else {
    expectedEra = 1;
  }
  const watatInfo = isWatatYear(my);
  if (watatInfo.era !== expectedEra) {
    issues.push({
      type: "error",
      code: "ERA_MISMATCH",
      message: `Year ${my} assigned to era ${watatInfo.era}, expected era ${expectedEra}.`,
      value: my
    });
  }
  if (watatInfo.ed < 0) {
    issues.push({
      type: "error",
      code: "NEGATIVE_EXCESS_DAYS",
      message: `Excess days (${watatInfo.ed}) cannot be negative.`,
      value: watatInfo.ed
    });
  }
  if (watatInfo.ed > 100) {
    issues.push({
      type: "error",
      code: "EXCESS_DAYS_TOO_LARGE",
      message: `Excess days (${watatInfo.ed}) is unreasonably large.`,
      value: watatInfo.ed
    });
  }
  const exceptions = getExceptions(my);
  const fmeException = findException(my, exceptions.fme);
  const wteException = findException(my, exceptions.wte);
  if (fmeException !== undefined) {
    warnings.push({
      type: "info",
      code: "FME_EXCEPTION",
      message: `Year ${my} has full moon day exception: ${fmeException > 0 ? "+" : ""}${fmeException} day(s).`,
      value: fmeException
    });
  }
  if (wteException !== undefined) {
    warnings.push({
      type: "info",
      code: "WTE_EXCEPTION",
      message: `Year ${my} has watat year exception: ${wteException === 1 ? "watat" : "common"}.`,
      value: wteException
    });
  }
  return {
    valid: issues.length === 0,
    issues,
    warnings,
    year: my,
    era: watatInfo.era,
    isWatat: watatInfo.isWatatYear,
    excessDays: watatInfo.ed
  };
}
function validateWatatYear(my) {
  const baseValidation = validateMyanmarYear(my);
  const watatInfo = isWatatYear(my);
  const issues = [...baseValidation.issues];
  const warnings = [...baseValidation.warnings];
  if (watatInfo.era === 3) {
    if (watatInfo.ed < CONST.thirdEra.TA) {
      const adjustedEd = watatInfo.ed + LM3;
      if (adjustedEd < CONST.thirdEra.TW) {
        if (watatInfo.isWatatYear) {
          issues.push({
            type: "error",
            code: "WATAT_THRESHOLD_VIOLATION",
            message: `Year ${my} marked as watat but adjusted excess days (${adjustedEd}) < threshold (${CONST.thirdEra.TW}).`,
            value: {
              ed: watatInfo.ed,
              adjustedEd,
              threshold: CONST.thirdEra.TW
            }
          });
        }
      }
    }
  }
  if (watatInfo.era === 1) {
    const remainder = (my * 7 + 2) % 19;
    const isWatatByCycle = [2, 5, 7, 10, 13, 15, 18].includes(remainder);
    if (isWatatByCycle !== watatInfo.isWatatYear) {
      const exceptions = getExceptions(my);
      const wteException = findException(my, exceptions.wte);
      if (wteException === undefined) {
        warnings.push({
          type: "warning",
          code: "METONIC_CYCLE_VIOLATION",
          message: `Year ${my} remainder ${remainder} ${isWatatByCycle ? "should be" : "should not be"} watat (no exception found).`,
          value: {
            remainder,
            expected: isWatatByCycle,
            actual: watatInfo.isWatatYear
          }
        });
      }
    }
  }
  return {
    ...baseValidation,
    issues,
    warnings,
    watatValid: issues.length === 0,
    metonicRemainder: watatInfo.era === 1 ? (my * 7 + 2) % 19 : undefined,
    isWatatByAlgorithm: watatInfo.isWatatYear,
    hasException: findException(my, getExceptions(my).wte) !== undefined
  };
}
function validateFullMoonDay(my) {
  const baseValidation = validateMyanmarYear(my);
  const watatInfo = isWatatYear(my);
  let calculatedJd = 0;
  let adjustedJd = 0;
  const issues = [...baseValidation.issues];
  if (watatInfo.isWatatYear) {
    let WO;
    switch (true) {
      case my < 1100:
        WO = CONST.firstEra.WO1;
        break;
      case my >= 1100:
        WO = CONST.firstEra.WO2;
        break;
      default:
        WO = 0;
    }
    switch (watatInfo.era) {
      case 1:
        calculatedJd = Math.round(SY5 * my + MO4 - watatInfo.ed + 4.5 * LM3 + WO);
        break;
      case 2:
        WO = CONST.secondEra.WO;
        calculatedJd = Math.round(SY5 * my + MO4 - watatInfo.ed + 4.5 * LM3 + WO);
        break;
      case 3:
        WO = CONST.thirdEra.WO;
        calculatedJd = Math.round(SY5 * my + MO4 - watatInfo.ed + 4.5 * LM3 + WO);
        break;
    }
    adjustedJd = calculatedJd;
    const exceptions = getExceptions(my);
    const fmeException = findException(my, exceptions.fme);
    if (fmeException !== undefined) {
      adjustedJd = calculatedJd + fmeException;
      baseValidation.warnings.push({
        type: "info",
        code: "FME_EXCEPTION_APPLIED",
        message: `Full moon day adjusted by ${fmeException > 0 ? "+" : ""}${fmeException} day(s).`,
        value: {
          calculated: calculatedJd,
          adjusted: adjustedJd,
          adjustment: fmeException
        }
      });
    }
    const date = julianToDate(adjustedJd);
    if (date.getUTCFullYear() < 1900 || date.getUTCFullYear() > 2100) {
      baseValidation.warnings.push({
        type: "warning",
        code: "FULLMOON_OUT_OF_RANGE",
        message: `Full moon day falls outside typical validation range: ${date.toISOString()}.`,
        value: date
      });
    }
    const month2 = date.getUTCMonth();
    if (month2 < 6 || month2 > 7) {
      baseValidation.warnings.push({
        type: "info",
        code: "FULLMOON_NOT_IN_WASO",
        message: `Full moon day of Waso is not in Waso month: ${date.getUTCMonth() + 1}/${date.getUTCDate()}.`,
        value: { month: date.getUTCMonth(), day: date.getUTCDate() }
      });
    }
  }
  return {
    ...baseValidation,
    issues,
    fullMoonValid: issues.filter((i) => i.type === "error").length === 0,
    calculatedJulianDay: calculatedJd,
    adjustedJulianDay: adjustedJd,
    hasFmeException: findException(my, getExceptions(my).fme) !== undefined
  };
}
function validateThingyan(my) {
  const baseValidation = validateMyanmarYear(my);
  const issues = [...baseValidation.issues];
  const thingyanData = thingyan(my);
  const akyoDate = new Date(thingyanData.akyo);
  const akyaDate = new Date(thingyanData.akya);
  const atatDate = new Date(thingyanData.atat);
  const newYearDate = new Date(thingyanData.new_year_day);
  if (akyoDate >= akyaDate) {
    issues.push({
      type: "error",
      code: "THINGYAN_ORDER_VIOLATION",
      message: `Akyo day (${thingyanData.akyo}) must be before Akya day (${thingyanData.akya}).`,
      value: { akyo: thingyanData.akyo, akya: thingyanData.akya }
    });
  }
  if (akyaDate >= atatDate) {
    issues.push({
      type: "error",
      code: "THINGYAN_ORDER_VIOLATION",
      message: `Akya day (${thingyanData.akya}) must be before Atat day (${thingyanData.atat}).`,
      value: { akya: thingyanData.akya, atat: thingyanData.atat }
    });
  }
  if (atatDate >= newYearDate) {
    issues.push({
      type: "error",
      code: "THINGYAN_ORDER_VIOLATION",
      message: `Atat day (${thingyanData.atat}) must be before New Year day (${thingyanData.new_year_day}).`,
      value: { atat: thingyanData.atat, new_year: thingyanData.new_year_day }
    });
  }
  if (thingyanData.akyat.length < 1) {
    issues.push({
      type: "error",
      code: "NO_AKYAT_DAYS",
      message: "Thingyan must have at least one akyat day.",
      value: thingyanData.akyat
    });
  }
  if (thingyanData.akyat.length > 3) {
    issues.push({
      type: "warning",
      code: "UNUSUAL_AKYAT_COUNT",
      message: `Thingyan has ${thingyanData.akyat.length} akyat days, which is unusual (typically 1-3).`,
      value: thingyanData.akyat.length
    });
  }
  const akyaTimeDate = new Date(thingyanData.akyaTime);
  const atatTimeDate = new Date(thingyanData.atatTime);
  const thingyanLength = (atatTimeDate.getTime() - akyaTimeDate.getTime()) / (1000 * 60 * 60 * 24);
  const expectedLength = my >= CONST.SE3 ? 2.169918982 : 2.1675;
  if (Math.abs(thingyanLength - expectedLength) > 0.01) {
    issues.push({
      type: "warning",
      code: "THINGYAN_LENGTH_MISMATCH",
      message: `Thingyan length (${thingyanLength.toFixed(6)}) differs from expected (${expectedLength}).`,
      value: { actual: thingyanLength, expected: expectedLength }
    });
  }
  return {
    ...baseValidation,
    issues,
    thingyanValid: issues.filter((i) => i.type === "error").length === 0,
    akyatDaysCount: thingyanData.akyat.length,
    thingyanLength,
    expectedLength
  };
}
function validateCalendarConsistency(startYear, endYear) {
  const issues = [];
  const warnings = [];
  const yearResults = new Map;
  for (let my = startYear;my <= endYear; my++) {
    const result = validateMyanmarYear(my);
    yearResults.set(my, result);
    if (!result.valid) {
      issues.push(...result.issues.map((i) => ({
        ...i,
        context: { year: my, ...i }
      })));
    }
    warnings.push(...result.warnings.map((i) => ({
      ...i,
      context: { year: my, ...i }
    })));
    if (my > startYear && !result.isWatat) {
      const prevResult = yearResults.get(my - 1);
      if (prevResult && !prevResult.isWatat) {
        if (my - 1 > startYear) {
          const prevPrevResult = yearResults.get(my - 2);
          if (prevPrevResult && !prevPrevResult.isWatat) {
            warnings.push({
              type: "info",
              code: "CONSECUTIVE_COMMON_YEARS",
              message: `Three consecutive common years found: ${my - 2}, ${my - 1}, ${my}.`,
              value: { years: [my - 2, my - 1, my] }
            });
          }
        }
      }
    }
  }
  const watatYears = Array.from(yearResults.values()).filter((r) => r.isWatat).length;
  const totalYears = endYear - startYear + 1;
  const watatFrequency = watatYears / totalYears;
  if (watatFrequency < 0.3 || watatFrequency > 0.4) {
    warnings.push({
      type: "info",
      code: "WATAT_FREQUENCY",
      message: `Watat year frequency (${(watatFrequency * 100).toFixed(1)}%) outside typical range (30-40%).`,
      value: { watatYears, totalYears, frequency: watatFrequency }
    });
  }
  return {
    valid: issues.length === 0,
    issues,
    warnings,
    startYear,
    endYear,
    totalYears,
    watatYears,
    commonYears: totalYears - watatYears,
    watatFrequency,
    yearResults: Object.fromEntries(yearResults)
  };
}
function isValidYear(my) {
  const validation = validateMyanmarYear(my);
  return validation.valid && validation.issues.length === 0;
}
function getValidationSummary(validation) {
  const lines = [
    `Validation for Myanmar Year ${validation.year}:`,
    `  Era: ${validation.era}`,
    `  Is Watat: ${validation.isWatat}`,
    `  Excess Days: ${validation.excessDays.toFixed(6)}`,
    `  Valid: ${validation.valid ? "✓" : "✗"}`
  ];
  if (validation.issues.length > 0) {
    lines.push(`  Issues (${validation.issues.length}):`);
    validation.issues.forEach((issue, i) => {
      lines.push(`    ${i + 1}. [${issue.code.toUpperCase()}] ${issue.message}`);
    });
  }
  if (validation.warnings.length > 0) {
    lines.push(`  Warnings (${validation.warnings.length}):`);
    validation.warnings.forEach((warning, i) => {
      lines.push(`    ${i + 1}. [${warning.code.toUpperCase()}] ${warning.message}`);
    });
  }
  return lines.join(`
`);
}

// src/index.ts
class Mycal {
  gDate;
  nearestWatatYearValue;
  nearestWasoValue;
  cValue;
  bValue;
  tg1Value;
  mdValue;
  mmlValue;
  constructor(dateString, _options) {
    this.gDate = dateString instanceof Date ? new Date(dateString.getTime()) : dateString ? new Date(dateString) : new Date;
    if (Number.isNaN(this.gDate.getTime())) {
      throw new RangeError("Invalid Gregorian date");
    }
    const isoDate = typeof dateString === "string" ? dateString.match(/^(\d{4})-(\d{2})-(\d{2})(?:$|T)/) : null;
    const slashDate = typeof dateString === "string" ? dateString.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/) : null;
    if (isoDate || slashDate) {
      const year = Number(isoDate ? isoDate[1] : slashDate[3]);
      const month2 = Number(isoDate ? isoDate[2] : slashDate[1]);
      const day = Number(isoDate ? isoDate[3] : slashDate[2]);
      const calendarDate = new Date(0);
      calendarDate.setUTCFullYear(year, month2 - 1, day);
      if (calendarDate.getUTCFullYear() !== year || calendarDate.getUTCMonth() + 1 !== month2 || calendarDate.getUTCDate() !== day) {
        throw new RangeError("Invalid Gregorian date");
      }
    }
    const utcYear = this.gDate.getUTCFullYear();
    const utcMonth = this.gDate.getUTCMonth();
    const utcDay = this.gDate.getUTCDate();
    this.gDate = new Date(Date.UTC(utcYear, utcMonth, utcDay, 12, 0, 0, 0));
    this.gDate = new Date(this.gDate.getTime() + 5.5 * 60 * 60 * 1000);
  }
  get year() {
    return myYear(this.gDate);
  }
  get buddhistEraYear() {
    return buddhistEraYear(Number(this.year.en));
  }
  get thingyan() {
    return thingyan(Number(this.year.en));
  }
  get watatYear() {
    const watatInfo = watat(Number(this.year.en));
    const { nearestWatatInfo } = watatInfo;
    let isBigWatat = false;
    const currentWaso = waso(watatInfo, Number(this.year.en));
    const nearestWaso = waso(nearestWatatInfo, nearestWatatInfo.year);
    this.nearestWatatYearValue = nearestWatatInfo.year;
    this.nearestWasoValue = nearestWaso.jd;
    if (watatInfo.isWatatYear) {
      isBigWatat = (currentWaso.jd - nearestWaso.jd) % 354 === 30 ? false : true;
    }
    this.cValue = watatInfo.isWatatYear ? 0 : 1;
    this.bValue = isBigWatat ? 1 : 0;
    return { watat: watatInfo.isWatatYear, isBigWatat };
  }
  get waso() {
    return waso(watat(Number(this.year.en)), Number(this.year.en)).gd;
  }
  get firstDayOfTagu() {
    this.watatYear;
    const tg1 = firstDayOfTagu(this.nearestWasoValue, Number(this.year.en) - this.nearestWatatYearValue);
    this.tg1Value = tg1.jd;
    return tg1.gd;
  }
  get month() {
    this.firstDayOfTagu;
    const myanmarMonth = myMonth(this.gDate, this.tg1Value, this.cValue, this.bValue);
    this.mdValue = myanmarMonth.md;
    this.mmlValue = myanmarMonth.mml;
    return myanmarMonth.mm;
  }
  get day() {
    this.month;
    return myDay(this.mdValue, this.mmlValue);
  }
  get weekday() {
    return myWeekday(this.gDate);
  }
  get maharbote() {
    return maharbote(Number(this.year.en), this.gDate.getDay() + 1);
  }
  get numerology() {
    return numerology(this.gDate.getDate());
  }
  numFormat(num) {
    return numFormat(num);
  }
  get chineseZodiac() {
    return chineseZodiac(this.gDate.getFullYear());
  }
  static zodiac(day, month2) {
    return zodiac(day, month2);
  }
}
var src_default = Mycal;
export {
  zodiac,
  validateWatatYear,
  validateThingyan,
  validateMyanmarYear,
  validateFullMoonDay,
  validateCalendarConsistency,
  numerology,
  numFormat,
  maharbote,
  isValidYear,
  getValidationSummary,
  src_default as default,
  chineseZodiac,
  Mycal
};
