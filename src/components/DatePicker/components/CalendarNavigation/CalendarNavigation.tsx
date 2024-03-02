import { FC, useRef } from "react";
import { tNavigationReturns } from "../../hooks/useCalendarNavigation";
import { iExtendedDate } from "../../common/DateExtend";

interface iCalendarNavigation extends Omit<tNavigationReturns, "sliderRef" | "onTouchStart" | "onTouchEnd"> {
  date: iExtendedDate;
};

export const CalendarNavigation: FC<iCalendarNavigation> = ({ date, yearInput, showYearInput, onPrev, onNext, setShowYearInput, ...input }) => {

  const ref = useRef<HTMLInputElement | null>(null);

  return (
    <div className="CalendarNavigation">
      <button
        className="CalendarNavigation-btn"
        type="button"
        aria-label="previous mouth"
        onClick={onPrev}
      />

      <div className="CalendarNavigation-title">
        <span className="CalendarNavigation-title-text">{date.longMonth()}</span>

        {!showYearInput && (
          <button
            type="button"
            className="CalendarNavigation-title-btn"
            onClick={() => setShowYearInput(pv => !pv)}
          >
            {date.longYear()}
          </button>
        )}

        {showYearInput && (
          <input
            type="text"
            className="CalendarNavigation-title-input"
            value={yearInput}
            ref={ref}
            key={1}
            id="calendar-year-input"
            {...input}
          />
        )}
      </div>

      <button
        type="button"
        className="CalendarNavigation-btn"
        aria-label="next mouth"
        onClick={onNext}
      />
    </div>
  );
};
