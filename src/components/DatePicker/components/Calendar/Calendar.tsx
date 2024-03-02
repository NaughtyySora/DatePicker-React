import { useEffect, useRef, useState } from "react";
import { CalendarHead } from "../CalendarHead/CalendarHead";
import { CalendarNavigation } from "../CalendarNavigation/CalendarNavigation";
import { useCalendarNavigation } from "../../hooks/useCalendarNavigation";
import { CalendarBody } from "../CalendarBody/CalendarBody";
import { CalendarFooter } from "../CalendarFooter/CalendarFooter";
import { useCalendarSlider } from "../../hooks/useCalendarSlider";
import { useDatePicker } from "../../DatePicker";

export const Calendar = () => {
  const { date, show, position, changeDate } = useDatePicker();
  const [showTimeTab, setShowTimeTab] = useState(false);
  const { animateSlide, onTouchEnd, onTouchStart, sliderRef } = useCalendarSlider();
  const navigation = useCalendarNavigation({ date, animateSlide, changeDate });
  const calendarRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!show || !calendarRef?.current || position === "bottom") return;

    const { y, x } = calendarRef.current.getBoundingClientRect();

    if (x < 10 || y < 10) {
      calendarRef.current.classList.remove("left");
      calendarRef.current.classList.add("bottom");
    }
  }, [show, position]);

  return (
    <div
      className={`Calendar ${position} ${show ? "active" : ""}`}
      ref={calendarRef}
    >
      <CalendarHead
        onTabChange={setShowTimeTab}
        showTimeTab={showTimeTab}
      />

      <CalendarNavigation {...navigation} date={date} />

      <CalendarBody
        showTimeTab={showTimeTab}
        sliderRef={sliderRef}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd.bind(null, navigation.onNext, navigation.onPrev)}
      />

      <CalendarFooter />
    </div>
  );
};