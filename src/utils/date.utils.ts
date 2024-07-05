export const formatDate = (date: Date): string => {
  if (isNaN(date.getTime())) {
    return 'Invalid Date';
  }
  return date.toISOString().split('T')[0];
};
