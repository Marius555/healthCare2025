"use client";
import React from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import CalendarDropdownButton from "../ui/datePickerComponent";
import { PhoneInput } from "../PhoneInputField";
import NationalitySelect from "./nationality/NationalitySelect";
import { useFormContext, Controller } from "react-hook-form";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { stepTwoSchema } from "@/resolvers/doctorStepper/StepTwo";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";
import CreateNewDoctorEducationServer from "@/appwriteUtils/createDoctorEducationServer";




const StepTwo = ({ stepper, currentIndex }) => {
  const universitys = [
    { name: "Generolo Jono Žemaičio Lietuvos karo akademija" },
    { name: "Lietuvos sveikatos mokslų universitetas" },
    { name: "Kauno technologijos universitetas" },
    { name: "Klaipėdos universitetas" },
    { name: "Lietuvos muzikos ir teatro akademija" },
    { name: "Mykolo Romerio universitetas" },
    { name: "Vilniaus dailės akademija" },
    { name: "Vilniaus Gedimino technikos universitetas" },
    { name: "Vilniaus universitetas" },
    { name: "Vytauto Didžiojo universitetas" },
    { name: "Lietuvos sporto universitetas" },
    { name: "Alytaus kolegija" },
    { name: "Kauno kolegija" },
    { name: "Kauno miškų ir aplinkos inžinerijos kolegija" },
    { name: "Kauno technikos kolegija" },
    { name: "Klaipėdos valstybinė kolegija" },
    { name: "Lietuvos aukštoji jūreivystės mokykla" },
    { name: "Marijampolės kolegija" },
    { name: "Panevėžio kolegija" },
    { name: "Šiaulių valstybinė kolegija" },
    { name: "Šiaulių universitetas" },
    { name: "Utenos kolegija" },
    { name: "Vilniaus kolegija" },
    { name: "Vilniaus technologijų ir dizaino kolegija" },
    { name: "ISM Vadybos ir ekonomikos universitetas" },
    { name: "LCC tarptautinis universitetas" },
    { name: "Kazimiero Simonavičiaus universitetas" },
    { name: "Telšių Vyskupo Vincento Borisevičiaus kunigų seminarija" },
    { name: "Europos Humanitarinis Universitetas" },
    { name: "Vilniaus Šv. Juozapo kunigų seminarija" },
    { name: "V. A. Graičiūno aukštoji vadybos mokykla" },
    { name: "Socialinių mokslų kolegija" },
    { name: "Klaipėdos verslo kolegija" },
    { name: "Kolpingo kolegija" },
    { name: "Šiaurės Lietuvos kolegija" },
    { name: "Šv. Ignaco Lojolos kolegija" },
    { name: "Tarptautinė teisės ir verslo aukštoji mokykla" },
    { name: "Vakarų Lietuvos verslo kolegija" },
    { name: "Vilniaus verslo kolegija" },
    { name: "Vilniaus dizaino kolegija" },
    { name: "Vilniaus kooperacijos kolegija" },
  ];
  const Specializations = [
    { name: "Abdominalinės chirurgijos gydytojas" },
    { name: "Akušeris" },
    { name: "Anestezijos ir intensyviosios terapijos slaugytojas" },
    { name: "Anesteziologas reanimatologas" },
    { name: "Bendrosios praktikos slaugytojas" },
    { name: "Burnos chirurgas" },
    { name: "Burnos higienistas" },
    { name: "Endobiogenikas" },
    { name: "Endodontologas" },
    { name: "Ergoterapeutas" },
    { name: "Fizinės medicinos ir reabilitacijos gydytojas" },
    { name: "Grožio terapeutė" },
    { name: "Gydytojas akušeris-ginekologas" },
    { name: "Gydytojas alergologas ir klinikinis imunologas" },
    { name: "Gydytojas anesteziologas reanimatologas" },
    { name: "Gydytojas anesteziologas-reanimatologas vyr. ordinatorius" },
    { name: "Gydytojas chirurgas" },
    { name: "Gydytojas dermatovenerologas" },
    { name: "Gydytojas Dietologas" },
    { name: "Gydytojas echoskopuotojas" },
    { name: "Gydytojas endokrinologas" },
    { name: "Gydytojas endoskopuotojas" },
    { name: "Gydytojas gastroenterologas" },
    { name: "Gydytojas genetikas" },
    { name: "Gydytojas hematologas" },
    { name: "Gydytojas kardiologas" },
    { name: "Gydytojas kraujagyslių chirurgas" },
    { name: "Gydytojas nefrologas" },
    { name: "Gydytojas neurochirurgas" },
    { name: "Gydytojas neurologas" },
    { name: "Gydytojas odontologas" },
    { name: "Gydytojas odontologas implantologas" },
    { name: "Gydytojas oftalmologas" },
    { name: "Gydytojas onkologas chemoterapeutas" },
    { name: "Gydytojas ortodontas" },
    { name: "Gydytojas ortopedas traumatologas" },
    { name: "Gydytojas otorinolaringologas" },
    { name: "Gydytojas psichiatras" },
    { name: "Gydytojas pulmonologas" },
    { name: "Gydytojas radiologas" },
    { name: "Gydytojas radiologas-echoskopuotojas" },
    { name: "Gydytojas reumatologas" },
    { name: "Gydytojas širdies chirurgas" },
    { name: "Gydytojas urologas" },
    { name: "Gydytojas vaikų alergologas" },
    { name: "Gydytojas vaikų chirurgas" },
    { name: "Gydytojas vaikų gastroenterologas" },
    { name: "Gydytojas vaikų gastroenterologas-echoskopuotojas" },
    { name: "Gydytojas vaikų hematologas" },
    { name: "Gydytojas vaikų neurologas" },
    { name: "Gydytojas vaikų odontologas" },
    { name: "Gydytojas vaikų pulmonologas" },
    { name: "Gydytojas veido ir žandikaulių chirurgas" },
    { name: "Gydytojo odontologo padėjėjas" },
    { name: "Infekcinių ligų gydytojas" },
    { name: "Intervencinės kardiologijos gydytojas" },
    { name: "Kineziterapeutas" },
    { name: "Koloproktologas" },
    { name: "Kosmetologas" },
    { name: "Krūtų onkochirurgijos gydytojas" },
    { name: "Mamologas" },
    { name: "Masažuotojas" },
    { name: "Medicinos gydytojas" },
    { name: "Medicinos psichologas" },
    { name: "Odontologas ortopedas" },
    { name: "Periodontologas" },
    { name: "Plastinės ir rekonstrukcinės chirurgijos gydytojas" },
    { name: "Radiologas (RO)" },
    { name: "Radiologijos technologas" },
    { name: "Šeimos gydytojas" },
    { name: "Sporto medicinos gydytojas" },
    { name: "Vaikų kardiologas" },
    { name: "Vaikų ligų gydytojas" },
    { name: "Vaikų ortopedas traumatologas" },
    { name: "Vidaus ligų gydytojas" },
  ];
  const DegreeLevels = [
    { name: "Vidurinis" },
    { name: "Profesinis" },
    { name: "Aukštesnysis" },
    { name: "Aukštasis" },
    { name: "Magistras" },
    { name: "Daktaras" },
    { name: "Kita" },
  ];
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 1949 }, (_, i) => 1950 + i);

  const defaultValues = { 
    university: "", 
    studiesBegin: "",
    studiesEnd: "",
    specialization: "",
    degree: "",
    licenseNumber: "",
    userId: "",
  }

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({resolver: yupResolver(stepTwoSchema), defaultValues: defaultValues});

  useEffect(() => {
      if (typeof window !== "undefined") {
        const storage = sessionStorage.getItem("doctorCollId");
        if (storage) {
          const parsedUser = JSON.parse(storage);
          setValue("userId", parsedUser);
        }
      }
    }, [setValue]);


  const submit = async(data) => {
    const resp = await CreateNewDoctorEducationServer(data)
    if(resp.success){
      console.log(resp.message)
      stepper.next()
    }
  }


  return (
    <form onSubmit={handleSubmit(submit)}>
      <div className="flex flex-col gap-1 ">
        <div className="grid w-full items-center gap-1.5">
          <Controller
            name="university"
            control={control}
            render={({ field }) => (
              <Select
                value={field.value}
                onValueChange={field.onChange}
                {...field}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select University You Graduated" />
                </SelectTrigger>
                <SelectContent side="bottom" align="start" className="h-80">
                  {universitys.map((university) => (
                    <SelectItem
                      key={university.name}
                      value={university.name.toLowerCase()}
                    >
                      {university.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          <div className="h-5">
            {errors.university && (
              <p className="text-red-500 text-sm">
                {errors.university.message}
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-row items-center gap-1.5">
          <div className="w-full">
            <Controller
              name="studiesBegin"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Studies begin" />
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
              {errors.studiesBegin && (
                <p className="text-red-500 text-sm">
                  {errors.studiesBegin.message}
                </p>
              )}
            </div>
          </div>
          <div className="w-full">
            <Controller
              name="studiesEnd"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Graduation" />
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
              {errors.studiesEnd && (
                <p className="text-red-500 text-sm">
                  {errors.studiesEnd.message}
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="w-full ">
          <Controller
            name="specialization"
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder="specialization" />
                </SelectTrigger>
                <SelectContent>
                  {Specializations.map((y) => (
                    <SelectItem key={y.name} value={String(y.name)}>
                      {y.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          <div className="h-5">
            {errors.specialization && (
              <p className="text-red-500 text-sm">
                {errors.specialization.message}
              </p>
            )}
          </div>
        </div>
        <div className="flex flex-row items-center justify-center gap-1.5">
          <div className="w-full">
            <div className="w-full ">
              <Controller
                name="degree"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Degree" />
                    </SelectTrigger>
                    <SelectContent>
                      {DegreeLevels.map((y) => (
                        <SelectItem key={y.name} value={String(y.name)}>
                          {y.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              <div className="h-5">
                {errors.degree && (
                  <p className="text-red-500 text-sm">
                    {errors.degree.message}
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className="w-full max-w-sm items-center gap-1.5">
            <Input
              {...register("licenseNumber")}
              type="licenseNumber"
              id="licenseNumber"
              placeholder="Your License Number"
            />
            <div className="h-5">
              {errors.licenseNumber && (
                <p className="text-red-500 text-sm">
                  {errors.licenseNumber.message}
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="space-y-4">
          {!stepper.isLast ? (
            <div className="flex justify-end gap-4">
            
              <Button type="submit" className="w-full" disabled={isSubmitting}>
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

export default StepTwo;
