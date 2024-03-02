import { FC, FormEvent, useRef } from "react";
import { DatePicker } from "./components/DatePicker/DatePicker";
import { iDatePickerExpose } from "./components/DatePicker/interfaces";

export const App: FC = () => {
  const dateRef = useRef<null | iDatePickerExpose>(null);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.target as HTMLFormElement);

    console.log("FormData:", Object.fromEntries(data));

    console.log("ImperativeHandler Ref", {
      date: dateRef.current?.date + "",
      timeStamp: dateRef.current?.timeStamp,
      disabled: dateRef.current?.disabled,
      onClose: dateRef.current?.onClose,
      changeDate: dateRef.current?.changeDate
    });

  };

  return (
    <div className="App">
      <form id="form" onSubmit={onSubmit} className="App-form">
        <DatePicker
          label="Date / Time: "
          type="date/time"
          ref={dateRef}
          inputProps={{ name: "date" }}
        />

        <DatePicker
          label="Date + Min / Max: "
          time={Date.now()}
          fillInput
          minmax={{ max: new Date().getTime() + 1111111111, min: new Date().getTime() - 1111111111 }}
          inputProps={{ name: "date/time" }}
          position="bottom"
          getTime={(t) => console.log(t)}
        />
      </form>

      <button className="App-btn" form="form">Submit</button>
    </div>
  );
};