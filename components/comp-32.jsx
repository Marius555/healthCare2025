import { Input } from "@/components/ui/input";
import { useId } from "react";

export default function InputWithLabelAnimation({ labelText, ...props }) {
  const id = useId();
  return (
    <div className="group relative">
      <label
        htmlFor={id}
        className="absolute top-1/2 -translate-y-1/2 left-4 cursor-text px-1 text-sm text-muted-foreground/70 transition-all origin-top-left 
        
        group-focus-within:left-0 group-focus-within:top-[-7px] group-focus-within:text-xs group-focus-within:font-medium group-focus-within:text-foreground group-focus-within:pointer-events-none group-focus-within:cursor-default
        
        has-[+input:not(:placeholder-shown)]:left-0 has-[+input:not(:placeholder-shown)]:top-[-7px] has-[+input:not(:placeholder-shown)]:text-xs has-[+input:not(:placeholder-shown)]:font-medium has-[+input:not(:placeholder-shown)]:text-foreground has-[+input:not(:placeholder-shown)]:pointer-events-none has-[+input:not(:placeholder-shown)]:cursor-default"
      >
        <span className="inline-flex bg-transparent dark:bg-inherit text-white dark:text-white">
          {labelText}
        </span>
      </label>
      <Input id={id} placeholder=" " {...props} />
    </div>
  );
}