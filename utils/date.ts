import { MONTHS, WEEK_DAYS } from './constants';

export const getDateByDayOffset = (hour?: number, offset?: number) => {
  const newDate = new Date();

  newDate.setDate(newDate.getDate() + (offset ?? 0));

  if (hour !== undefined) {
    newDate.setHours(hour, 0, 0, 0);
  }

  return new Date(newDate);
};

export const dateToMonthDayString = ({ date }: { date?: Date }) => {
  if (date) {
    return `${MONTHS[date.getMonth()].normal} ${date.getDate()}`;
  } else {
    return '';
  }
};

export const getDateDifferenceInDaysMidnight = (
  date1: string,
  date2: string,
) => {
  const date2Rep = new Date(date2 + 'Z');
  date2Rep.setHours(0, 0, 0, 0);

  const date1Rep = new Date(date1 + 'Z');
  const msDiff = date1Rep.getTime() - date2Rep.getTime();

  return Math.floor(msDiff / (1000 * 60 * 60 * 24));
};

export const getDateDifferenceInSeconds = (date1: string, date2: string) => {
  const msDiff = new Date(date1).getTime() - new Date(date2).getTime();

  return Math.floor(msDiff / 1000);
};

export const getDateDifferenceInMilliseconds = (
  date1: string,
  date2?: string,
) => {
  const msDiff =
    new Date(date1).getTime() -
    new Date(
      date2 ?? new Date(Date.now()).toISOString().slice(0, -1),
    ).getTime();

  return Math.floor(msDiff);
};

export const stringifyDate = ({ date }: { date?: Date }) => {
  if (date) {
    const dayName = WEEK_DAYS[date.getDay()].normal;
    const month = MONTHS[date.getMonth()].short;
    const day = date.getDate();
    const year = date.getFullYear();

    return `${dayName}, ${month} ${day} ${year}`;
  } else {
    return '';
  }
};
