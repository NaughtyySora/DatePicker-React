import { FC, memo } from "react";
import { useDatePicker } from "../../DatePicker";
import "./CalendarFooter.scss";

export const CalendarFooter: FC = memo(() => {
  const { changeDate, setShow, setValue } = useDatePicker();

  const onClear = () => {
    changeDate(Date.now());
    setShow(false);
    queueMicrotask(() => {
      setValue("");
    });
  };

  const onSave = () => {
    setShow(false);
  };

  return (
    <div className="CalendarFooter">
      <button
        type="button"
        className="CalendarFooter-btn"
        onClick={onClear}
      >
        Clear
      </button>

      <button
        type="button"
        className="CalendarFooter-btn"
        onClick={onSave}
      >
        Save
      </button>
    </div>
  );
});

CalendarFooter.displayName = "CalendarFooter";