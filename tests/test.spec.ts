const getPalindromes = (str: string, separator = ' ') =>
  getWordsInString(str, separator)
    .filter(isNotOnly1Char)
    .map(removeAccent)
    .filter(isPalindrome)
    .map(toLowerCase);

const isNotOnly1Char = (str: string) => str.length != 1;

const toLowerCase = (str: string) => str.toLowerCase();
const removeAccent = (str: string) =>
  str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

const getWordsInString = (str: string, separator: string) =>
  str.split(separator);

const isPalindrome = (str: string) => str === str.split('').reverse().join('');

describe('Palindrome', () => {
  test('should return empty when a', () => {
    expect(getPalindromes('a')).toEqual([]);
  });

  test('should return aa when aa', () => {
    expect(getPalindromes('aa')).toEqual(['aa']);
  });

  test('should return empty when ab', () => {
    expect(getPalindromes('ab')).toEqual([]);
  });

  test('should return aba when aba', () => {
    expect(getPalindromes('aba')).toEqual(['aba']);
  });

  test('should return empty when abta', () => {
    expect(getPalindromes('abta')).toEqual([]);
  });

  test('should return aa when AA', () => {
    expect(getPalindromes('AA')).toEqual(['aa']);
  });

  test('should return aa, bb when aa bb', () => {
    expect(getPalindromes('aa bb')).toEqual(['aa', 'bb']);
  });

  test('should return bb when ze bb', () => {
    expect(getPalindromes('ze bb')).toEqual(['bb']);
  });

  test('accent', () => {
    expect(getPalindromes('ée')).toEqual(['ee']);
  });

  test('separator', () => {
    expect(getPalindromes('aa|bb|cc', '|')).toEqual(['aa', 'bb', 'cc']);
  });
});
