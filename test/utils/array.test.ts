import { removeDuplicates, groupBy } from '../../src/utils/array.utils';

describe('removeDuplicates', () => {
  it('should remove duplicates from an array of numbers', () => {
    const array = [1, 2, 2, 3, 4, 4, 5];
    const result = removeDuplicates(array);
    expect(result).toEqual([1, 2, 3, 4, 5]);
  });

  it('should remove duplicates from an array of strings', () => {
    const array = ['a', 'b', 'b', 'c', 'a'];
    const result = removeDuplicates(array);
    expect(result).toEqual(['a', 'b', 'c']);
  });

  it('should return an empty array when input is an empty array', () => {
    const array: number[] = [];
    const result = removeDuplicates(array);
    expect(result).toEqual([]);
  });

  it('should return the same array if there are no duplicates', () => {
    const array = [1, 2, 3, 4, 5];
    const result = removeDuplicates(array);
    expect(result).toEqual([1, 2, 3, 4, 5]);
  });
});

describe('groupBy', () => {
  it('should group objects by a given key', () => {
    const array = [
      { id: 1, category: 'fruit', name: 'apple' },
      { id: 2, category: 'vegetable', name: 'carrot' },
      { id: 3, category: 'fruit', name: 'banana' },
      { id: 4, category: 'vegetable', name: 'lettuce' },
    ];
    const result = groupBy(array, 'category');
    expect(result).toEqual({
      fruit: [
        { id: 1, category: 'fruit', name: 'apple' },
        { id: 3, category: 'fruit', name: 'banana' },
      ],
      vegetable: [
        { id: 2, category: 'vegetable', name: 'carrot' },
        { id: 4, category: 'vegetable', name: 'lettuce' },
      ],
    });
  });

  it('should handle an empty array', () => {
    const array: { id: number; category: string; name: string }[] = [];
    const result = groupBy(array, 'category');
    expect(result).toEqual({});
  });

  it('should handle grouping by a different key', () => {
    const array = [
      { id: 1, category: 'fruit', name: 'apple' },
      { id: 2, category: 'vegetable', name: 'carrot' },
      { id: 3, category: 'fruit', name: 'banana' },
      { id: 4, category: 'vegetable', name: 'lettuce' },
    ];
    const result = groupBy(array, 'name');
    expect(result).toEqual({
      apple: [{ id: 1, category: 'fruit', name: 'apple' }],
      carrot: [{ id: 2, category: 'vegetable', name: 'carrot' }],
      banana: [{ id: 3, category: 'fruit', name: 'banana' }],
      lettuce: [{ id: 4, category: 'vegetable', name: 'lettuce' }],
    });
  });

  it('should handle an array with one object', () => {
    const array = [{ id: 1, category: 'fruit', name: 'apple' }];
    const result = groupBy(array, 'category');
    expect(result).toEqual({
      fruit: [{ id: 1, category: 'fruit', name: 'apple' }],
    });
  });
});
