import { dateFormatter } from "./formatters";

export interface iExtendedDate extends Date {
  dayMonth: () => string;
  longMonth: () => string;
  longYear: () => string;
  time: () => string;
  days: (deltaMonth?: number) => number;
  inputDate: () => string;
};

export function DateExtend() { };

DateExtend.prototype.longYear = function () {
  return this.getFullYear().toString().padStart(4, "0");
}

DateExtend.prototype.longMonth = function () {
  return dateFormatter.longMonth(this);
}

DateExtend.prototype.dayMonth = function () {
  return dateFormatter.shortMonthAndDays(this);
}

DateExtend.prototype.time = function () {
  return dateFormatter.time(this);
}

DateExtend.prototype.days = function (deltaMonth: number = 1) {
  return new Date(this.getFullYear(), this.getMonth() + deltaMonth, 0).getDate();
}

DateExtend.prototype.inputDate = function () {
  return dateFormatter.formatter({ day: "2-digit", month: "2-digit", year: "numeric" }, this);
}