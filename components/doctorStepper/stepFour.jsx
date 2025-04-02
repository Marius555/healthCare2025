"use client";

import { useState } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Trash2, Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const languageOptions = ["English", "Spanish", "French", "German", "Chinese", "Japanese"];
const proficiencyOptions = ["Beginner", "Intermediate", "Advanced", "Fluent"];

export default function StepFour() {
  const { control, handleSubmit, register, formState: { errors } } = useForm({
    defaultValues: { languages: [{ name: "", proficiency: "" }] }
  });

  const { fields, append, remove } = useFieldArray({ control, name: "languages" });

  const onSubmit = (data) => console.log(data);

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-center mb-3">Language Proficiency</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-1">
          <AnimatePresence initial={false} >
            {fields.map((field, index) => (
              <motion.div 
                key={field.id}
                initial={{ 
                  height: 0, 
                  opacity: 0, 
                  y: -20 
                }}
                animate={{ 
                  height: "auto", 
                  opacity: 1, 
                  y: 0,
                  transition: {
                    height: { duration: 0.3 },
                    opacity: { duration: 0.3 },
                    y: { duration: 0.2, ease: "easeOut" }
                  }
                }}
                exit={{ 
                  height: 0, 
                  opacity: 0,
                  x: -10,
                  transition: {
                    height: { duration: 0.3, ease: "easeInOut" },
                    opacity: { duration: 0.2 },
                    x: { duration: 0.2 }
                  }
                }}
              >
                <motion.div
                  initial={{ opacity: 1 }}
                  exit={{ 
                    opacity: 0,
                    x: -30,
                    transition: { duration: 0.2 }
                  }}
                  className="flex items-end gap-2  mb-4"
                >
                  <motion.div 
                    className="flex-1"
                    initial={{ x: -10, opacity: 0 }}
                    animate={{ 
                      x: 0, 
                      opacity: 1,
                      transition: { delay: 0.1, duration: 0.2 }
                    }}
                  >
                    <Controller
                      name={`languages.${index}.name`}
                      control={control}
                      render={({ field: selectField }) => (
                        <Select 
                          {...selectField}
                          onValueChange={selectField.onChange}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select language" />
                          </SelectTrigger>
                          <SelectContent>
                            {languageOptions.map((lang) => (
                              <SelectItem key={lang} value={lang}>{lang}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    />
                    {errors?.languages?.[index]?.name && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.languages[index].name.message}
                      </p>
                    )}
                  </motion.div>

                  <motion.div 
                    className="flex-1"
                    initial={{ x: -10, opacity: 0 }}
                    animate={{ 
                      x: 0, 
                      opacity: 1,
                      transition: { delay: 0.2, duration: 0.2 }
                    }}
                  >
                    <Controller
                      name={`languages.${index}.proficiency`}
                      control={control}
                      render={({ field: selectField }) => (
                        <Select 
                          {...selectField}
                          onValueChange={selectField.onChange}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select proficiency" />
                          </SelectTrigger>
                          <SelectContent>
                            {proficiencyOptions.map((level) => (
                              <SelectItem key={level} value={level}>{level}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    />
                    {errors?.languages?.[index]?.proficiency && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.languages[index].proficiency.message}
                      </p>
                    )}
                  </motion.div>

                  <motion.div 
                    className="ml-2 mb-0.5 flex-shrink-0"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ 
                      scale: 1, 
                      opacity: 1,
                      transition: { delay: 0.3, duration: 0.2, type: "spring", stiffness: 500 }
                    }}
                    whileHover={{ 
                      scale: 1.1,
                      transition: { duration: 0.1 }
                    }}
                  >
                    <Button 
                      type="button" 
                      variant="destructive" 
                      size="icon" 
                      className="w-8 h-8"
                      onClick={() => remove(index)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </motion.div>
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="flex justify-between items-center gap-2 mt-4">
          <motion.div className="w-full"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
          >
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => append({ name: "", proficiency: "" })}
              className="flex items-center gap-2 w-full"
            >
              <Plus className="w-4 h-4" />
              Add Language
            </Button>
          </motion.div>

          <motion.div className="w-full"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
          >
            <Button 
              type="submit" 
              className="px-8 w-full"
            >
              Submit
            </Button>
          </motion.div>
        </div>
      </form>
    </div>
  );
}