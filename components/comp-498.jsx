"use client";

import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function CustomDatePicker() {
  const [date, setDate] = useState(new Date());

  const handleYearChange = (value, onChange) => {
    const newDate = new Date(date);
    newDate.setFullYear(Number(value)); // Update the year
    setDate(newDate);
    onChange(newDate); // Call the original calendar onChange
  };

  return (
    <div>
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-lg border border-border p-2"
        captionLayout="dropdown" // Use dropdown layout
        defaultMonth={new Date()}
        startMonth={new Date(1980, 0)}
        components={{
          DropdownNav: (props) => (
            <div className="flex w-full items-center justify-center gap-3 [&>span]:text-sm [&>span]:font-medium">
              {props.children}
            </div>
          ),
          Dropdown: ({ value, options, onChange }) => (
            <Select
              value={String(value)}
              onValueChange={(selectedValue) => handleYearChange(selectedValue, onChange)}
            >
              <SelectTrigger className="h-8 w-24 font-medium text-sm">
                <SelectValue placeholder="Year" />
              </SelectTrigger>
              <SelectContent className="max-h-52">
                {options.map((option) => (
                  <SelectItem
                    key={option.value}
                    value={String(option.value)}
                    disabled={option.disabled}
                  >
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          ),
        }}
      />
      <p
        className="mt-4 text-center text-xs text-muted-foreground"
        role="region"
        aria-live="polite"
      >
        Yearly select + nav -{" "}
        <a
          className="underline hover:text-foreground"
          href="https://daypicker.dev/"
          target="_blank"
          rel="noopener nofollow"
        >
          React DayPicker
        </a>
      </p>
    </div>
  );
}
