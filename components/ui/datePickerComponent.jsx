"use client"

import * as React from "react"
import { Calendar } from "./calendar"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export default function CalendarDropdownButton({value, onChange, label, ...props}) {
  const [selectedDate, setSelectedDate] = React.useState(value)
  const [open, setOpen] = React.useState(false)
  const [defaultMonth, setDefaultMonth] = React.useState(value || new Date())
  
  const handleSelect = (newDate) => {
    setSelectedDate(newDate)
    setDefaultMonth(newDate)
    onChange?.(newDate)
    setOpen(false)
  }

  const handleOpenChange = (isOpen) => {
    setOpen(isOpen)
    // When opening, set the default month to the selected date if it exists
    if (isOpen && selectedDate) {
      setDefaultMonth(selectedDate)
    }
  }

  const buttonText = selectedDate 
    ? format(selectedDate, "PPP")
    : label || format(new Date(), "PPP")

  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[280px] justify-start text-left font-normal bg-transparent hover:bg-transparent"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {buttonText}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={handleSelect}
          defaultMonth={defaultMonth}
          initialFocus
          showOutsideDays={true}
          captionLayout="dropdown-buttons"
          fromYear={1900} 
          toYear={2025}
          className="rounded-md border"
        />
      </PopoverContent>
    </Popover>
  )
}