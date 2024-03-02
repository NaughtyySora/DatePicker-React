const weeks = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] as const;
type tWeeks = typeof weeks[number];

export const getWeeks = (startWeekWith: tWeeks = "Sun") => {
  const index = weeks.indexOf(startWeekWith);
  if (startWeekWith === "Sun" || !index) return weeks;
  return weeks.slice(index).concat(weeks.slice(0, index))
};