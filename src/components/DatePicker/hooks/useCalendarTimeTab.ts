import { ChangeEvent, useState, FocusEvent, MouseEvent, useRef } from "react";
import { dateFormatter } from "../common/formatters";
import { iExtendedDate } from "../common/DateExtend";

type tName = "hours" | "minutes";
interface iUseCalendarTimeTab {
  date: iExtendedDate; 
  changeDate: (v: number) => void;
}

const validations = {
  hours: (x: string) => +x > 12 ? MAX_HOURS : x,
  minutes: (x: string) => +x > 59 ? MAX_MINUTES : x,
};

const MAX_MINUTES = "59";
const MAX_HOURS = "12";
const ZERO = "0";
const MAX_INPUT_LENGTH = 2;
const HOURS_12 = 43200000;

export const FORMATS = ["AM", "PM"];

export const useCalendarTimeTab = ({ changeDate, date }: iUseCalendarTimeTab) => {
  const [timeFormat, setTimeFormat] = useState(dateFormatter.format(date));
  const [time, setTime] = useState<Record<tName, string>>({
    hours: dateFormatter.hours12(date),
    minutes: dateFormatter.minutes12(date)
  });

  const keys = useRef(Object.keys(time));

  const filterValue = (value: string) => value.replace(/\D/g, "");

  const validateTimeValue = (name: tName, value = "") => {
    const validator = validations[name];
    return validator(value);
  };

  const changeTime = (name: tName, value: string) => {
    const clone = structuredClone(date);
    let time;

    if (name === "hours") {
      if (timeFormat === "PM") {
        const pmHour = +value + 12;
        const hour = pmHour === 24 ? 12 : pmHour;
        time = clone.setHours(hour);
      } else {
        const hour = +value === 12 ? 0 : +value;
        time = clone.setHours(hour, !hour ? 0 : clone.getMinutes());
      }
    } else {
      time = clone.setMinutes(+value);
    }
    changeDate(time);
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name as tName;
    if (e.target.value.length > MAX_INPUT_LENGTH || !keys.current.includes(name)) return;
    setTime(pv => ({ ...pv, [name]: validateTimeValue(name, filterValue(e.target.value)) }));
  };

  const onBlur = (e: FocusEvent<HTMLInputElement>) => {
    const name = e.target.name as tName;
    if (!keys.current.includes(name)) return;
    if (e.target.value.length < MAX_INPUT_LENGTH) e.target.value = e.target.value.padStart(2, ZERO);
    if (!+e.target.value && name === "hours") e.target.value = "01";
    setTime(pv => {
      return {
        ...pv,
        [name]: e.target.value,
        ...(+e.target.value === 12 && name === "hours" ? { minutes: "00" } : {})
      }
    });
    changeTime(name, e.target.value);
  };

  const onClick = (e: MouseEvent<HTMLButtonElement>) => {
    const current = (e.target as HTMLButtonElement).name;
    if (current === timeFormat || !FORMATS.includes(current)) return;

    setTimeFormat(current);

    const local = +structuredClone(date);
    const newTime = current === "AM" ? local - HOURS_12 : local + HOURS_12;
    changeDate(newTime);
    setTime(pv => ({ ...pv, hours: dateFormatter.hours12(new Date(newTime)) }))
  };

  return {
    ...time,
    timeFormat,
    onChange,
    onBlur,
    onClick,
  };
};