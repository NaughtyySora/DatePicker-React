import { FC } from "react";
import { tUseCalendarDaysReturns } from "../../hooks/useCalendarDays";
import { isDateDisabled } from "../../common/isDateDisabled";
import { useDatePicker } from "../../DatePicker";

export const CalendarDays: FC<tUseCalendarDaysReturns> = ({ prevDays, currentDays, nextDays }) => {
  const { date, changeDate, minmax, activeDay, setActiveDay } = useDatePicker();

  const onClick = (disabled: boolean, dayCount: number) => {
    if (disabled) return;
    setActiveDay(dayCount);
    changeDate(date.setDate(dayCount));
  };

  return (
    <div className="CalendarDays">
      {prevDays?.map(day => (
        <button
          type="button"
          className="CalendarDays-day"
          disabled
          key={day}
          tabIndex={-1}
        >
          {day}
        </button>
      ))}

      {currentDays?.map(content => {
        const disabled = isDateDisabled(minmax, date, content);
        return (
          <button
            type="button"
            className={`CalendarDays-day ${activeDay === content ? "active" : ""}`}
            key={content}
            disabled={disabled}
            onClick={() => onClick(disabled, content)}
          >
            {content}
          </button>
        )
      })}

      {nextDays?.map(day => (
        <button
          type="button"
          className="CalendarDays-day"
          disabled
          key={day}
          tabIndex={-1}
        >
          {day}
        </button>
      ))}
    </div>
  );
};