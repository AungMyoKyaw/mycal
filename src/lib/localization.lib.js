const number = [
  {
    en: 0,
    my: '၀'
  },
  {
    en: 1,
    my: '၁'
  },
  {
    en: 2,
    my: '၂'
  },
  {
    en: 3,
    my: '၃'
  },
  {
    en: 4,
    my: '၄'
  },
  {
    en: 5,
    my: '၅'
  },
  {
    en: 6,
    my: '၆'
  },
  {
    en: 7,
    my: '၇'
  },
  {
    en: 8,
    my: '၈'
  },
  {
    en: 9,
    my: '၉'
  }
];

module.exports = {
  month: [
    {
      en: 'Tagu',
      my: 'တန်ခူး'
    },
    {
      en: 'Kason',
      my: 'ကဆုန်'
    },
    {
      en: 'Nayon',
      my: 'နယုန်'
    },
    [
      {en: 'Waso', my: 'ဝါဆို'},
      {en: 'First Waso', my: 'ပဝါဆို'},
      {en: 'Second Waso', my: 'ဒုဝါဆို'}
    ],
    {
      en: 'Wagaung',
      my: 'ဝါခေါင်'
    },
    {
      en: 'Tawthalin',
      my: 'တော်သလင်း'
    },
    {
      en: 'Thadingyut',
      my: 'သီတင်းကျွတ်'
    },
    {
      en: 'Tazaungmon',
      my: 'တန်ဆောင်မုန်း'
    },
    {
      en: 'Nadaw',
      my: 'နတ်တော်'
    },
    {
      en: 'Pyatho',
      my: 'ပြာသို'
    },
    {
      en: 'Tabodwe',
      my: 'တပို့တွဲ'
    },
    {
      en: 'Tabaung',
      my: 'တပေါင်း'
    }
  ],
  moon: [
    {en: 'Waxing', my: 'လဆန်း'},
    {en: 'Full Moon', my: 'လပြည့်'},
    {en: 'Waning', my: 'လပြည့်ကျော်'},
    {en: 'New Moon', my: 'လကွယ်'}
  ],
  number: num => {
    let my = '';
    let en = `${num}`;
    en.trim()
      .split('')
      .forEach(n => {
        my += number[+n].my;
      });
    return {en, my};
  }
};