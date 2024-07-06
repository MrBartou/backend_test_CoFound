import { formatDate } from '../../src/utils/date.utils';

describe('formatDate', () => {
  it('should format a date correctly', () => {
    const date = new Date('2024-07-05T12:34:56Z');
    const result = formatDate(date);
    expect(result).toBe('2024-07-05');
  });

  it('should handle different date formats', () => {
    const date1 = new Date('2020-01-01T00:00:00Z');
    const date2 = new Date('1999-12-31T23:59:59Z');
    const date3 = new Date('2000-02-29T12:00:00Z');

    expect(formatDate(date1)).toBe('2020-01-01');
    expect(formatDate(date2)).toBe('1999-12-31');
    expect(formatDate(date3)).toBe('2000-02-29');
  });

  it('should handle different time zones', () => {
    const date1 = new Date('2024-07-05T00:00:00+02:00');
    const date2 = new Date('2024-07-05T00:00:00-07:00');

    expect(formatDate(date1)).toBe('2024-07-04');
    expect(formatDate(date2)).toBe('2024-07-05');
  });

  it('should handle invalid date inputs gracefully', () => {
    const date = new Date('Invalid Date');
    const result = formatDate(date);
    expect(result).toBe('Invalid Date');
  });
});
