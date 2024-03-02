import { ChangeEvent, useRef, useEffect } from "react";
import { inputFilter, mask } from "../../common/inputMask";
import { useDatePicker } from "../../DatePicker";
import { compose } from "../../common/compose";
import { getKey } from "../../common/getKey";
import "./DatePickerInput.scss";

export const DatePickerInput = () => {
  const {date, changeDate, setShow, label, inputProps, value, setValue, inputText } = useDatePicker();

  const dateFormat = useRef(compose(inputFilter, mask, setInputValue));
  const id = useRef(getKey());
  const cursorPosition = useRef(0);
  const blockInput = useRef(true);
  const local = useRef(new Date());

  useEffect(() => {
    if (blockInput.current) return;
    setValue(inputText());
  }, [date]);

  function setInputValue(props: ReturnType<typeof mask>) {
    setValue(props.masked);
    return props;
  }

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    blockInput.current = true;
    if (e.target.value.length > 10) return;

    const { months, days, years, masked } = dateFormat.current(e.target.value);
    const month = months - 1;
    const time = local.current.setFullYear(
      years || local.current.getFullYear(),
      month > 0 ? month : 0 || local.current.getMonth(),
      days || local.current.getDate()
    );

    changeDate(time);

    const diff = masked.length - String(value).length;
    let pos = (e.target.selectionEnd || 0) + diff;

    cursorPosition.current = diff > 0 ? --pos : diff === 0 ? pos : ++pos;

    queueMicrotask(() => {
      e.target.selectionEnd = cursorPosition.current;
      e.target.selectionStart = cursorPosition.current;
    });
  };

  const onFocus = () => {
    setValue(pv => pv.replace(/,.*/, ""));
    setShow(true);
  };

  const onBlur = () => {
    setValue(inputText());
    blockInput.current = false;
  }

  return (
    <>
      {label && (
        <label
          htmlFor={inputProps?.id || id.current}
          className="DatePickerInput-label"
        >
          {label}
        </label>
      )}

      <input
        type="text"
        className="DatePickerInput"
        id={id.current}
        {...inputProps}
        autoComplete="off"
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        placeholder="Enter Date"
      />
    </>
  );
};