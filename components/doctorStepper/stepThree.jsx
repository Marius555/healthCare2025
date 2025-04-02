"use client";
import React, { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import CalendarDropdownButton from "../ui/datePickerComponent";
import { PhoneInput } from "../PhoneInputField";
import NationalitySelect from "./nationality/NationalitySelect";
import { Controller } from "react-hook-form";
import { Button } from "../ui/button";
import InputWithLableAnimation from "../comp-32";
import { useForm } from "react-hook-form";
import { stepOneSchema } from "@/resolvers/doctorStepper/StepOne";
import { yupResolver } from "@hookform/resolvers/yup";
import FileInput from "../FileInput";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CreateNewDoctor } from "@/appWrite";
import { useEffect } from "react";
import { createProfilePicture } from "@/appWrite";
import { Loader2 } from "lucide-react";
import { Textarea } from "../ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { stepThreeSchema } from "@/resolvers/doctorStepper/StepThree";
import { CreateNewDoctorCompany } from "@/appWrite";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useRouter } from "next/navigation";
import CountrySelect from "./country/countrySelect";
import AnimatedError from "../ui/animatedError";
import { cn } from "@/lib/utils";

const ExperienceRadioGroup = ({ value, onChange, error }) => {
  const options = [
    { value: "<1 year", label: "< 1 year" },
    { value: "<5 years", label: "< 5 years" },
    { value: "<10 years", label: "< 10 years" },
    { value: "<20 years", label: "< 20 years" },
    { value: ">20 years", label: "> 20 years" },
  ];

  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium">Experience</Label>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <div
            key={option.value}
            className={cn(
              "cursor-pointer inline-flex items-center rounded-md border border-input px-3 py-1.5 text-sm font-medium transition-colors",
              "hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
              value === option.value
                ? "bg-primary/10 text-primary border-primary"
                : "bg-transparent"
            )}
            onClick={() => onChange(option.value)}
          >
            {option.label}
          </div>
        ))}
      </div>
      <AnimatedError error={error} />
    </div>
  );
};

const StepThree = ({ stepper, currentIndex }) => {
  const [defaultValues, setDefaultValues] = useState({
    country: "",
    workDescription: "",
    experience: undefined,
    multipleJobs: false,
    userId: "",
  });
  const router = useRouter();

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: defaultValues,
    resolver: yupResolver(stepThreeSchema),
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storage = sessionStorage.getItem("doctorCollId");
      if (storage) {
        const parsedUser = JSON.parse(storage);
        setValue("userId", parsedUser);
      }
    }
  }, [setValue]);

  const submit = async (data) => {
    console.log(data);
    const req = await CreateNewDoctorCompany(data);
    if (req.success) {
      stepper.next();
    }
  };

  return (
    <form onSubmit={handleSubmit(submit)}>
      <div className="flex flex-col items-center gap-5">
        <div className="grid w-full items-center gap-1.5">
          <Controller
            name="country"
            control={control}
            render={({ field }) => <CountrySelect {...field} />}
          />
          <AnimatedError error={errors?.country?.message} />
        </div>

        <div className="w-full">
          <Textarea
            {...register("workDescription")}
            placeholder="Short job description"
          />
          <AnimatedError error={errors?.workDescription?.message} />
        </div>

        <div className="w-full">
          <Controller
            name="experience"
            control={control}
            render={({ field }) => (
              <ExperienceRadioGroup
                value={field.value}
                onChange={field.onChange}
                error={errors?.experience?.message}
              />
            )}
          />
        </div>

        <div className="flex flex-row ml-1 w-full">
          <Controller
            name="multipleJobs"
            control={control}
            render={({ field: { value, onChange, ...restField } }) => (
              <div className="items-center flex space-x-2">
                <Checkbox
                  id="multipleJobs"
                  checked={value}
                  onCheckedChange={onChange}
                  {...restField}
                />
                <div className="grid gap-1.5 leading-none">
                  <label
                    htmlFor="multipleJobs"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Working In Several Companys?
                  </label>
                </div>
              </div>
            )}
          />
        </div>
      </div>
      <div className="mt-5 flex">
        {!stepper.isLast ? (
          <div className="flex gap-4 w-full">
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {stepper.isLast ? "Complete" : "Next"}
              {isSubmitting && <Loader2 className="animate-spin" />}
            </Button>
          </div>
        ) : (
          <Button onClick={stepper.reset}>Reset</Button>
        )}
      </div>
    </form>
  );
};

export default StepThree;
