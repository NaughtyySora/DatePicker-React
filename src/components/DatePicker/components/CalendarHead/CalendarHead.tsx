import { Dispatch, FC, SetStateAction } from "react";
import { useDatePicker } from "../../DatePicker";
interface iCalendarHead {
  onTabChange: Dispatch<SetStateAction<boolean>>;
  showTimeTab: boolean;
};

export const CalendarHead: FC<iCalendarHead> = ({ onTabChange, showTimeTab }) => {
  const { type, date, changeDate } = useDatePicker();
  const hasTimeTab = type === "date/time";

  return (
    <div className="CalendarHead">
      <p className="CalendarHead-week">{date.longMonth()}</p>

      <button
        className={`CalendarHead-btn ${!showTimeTab ? "active" : ""}`}
        onClick={() => onTabChange(false)}
        type="button"
      >
        {`${date.dayMonth()} ${date.longYear()}`}
      </button>

      {hasTimeTab && (
        <button
          className={`CalendarHead-btn ${showTimeTab ? "active" : ""}`}
          onClick={() => onTabChange(true)}
          type="button"
        >
          {date.time()}
        </button>
      )}

      <button
        className="CalendarHead-now"
        onClick={() => changeDate(Date.now())}
        type="button"
      >
        <span>Now</span>
      </button>
    </div>
  );
};
