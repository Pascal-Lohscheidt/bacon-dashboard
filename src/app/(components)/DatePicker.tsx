import React, { ChangeEvent } from 'react';

interface DatePickerProps {
  value: Date;
  onChange: (date: Date) => void;
}

const DatePicker: React.FC<DatePickerProps> = ({ value, onChange }) => {
  const handleDateChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedDate = new Date(event.target.value);
    onChange(selectedDate);
  };

  return (
    <input
      type="date"
      value={value.toISOString().split('T')[0]}
      onChange={handleDateChange}
      className="px-4 py-2 border-2 border-slate-400 bg-slate-100 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
    />
  );
};

export default DatePicker;
