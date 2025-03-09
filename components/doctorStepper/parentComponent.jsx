"use client";
import React, { useEffect, useState } from "react";
import { defineStepper } from "@stepperize/react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import StepOne from "@/components/doctorStepper/stepOne";
import StepTwo from "@/components/doctorStepper/stepTwo";
import StepThree from "@/components/doctorStepper/stepThree";
import { UserRound, GraduationCap, CheckCircle } from "lucide-react";

const headerImages = [
  "/StepperImages/image1.png", // Placeholder for first step - Details
  "/StepperImages/image2.png", // Placeholder for second step - Education  
  "/StepperImages/image3.png"  // Placeholder for third step - Complete
];

const { useStepper, steps, utils } = defineStepper(
  {
    id: "Details",
    title: "Details",
    description: "Enter your Details",
  },
  {
    id: "Education",
    title: "Education",
    description: "Enter your Education details",
  },
  { id: "complete", title: "Complete", description: "Checkout complete" }
);

export default function ParentComponent({userId}) {
  const stepper = useStepper();
  const currentIndex = utils.getIndex(stepper.current.id);

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="space-y-0 border bg-card rounded-lg overflow-hidden w-full max-w-2xl">
        {/* Full-width header image that changes based on current step */}
        <div className="w-full h-48 relative">
          <img 
            src={headerImages[currentIndex]} 
            alt={`Step ${currentIndex + 1} header`}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-4 right-4 bg-stone-600 bg-opacity-80 px-3 py-1 rounded-full text-sm font-medium">
            Step {currentIndex + 1} of {steps.length}
          </div>
        </div>
        
        <div className="space-y-6 p-6">
          {stepper.switch({
            Details: () => <StepOne stepper={stepper} currentIndex={currentIndex} userId={userId}/>,
            Education: () => <StepTwo stepper={stepper} currentIndex={currentIndex}/>,
            complete: () => <StepThree />,
          })}
        </div>
      </div>
    </div>
  );
}