import { iDatePicker } from "../interfaces";
import { iExtendedDate } from "./DateExtend";

export const isDateDisabled = (minmax: iDatePicker["minmax"], date: iExtendedDate, dayCount?: number) => {
  if (!minmax || !Object.keys(minmax)?.length) return false;
  const clone = structuredClone(date);
  dayCount && clone.setDate(dayCount);
  const currentDay = clone.getTime();
  return currentDay <= (minmax.min || -Infinity) || currentDay >= (minmax.max || Infinity);
};