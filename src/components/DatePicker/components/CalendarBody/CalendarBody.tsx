import { FC, useRef, TouchEvent } from "react";
import { useCalendarDays } from "../../hooks/useCalendarDays";
import { getWeeks } from "../../common/getWeeks";
import { CalendarDays } from "../CalendarDays/CalendarDays";
import { tUseCalendarSlider } from "../../hooks/useCalendarSlider";
import { CalendarTimeTab } from "../CalendarTimeTab/CalendarTimeTab";
import { useDatePicker } from "../../DatePicker";
import "./CalendarBody.scss";

interface iCalendarBody extends Pick<tUseCalendarSlider, "sliderRef" | "onTouchStart"> {
  onTouchEnd: (e: TouchEvent<HTMLDivElement>) => void;
  showTimeTab: boolean;
};

export const CalendarBody: FC<iCalendarBody> = ({ showTimeTab, sliderRef, onTouchEnd, onTouchStart }) => {
  const { date, startWeekWith = "Mon" } = useDatePicker();
  const days = useCalendarDays({ date, startWeekWith });
  const weeks = useRef(getWeeks(startWeekWith));

  return (
    <div className="CalendarBody">
      {!showTimeTab && (
        <>
          <div className="CalendarBody-weeks">
            {weeks.current?.map((day) => (
              <div className="CalendarBody-week" key={day} >
                {day}
              </div>
            ))}
          </div>

          <div
            className="CalendarBody-slider"
            ref={sliderRef}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            <CalendarDays {...days} />
            <CalendarDays {...days} />
            <CalendarDays {...days} />
          </div>
        </>
      )}

      {showTimeTab && <CalendarTimeTab />}
    </div>
  );
};