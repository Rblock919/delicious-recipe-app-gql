import dateFormat from 'dateformat';

export const formatDate = (date: string, format: string): string => {
  return dateFormat(date, format);
};
