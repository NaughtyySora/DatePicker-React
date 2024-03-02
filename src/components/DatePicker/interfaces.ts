import { ComponentProps, Dispatch, ReactNode, SetStateAction } from "react";
import { iExtendedDate } from "./common/DateExtend";

export interface iDatePicker {
  className?: string;
  type?: "date" | "date/time";
  time?: number;
  minmax?: { min?: number; max?: number; };
  startWeekWith?: "Sun" | "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat";
  inputProps?: ComponentProps<"input">;
  position?: "left" | "bottom";
  fillInput?: boolean;
  getTime?: (v: number) => void;
  label?: ReactNode;
};

export interface iDatePickerExpose {
  date: iExtendedDate;
  onClose: () => void;
  timeStamp: number,
  disabled: boolean;
  changeDate: (timeStamp: number) => void;
};

export interface iContent extends Omit<iDatePicker, "className"> {
  changeDate: (v: number) => void;
  date: iExtendedDate;
  setShow: (v: boolean) => void;
  show: boolean;
  activeDay: number;
  setActiveDay: Dispatch<SetStateAction<number>>;
  setValue: Dispatch<SetStateAction<string>>;
  value: string;
  inputText: () => string;
};