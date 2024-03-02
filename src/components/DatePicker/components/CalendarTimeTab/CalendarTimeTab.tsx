import { FC } from "react";
import { FORMATS, useCalendarTimeTab } from "../../hooks/useCalendarTimeTab";
import { useDatePicker } from "../../DatePicker";

export const CalendarTimeTab: FC = () => {
  const { date, changeDate } = useDatePicker();
  const { hours, minutes, timeFormat, onClick, ...input } = useCalendarTimeTab({ changeDate, date });

  return (
    <div className="Calendar-body CalendarTimeTab">
      <input
        type="text"
        name="hours"
        id="hours"
        className="CalendarTimeTab-input"
        placeholder="12"
        autoComplete="off"
        autoFocus
        maxLength={2}
        value={hours}
        {...input}
      />

      <span className="CalendarTimeTab-delimiter">:</span>

      <input
        type="text"
        name="minutes"
        id="minutes"
        className="CalendarTimeTab-input"
        placeholder="00"
        autoComplete="off"
        maxLength={2}
        value={minutes}
        {...input}
      />

      {FORMATS.map(content => (
        <button
          className={`CalendarTimeTab-btn ${timeFormat === content ? "active" : ""}`}
          type="button"
          onClick={onClick}
          name={content}
          key={content}
        >
          {content}
        </button>
      ))}
    </div>
  );
};
