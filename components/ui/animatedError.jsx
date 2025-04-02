import { cn } from "@/lib/utils";
import { TriangleAlert } from "lucide-react";
import { useState, useEffect } from "react";

const AnimatedError = ({ error, className }) => {
  // Store the error message to display during animation
  const [displayedError, setDisplayedError] = useState(error);
  // Track if component should be visible
  const [isVisible, setIsVisible] = useState(!!error);
  
  useEffect(() => {
    // When error appears, update immediately to start animation
    if (error) {
      setDisplayedError(error);
      setIsVisible(true);
    } 
    // When error is fixed, keep the error message during animation out
    else if (!error && isVisible) {
      // Start animation out first
      setIsVisible(false);
      
      // After animation completes, clear the error message
      const timer = setTimeout(() => {
        setDisplayedError("");
      }, 300); // Match this to your animation duration
      
      return () => clearTimeout(timer);
    }
  }, [error, isVisible]);
  
  return (
    <div
      className={cn(
        "grid overflow-hidden transition-[grid-template-rows] duration-300",
        isVisible ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        className
      )}
    >
      <div className="min-h-0">
        <p className="text-sm text-red-500 py-2 transition-opacity duration-300 flex items-center gap-2">
          <TriangleAlert className="h-4 w-4" /> 
          {displayedError}
        </p>
      </div>
    </div>
  );
};

export default AnimatedError;