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

const StepThree = ({ stepper, currentIndex }) => {
  const [defaultValues, setDefaultValues] = useState({
    companyName: "",
    companyWebsite: "",
    workDescription: "",
    primaryWorkplace: false,
    startWorking: "",
    userId: "",
  });
  const router = useRouter();
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 1949 }, (_, i) => 1950 + i);

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
    const req = await CreateNewDoctorCompany(data);
    if (req.success) {
      router.push("/auth/doctor/dashboard");
    }
  };

  return (
    <form onSubmit={handleSubmit(submit)}>
      <div className="flex flex-col gap-1">
        <div className="flex flex-row gap-1">
          <div className="w-full">
            <Input
              id="companyName"
              {...register("companyName")}
              placeholder="Company Name"
            />

            <div className="h-5">
              {errors.companyName && (
                <p className="text-red-500 text-xs">
                  {errors.companyName.message}
                </p>
              )}
            </div>
          </div>
          <div className="w-full">
            <div className="relative">
              <Input
                className="peer ps-16"
                placeholder="google.com"
                type="text"
                {...register("companyWebsite")}
              />
              <span className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-sm  peer-disabled:opacity-50">
                https://
              </span>
            </div>
            <div className="h-5">
              {errors.companyWebsite && (
                <p className="text-red-500 text-xs">
                  {errors.companyWebsite.message}
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="w-full">
          <Textarea
            {...register("workDescription")}
            placeholder="Short job description"
          />
          <div className="h-5">
            {errors.workDescription && (
              <p className="text-red-500 text-xs">
                {errors.workDescription.message}
              </p>
            )}
          </div>
        </div>
        <div className="w-full">
          <Controller
            name="startWorking"
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder="Started Working" />
                </SelectTrigger>
                <SelectContent>
                  {years.map((y) => (
                    <SelectItem key={y} value={String(y)}>
                      {y}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          <div className="h-5">
            {errors.startWorking && (
              <p className="text-red-500 text-xs">
                {errors.startWorking.message}
              </p>
            )}
          </div>
          <div>
            <div className="flex flex-row items-center ml-1">
              <Controller
                name="primaryWorkplace"
                control={control}
                render={({ field: { value, onChange, ...restField } }) => (
                  <div className="items-center flex space-x-2">
                    <Checkbox
                      id="primaryWorkplace"
                      checked={value}
                      onCheckedChange={onChange}
                      {...restField}
                    />
                    <div className="grid gap-1.5 leading-none">
                      <label
                        htmlFor="primaryWorkplace"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Is primary workplace?
                      </label>
                    </div>
                  </div>
                )}
              />
            </div>
          </div>
        </div>
      </div>
      <Button type="submit" disabled={isSubmitting}>
        Complete
        {isSubmitting && <Loader2 className="animate-spin" />}
      </Button>
    </form>
  );
};

export default StepThree;
