import { DateTime } from 'luxon';
import React, { ChangeEvent } from 'react';

interface DatePickerProps {
  value: DateTime;
  onChange: (date: DateTime) => void;
}

// 2018-06-12T19:30
// const FORMAT = 'yyyy-LL-ddTHH:mm';

const DatePicker: React.FC<DatePickerProps> = ({ value, onChange }) => {
  const handleDateChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedDate = DateTime.fromISO(event.target.value);
    onChange(selectedDate);
  };

  console.log();
  return (
    <input
      type="datetime-local"
      value={
        value.toISO({
          suppressMilliseconds: true,
          suppressSeconds: true,
          extendedZone: false,
          includeOffset: false,
        })!
      }
      onChange={handleDateChange}
      className="px-4 py-2 border-2 border-slate-400 bg-slate-100 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
    />
  );
};

export default DatePicker;
