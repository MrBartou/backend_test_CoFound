import { deepClone, mergeObjects } from '../../src/utils/object.utils';

describe('deepClone', () => {
  it('should create a deep clone of an object', () => {
    const obj = { a: 1, b: { c: 2 } };
    const clone = deepClone(obj);

    expect(clone).toEqual(obj);
    expect(clone).not.toBe(obj);
    expect(clone.b).not.toBe(obj.b);
  });

  it('should create a deep clone of an array', () => {
    const arr = [1, 2, { a: 3 }];
    const clone = deepClone(arr);

    expect(clone).toEqual(arr);
    expect(clone).not.toBe(arr);
    expect(clone[2]).not.toBe(arr[2]);
  });
});

describe('mergeObjects', () => {
  it('should merge two objects', () => {
    const target = { a: 1, b: 2 };
    const source = { b: 3, c: 4 };
    const merged = mergeObjects(target, source);

    expect(merged).toEqual({ a: 1, b: 3, c: 4 });
  });

  it('should handle merging objects with nested properties', () => {
    const target = { a: 1, b: { c: 2 } };
    const source = { b: { d: 3 }, e: 4 };
    const merged = mergeObjects(target, source);

    expect(merged).toEqual({ a: 1, b: { d: 3 }, e: 4 });
  });

  it('should handle merging objects with arrays', () => {
    const target = { a: [1, 2] };
    const source = { b: [3, 4] };
    const merged = mergeObjects(target, source);

    expect(merged).toEqual({ a: [1, 2], b: [3, 4] });
  });
});
