import { cn } from "@/lib/utils";
import { TriangleAlert } from "lucide-react";
const AnimatedError = ({ error, className }) => {
  return (
    <div
      className={cn(
        "grid overflow-hidden transition-[grid-template-rows] duration-300",
        error ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        className
      )}
    >
      <div className="min-h-0">
        <p className="text-sm text-red-500 py-2 transition-opacity duration-300 flex flex-row gap-3">
          <TriangleAlert /> {error}
        </p>
      </div>
    </div>
  );
};

export default AnimatedError;