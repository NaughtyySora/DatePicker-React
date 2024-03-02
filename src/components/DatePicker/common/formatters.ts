type tDate = number | Date;

export const dateFormatter = {
  formatter: (options: Intl.DateTimeFormatOptions, date: tDate) =>
    new Intl.DateTimeFormat("en-US", options || {}).format(date),
  generalDate(date: tDate) {
    return dateFormatter.formatter({ day: "2-digit", month: "2-digit", year: "numeric" }, date);
  },
  generalDateTime(date: tDate) {
    return dateFormatter.formatter({ day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" }, date);
  },
  TwoDigitsDate(date: tDate) {
    return dateFormatter.formatter({ day: "2-digit", year: "2-digit", month: "2-digit" }, date);
  },
  shortMonth(date: tDate) {
    return dateFormatter.formatter({ month: "short", day: "2-digit", year: "numeric" }, date);
  },
  fullDate(date: tDate) {
    return dateFormatter.formatter({
      weekday: "short",
      month: "short",
      day: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    }, date);
  },
  time(date: tDate) {
    return dateFormatter.formatter({ hour: "2-digit", minute: "2-digit" }, date);
  },
  longMonth(date: tDate) {
    return dateFormatter.formatter({ month: "long", }, date);
  },
  shortMonthAndDays(date: tDate) {
    return dateFormatter.formatter({ month: "short", day: "2-digit" }, date);
  },
  hours12: (date: tDate) => {
    return dateFormatter.formatter({ hour12: true, hour: "numeric" }, date).replace(/\D/g, "").padStart(2, "0");
  },
  minutes12: (date: tDate) => {
    return dateFormatter.formatter({ minute: "2-digit" }, date).padStart(2, "0");
  },
  format: (date: tDate) => {
    return dateFormatter.formatter({hour12: true, hour: "numeric" }, date).replace(/\d/g, "").trim();
  },
};