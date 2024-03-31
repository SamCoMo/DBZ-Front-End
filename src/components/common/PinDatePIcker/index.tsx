import DatePicker from "react-datepicker";
import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";


const PinDatePicker =() => {
    const [startDate, setStartDate] = useState(setHours(setMinutes(new Date(), 30), 16));
  function setMinutes(arg0: Date, arg1: number): any {
    throw new Error("Function not implemented.");
  }

    return (
      <DatePicker
      selected={startDate}
      onChange={(date) => setStartDate(date)}
      showTimeSelect
      excludeTimes={[
        setHours(setMinutes(new Date(), 0), 17),
        setHours(setMinutes(new Date(), 30), 18),
        setHours(setMinutes(new Date(), 30), 19),
        setHours(setMinutes(new Date(), 30), 17),
      ]}
      dateFormat="MMMM d, yyyy h:mm aa"
    />
    );
    };
export default PinDatePicker;

function setHours(arg0: any, arg1: number): any {
  throw new Error("Function not implemented.");
}
