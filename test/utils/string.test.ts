import { capitalize, generateSlug } from '../../src/utils/string.utils';

describe('capitalize', () => {
  it('should capitalize the first letter of a string', () => {
    const text = 'hello';
    const result = capitalize(text);
    expect(result).toBe('Hello');
  });

  it('should handle an empty string', () => {
    const text = '';
    const result = capitalize(text);
    expect(result).toBe('');
  });

  it('should handle a string with one character', () => {
    const text = 'a';
    const result = capitalize(text);
    expect(result).toBe('A');
  });

  it('should handle a string that is already capitalized', () => {
    const text = 'Hello';
    const result = capitalize(text);
    expect(result).toBe('Hello');
  });

  it('should handle a string with multiple words', () => {
    const text = 'hello world';
    const result = capitalize(text);
    expect(result).toBe('Hello world');
  });
});

describe('generateSlug', () => {
  it('should handle an empty string', () => {
    const text = '';
    const result = generateSlug(text);
    expect(result).toBe('');
  });
});
