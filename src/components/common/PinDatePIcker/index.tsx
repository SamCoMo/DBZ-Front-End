import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface DateTimePickerProps {
  setSelectedDateTime: (date: Date | null) => void;
}

const DateTimePicker: React.FC<DateTimePickerProps> = ({ setSelectedDateTime }) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
    setSelectedDateTime(date); // 선택한 날짜를 부모 컴포넌트로 전달
  };

  return (
    <div>
      <h2>Select Date and Time</h2>
      <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        showTimeSelect
        timeFormat="HH:mm"
        timeIntervals={15}
        timeCaption="Time"
        dateFormat="MMMM d, yyyy h:mm aa"
        placeholderText="Select date and time"
      />
    </div>
  );
};

export default DateTimePicker;