"use client";
import React from "react";
import { defineStepper } from "@stepperize/react";
import { motion, AnimatePresence } from "framer-motion";
import StepOne from "@/components/doctorStepper/stepOne";
import StepTwo from "@/components/doctorStepper/stepTwo";
import StepThree from "@/components/doctorStepper/stepThree";
import StepFour from "./stepFour";
const headerImages = [
  "/StepperImages/image1.png",
  "/StepperImages/image2.png",
  "/StepperImages/image3.png",
  "/StepperImages/image3.png",
];

const { useStepper, steps, utils } = defineStepper(
  { id: "Details", title: "Details", description: "Enter your details" },
  { id: "Education", title: "Education", description: "Enter your education details" },
  { id: "JobDetails", title: "Job Details", description: "Details about your job" },
  { id: "Languages", title: "Languages", description: "Select languages that you know" }
);

export default function ParentComponent({ userId }) {
  const stepper = useStepper();
  const currentIndex = utils.getIndex(stepper.current.id);

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="space-y-0 border bg-card rounded-lg overflow-hidden w-[400px] max-w-2xl">
        
        {/* Static height wrapper to prevent reflow issues */}
        <div className="relative w-full h-48 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.img
              key={headerImages[currentIndex]} // Keeps animation tied to the current step
              src={headerImages[currentIndex]}
              alt={`Step ${currentIndex + 1} header`}
              className="absolute top-0 left-0 w-full h-full object-cover"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            />
          </AnimatePresence>
          <div className="absolute bottom-4 right-4 bg-stone-600 bg-opacity-80 px-3 py-1 rounded-full text-sm font-medium">
            Step {currentIndex + 1} of {steps.length}
          </div>
        </div>

        {/* Content transition */}
        <div className="space-y-6 p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={stepper.current.id}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4 }}
            >
              {stepper.switch({
                Details: () => <StepOne stepper={stepper} currentIndex={currentIndex} userId={userId} />,
                Education: () => <StepTwo stepper={stepper} currentIndex={currentIndex} />,
                JobDetails: () => <StepThree stepper={stepper} currentIndex={currentIndex}/>,
                Languages: () => <StepFour stepper={stepper} currentIndex={currentIndex}/>,
              })}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
