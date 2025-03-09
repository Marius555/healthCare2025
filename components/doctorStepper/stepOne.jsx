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

// Function to generate random string
const generateRandomString = (length = 25) => {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

const StepOne = ({ stepper, currentIndex, userId }) => {
  
  const [previewUrl, setPreviewUrl] = useState("https://github.com/shadcn.png");



  const [defaultValues, setDefaultValues] = useState({
    name: "",
    lastName: "",
    phoneNumber: "",
    nationality: "",
    birthDay: "",
    picture: null,
    type: "doctor",
    pictureName: [], // Changed to array
    userId: userId.id,
  });

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: defaultValues,
    resolver: yupResolver(stepOneSchema),
    
  });



  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const extension = file.name.split(".").pop();
      const randomFileName = `${generateRandomString()}.${extension}`;
      const renamedFile = new File([file], randomFileName, { type: file.type });
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      setValue("picture", renamedFile);
      setValue("pictureName", [randomFileName]);
    }
  };

  const submit = async (data) => {
    try {
      const pictureData = data.picture;
      const submissionData = {
        ...data,
        pictureName: Array.isArray(data.pictureName)
          ? data.pictureName
          : [data.pictureName],
      };

      const resp = await CreateNewDoctor(submissionData);
      if (resp.success) {
        createProfilePicture(pictureData);
        sessionStorage.setItem("doctorCollId", JSON.stringify(resp.data.$id));
        stepper.next();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(submit)}>
      <div className="flex flex-col gap-1">
        <div className="flex flex-row items-center gap-4">
          <div>
            <Avatar className="w-20 h-20">
              <AvatarImage src={previewUrl} className="object-cover"/>
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
          <div className="w-full">
            <Input
              className="p-0 pe-3 file:me-3 file:border-0 file:border-e"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>
        </div>
        <div className="h-5">
          {errors.picture && (
            <p className="text-red-500 text-xs">{errors.picture.message}</p>
          )}
        </div>

        <div className="flex flex-row gap-3 items-center">
          <div className="grid w-full items-center gap-1.5">
            <InputWithLableAnimation
              labelText="Name"
              {...register("name")}
              type="Name"
            />
            <div className="h-5">
              {errors.name && (
                <p className="text-red-500 text-xs">{errors.name.message}</p>
              )}
            </div>
          </div>
          <div className="grid w-full items-center gap-1.5">
            <InputWithLableAnimation
              labelText="Last Name"
              {...register("lastName")}
              type="lastName"
            />
            <div className="h-5">
              {errors.lastName && (
                <p className="text-red-500 text-xs">
                  {errors.lastName.message}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="grid w-full items-center gap-1.5">
          <Controller
            name="phoneNumber"
            control={control}
            render={({ field }) => (
              <PhoneInput {...field} placeholder="Enter a phone number" />
            )}
          />
          <div className="h-5">
            {errors.phoneNumber && (
              <p className="text-red-500 text-xs">
                {errors.phoneNumber.message}
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-row items-center gap-3">
          <div className="grid w-full items-center gap-1.5">
            <Controller
              name="nationality"
              control={control}
              render={({ field }) => <NationalitySelect {...field} />}
            />
            <div className="h-5">
              {errors.nationality && (
                <p className="text-red-500 text-xs">
                  {errors.nationality.message}
                </p>
              )}
            </div>
          </div>

          <div className="grid w-auto items-center gap-1.5">
            <Controller
              name="birthDay"
              control={control}
              render={({ field }) => (
                <CalendarDropdownButton
                  {...field}
                  label="Enter Your Birthday"
                />
              )}
            />
            <div className="h-5">
              {errors.birthDay && (
                <p className="text-red-500 text-xs">
                  {errors.birthDay.message}
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="h-5">
              {errors && (
                <p className="text-red-500 text-xs">
                  {errors.message}
                </p>
              )}
            </div>

      

        <div className="space-y-4">
          {!stepper.isLast ? (
            <div className="flex justify-end gap-4">
              <Button
                variant="secondary"
                onClick={stepper.prev}
                disabled={stepper.isFirst}
              >
                Back
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {stepper.isLast ? "Complete" : "Next"}
                {isSubmitting && <Loader2 className="animate-spin" />}
              </Button>
            </div>
          ) : (
            <Button onClick={stepper.reset}>Reset</Button>
          )}
        </div>
      </div>
    </form>
  );
};

export default StepOne;
