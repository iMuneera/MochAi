import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function TailwindDateTimePicker({ value, onChange }) {
  return (
    <div className="w-full">
      <DatePicker
        selected={value}
        onChange={onChange}
        showTimeSelect
        timeFormat="HH:mm"
        timeIntervals={15}
        dateFormat="MMMM d, yyyy h:mm aa"
        className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-600 
                  focus:outline-none focus:ring-2 focus:ring-blue-500 
                  text-white placeholder-gray-400"
        placeholderText="Select date and time"
      />
    </div>
  );
}