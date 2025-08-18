/**
 * Myanmar Number Utilities
 * Custom implementation to replace 'mynum' dependency
 */

export interface MyanmarNumberResult {
  en: string;
  my: string;
}

export class MyanmarNumber {
  private readonly num: number;

  constructor(num: number) {
    this.num = num;
  }

  get numeral(): string {
    return this.toMyanmarNumerals(this.num);
  }

  private toMyanmarNumerals(num: number): string {
    const myanmarDigits: { [key: string]: string } = {
      '0': '၀',
      '1': '၁',
      '2': '၂',
      '3': '၃',
      '4': '၄',
      '5': '၅',
      '6': '၆',
      '7': '၇',
      '8': '၈',
      '9': '၉'
    };

    return num.toString().split('').map(digit => myanmarDigits[digit] || digit).join('');
  }
}

/**
 * Convert a number to both English and Myanmar representations
 */
export function numberToLocalized(num: number): MyanmarNumberResult {
  const myNum = new MyanmarNumber(num);
  return {
    en: num.toString(),
    my: myNum.numeral
  };
}

export default MyanmarNumber;