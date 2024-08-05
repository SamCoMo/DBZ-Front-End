import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from 'date-fns';

interface DateTimePickerProps {
  setSelectedDateTime: (dateTimeString: string) => void; // 날짜 선택 상태 업데이트 함수의 타입을 string으로 변경
}

const PinDatePicker: React.FC<DateTimePickerProps> = ({ setSelectedDateTime }) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
    if (date) {
      // 선택된 날짜를 "YYYY-MM-DDTHH:mm:ss" 포맷으로 변환
      const formattedDate = format(date, "yyyy-MM-dd'T'HH:mm:ss");
      setSelectedDateTime(formattedDate);
    } else {
      setSelectedDateTime(''); // 날짜 선택이 취소되었을 때
    }
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
        timeCaption="time"
        dateFormat="MMMM d, yyyy h:mm aa"
        placeholderText="Select date and time"
      />
    </div>
  );
};

export default PinDatePicker;
