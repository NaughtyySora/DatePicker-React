import {  MouseEvent } from "react";
import { iExtendedDate } from "../common/DateExtend";
import { getWeeks } from "../common/getWeeks";
import { iDatePicker } from "../interfaces";

export interface iCurrentDays {
  className: string;
  content: number;
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
};

export type tStartWeekDay = Exclude<iDatePicker["startWeekWith"], undefined>;

const FIRST_DAY = 0;
const LAST_DAY = 6;
const CALENDAR_DAYS_AMOUNT = 42;

interface iUseCalendarDays {
  date: iExtendedDate;
  startWeekWith: tStartWeekDay;
};

export type tUseCalendarDaysReturns = ReturnType<typeof useCalendarDays>;

export const useCalendarDays = ({ date, startWeekWith }: iUseCalendarDays) => {
  const currentMonthDays = date.days();
  const prevDaysCount = findPrevDaysCount(startWeekWith);
  
  const getPreviewMonthDays = (daysCount: number, date: iExtendedDate) => {
    let prevDays = new Date(date.getFullYear(), date.getMonth(), 0).getDate();
    return Array.from({ length: daysCount }, () => prevDays--).reverse();
  };

  const getNextMonthDays = (prevDaysCount: number, currentMonthDays: number) => {
    const daysCount = CALENDAR_DAYS_AMOUNT - (prevDaysCount + currentMonthDays)
    return Array.from({ length: daysCount }, (_, key) => ++key);
  };

  const getCurrentMonthDays = (dayCount: number) => {
    return Array.from({ length: dayCount }, (_, key) => ++key);
  };

  function findPrevDaysCount(startWeekWith: tStartWeekDay) {
    const weeksList = getWeeks(startWeekWith);
    const localData = new Date(date);
    localData.setDate(0);
    const weekStartsMonth = weeksList[localData.getDay()];
    if (!weekStartsMonth) return FIRST_DAY;
    const startsMonthCount = weeksList.indexOf(weekStartsMonth);
    const startsWeekCount = weeksList.indexOf(startWeekWith) + 1;
    const deltaDays = startsMonthCount - startsWeekCount;
    return deltaDays < FIRST_DAY ? LAST_DAY : deltaDays;
  }

  return {
    prevDays: getPreviewMonthDays(prevDaysCount, date),
    nextDays: getNextMonthDays(prevDaysCount, currentMonthDays),
    currentDays: getCurrentMonthDays(currentMonthDays),
  };
};