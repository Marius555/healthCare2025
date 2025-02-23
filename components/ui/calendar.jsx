import * as React from "react"
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react"
import { DayPicker } from "react-day-picker"
import { cn } from "@/lib/utils"
import { buttonVariants } from "./button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./select"

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  value,
  onChange,
  onClose,  // Add onClose prop
  ...props
}) {
  const isFutureDate = (date) => {
    const today = new Date();
    return date > today;
  };

  const handleDateSelect = (date) => {
    if (onChange) {
      onChange(date);
    }
    if (onClose) {
      onClose();
    }
  };

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      value={value}
      onDayClick={handleDateSelect}
      components={{
        Dropdown: ({ value, onChange, children, ...props }) => {
          const options = React.Children.toArray(children)
          const selected = options.find((child) => child.props.value === value)
          const handleChange = (newValue) => {
            const changeEvent = {
              target: { value: newValue }
            }
            onChange?.(changeEvent)
          }
          
          const isMonth = options.some(option => isNaN(option.props.value))
          
          return (
            <Select defaultValue={value} onValueChange={handleChange}>
              <SelectTrigger className={cn(
                "h-8",
                isMonth ? "w-[120px]" : "w-[100px]"
              )}>
                <SelectValue>
                  {selected?.props?.children || value}
                </SelectValue>
              </SelectTrigger>
              <SelectContent 
                position="popper" 
                className={cn(
                  isMonth ? "min-w-[120px]" : "min-w-[100px]"
                )}
              >
                {options.map((option) => (
                  <SelectItem
                    key={option.props.value}
                    value={option.props.value}
                  >
                    {option.props.children}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )
        }
      }}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "hidden",
        caption_dropdowns: "flex items-center justify-center gap-2 px-10",
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 bg-transparent p-0 text-muted-foreground"
        ),
        nav_button_previous: 'absolute left-1',
        nav_button_next: 'absolute right-1',
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell: "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
        row: "flex w-full mt-2",
        cell: cn(
          "relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent",
          props.mode === "range"
            ? "[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md"
            : "[&:has([aria-selected])]:rounded-md"
        ),
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-9 w-9 p-0 font-normal aria-selected:opacity-100"
        ),
        day_selected:
          "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
        day_today: "bg-accent text-accent-foreground",
        day_outside: "text-muted-foreground opacity-50",
        day_disabled: "text-muted-foreground opacity-50",
        day_range_middle: "aria-selected:bg-accent aria-selected:text-accent-foreground",
        day_hidden: "invisible",
      }}
      disabled={isFutureDate}
      {...props}
    />
  )
}

Calendar.displayName = "Calendar"

export { Calendar }