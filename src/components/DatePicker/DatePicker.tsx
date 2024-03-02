"use client";
import {
  createContext,
  forwardRef, useContext, useImperativeHandle, useRef, useState
} from "react";
import { DateExtend, iExtendedDate } from "./common/DateExtend";
import { isDateDisabled } from "./common/isDateDisabled";
import { DatePickerInput } from "./components/DatePickerInput/DatePickerInput";
import { Calendar } from "./components/Calendar/Calendar";
import { useOnClickOutside } from "./hooks/useOnClickOutside";
import { iContent, iDatePicker, iDatePickerExpose } from "./interfaces";
import "./DatePicker.scss";

const noop = () => { };

const Context = createContext<iContent>({
  changeDate: noop,
  fillInput: false,
  getTime: noop,
  inputProps: {},
  label: "",
  minmax: {},
  position: "left",
  startWeekWith: "Mon",
  time: 0,
  type: "date",
  date: new Date() as iExtendedDate,
  setShow: noop,
  show: false,
  activeDay: 0,
  setActiveDay: noop,
  setValue: noop,
  value: "",
  inputText: () => "",
});

export const DatePicker = forwardRef<iDatePickerExpose, iDatePicker>(function ({
  startWeekWith = "Mon",
  type = "date",
  position = "left",
  fillInput = false,
  minmax,
  getTime,
  className = "",
  ...props }
  , ref) {
  const [date, setDate] = useState<iExtendedDate>(Object.assign(new Date(), DateExtend.prototype));
  const [show, setShow] = useState(false);
  const [activeDay, setActiveDay] = useState(date.getDate())
  const [value, setValue] = useState(fillInput ? inputText() : "");
  const dateDicker = useRef<HTMLDivElement | null>(null);
  useOnClickOutside(dateDicker, () => show && setShow(false));

  const changeDate = (timeStamp: number) => {
    const date = Object.assign(new Date(timeStamp), DateExtend.prototype);
    setActiveDay(date.getDate());
    const disabled = isDateDisabled(minmax, date);
    getTime?.(disabled ? 0 : +date);
    setDate(date);
  };

  function inputText() {
    return `${date.inputDate()}${type === "date/time" ? `, ${date.time()}` : ""}`;
  }

  useImperativeHandle(ref, () => ({
    date,
    onClose: () => setShow(false),
    timeStamp: +date,
    disabled: isDateDisabled(minmax, date),
    changeDate
  }));

  return (
    <Context.Provider value={{
      date, show, activeDay, setActiveDay, setShow, changeDate, value, setValue, inputText,
      minmax, startWeekWith, type, fillInput, position, ...props
    }}>
      <div className={`DatePicker ${className}`} ref={dateDicker}>
        <DatePickerInput />
        <Calendar />
      </div>
    </Context.Provider>
  );
});

export const useDatePicker = () => useContext(Context);

DatePicker.displayName = "DatePicker";