import { ChangeEvent, useState, FocusEvent, KeyboardEvent, useRef, useEffect } from "react";
import { iExtendedDate } from "../common/DateExtend";
import { tUseCalendarSlider } from "./useCalendarSlider";

export type tNavigationReturns = ReturnType<typeof useCalendarNavigation>;

interface iUseCalendarNavigation {
  date: iExtendedDate;
  animateSlide: tUseCalendarSlider["animateSlide"];
  changeDate: (v: number) => void;
};

const ENTER = "Enter";

export const useCalendarNavigation = ({ date, animateSlide, changeDate }: iUseCalendarNavigation) => {
  const [yearInput, setYearInput] = useState(date.longYear());
  const [showYearInput, setShowYearInput] = useState(false);
  const local = useRef(date);
 
  useEffect(() => {
    setYearInput(date.longYear())
    local.current = date;
  }, [date]);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > 4) return;
    setYearInput(e.target.value.replace(/\D/g, ""));
  };

  const onBlur = (e: FocusEvent<HTMLInputElement>) => {
    local.current.setFullYear(+e.target.value);
    changeDate(date.getTime());
    setYearInput(e.target.value);
    setShowYearInput(false);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === ENTER) (e.target as HTMLInputElement).blur();
  };

  const onNext = () => {
    const year = date.getFullYear();
    if (year >= 9999) return;
    dayValidate(local.current.days(2));
    animateSlide("right");
    updateDate(1);
  };

  const onPrev = () => {
    const year = date.getFullYear();
    if (year <= 0) return;
    dayValidate(local.current.days(0));
    animateSlide("left");
    updateDate(-1);
  };

  function dayValidate(target: number) {
    (local.current.getDate() > target) && local.current.setDate(target);
  }

  function updateDate(deltaMonth: number) {
    local.current.setMonth(local.current.getMonth() + deltaMonth);
    changeDate(+local.current);
  }

  return {
    yearInput,
    showYearInput,
    setShowYearInput,
    onChange,
    onBlur,
    onKeyDown,
    onPrev,
    onNext,
  };
};