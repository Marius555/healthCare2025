"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import Image from "next/image";

export default function DoctorView({ doctorList }) {
  console.log(doctorList);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("all");

  // Expanded list of specialties
  const specialties = [
    "all",
    "Burnos higienistas",
    "Cardiology",
    "Neurology",
    "Pediatrics",
    "Orthopedics",
    "Dermatology",
    "Oncology",
    "Gastroenterology",
    "Psychiatry",
    "Ophthalmology",
    "Endocrinology",
    "Rheumatology",
    "Urology",
    "Pulmonology",
    "Nephrology",
    "Allergy & Immunology",
    "Hematology",
    "Family Medicine",
    "Internal Medicine",
    "General Surgery",
    "Endobiogenikas", // Added new specialty from your data
  ];

  const doctors = doctorList.data.documents;

  // Filter doctors based on both search term and selected specialty
  const filteredDoctors = doctors.filter((doctor) => {
    // Get doctor name from userId object if available
    const doctorName = doctor.userId
      ? `${doctor.userId.name || ""} ${doctor.userId.lastname || ""}`.trim()
      : "";

    // Get specialization from Education array if available
    const education =
      doctor.Education && doctor.Education.length > 0
        ? doctor.Education[0]
        : null;
    const doctorSpecialty = education?.specialization || "";

    const matchesSearch =
      doctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctorSpecialty.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesSpecialty =
      selectedSpecialty === "all" || doctorSpecialty === selectedSpecialty;

    return matchesSearch && matchesSpecialty;
  });

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Find a Doctor</h1>
          <p className="text-muted-foreground mt-2">
            Browse our network of qualified healthcare professionals
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 flex-row">
          <div className="w-1/2 lg:w-3/5">
            <Input
              placeholder="Search by name or specialty..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
          </div>
          <div>
            <Select
              value={selectedSpecialty}
              onValueChange={setSelectedSpecialty}
            >
              <SelectTrigger className="border-dashed h-9 px-3 ml-1 w-auto">
                <SelectValue placeholder="More..." />
              </SelectTrigger>
              <SelectContent>
                <ScrollArea className="h-72">
                  <SelectItem value="all">All Specialties</SelectItem>
                  {specialties.slice(1).map((specialty) => (
                    <SelectItem key={specialty} value={specialty}>
                      {specialty}
                    </SelectItem>
                  ))}
                </ScrollArea>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {[
            "All",
            "Burnos higienistas",
            "Cardiology",
            "Neurology",
            "Pediatrics",
            "Orthopedics",
            "Endobiogenikas",
          ].map((specialty) => (
            <Badge
              key={specialty}
              variant={
                selectedSpecialty === (specialty === "All" ? "all" : specialty)
                  ? "default"
                  : "outline"
              }
              className="cursor-pointer text-sm py-1 px-3"
              onClick={() =>
                setSelectedSpecialty(specialty === "All" ? "all" : specialty)
              }
            >
              {specialty}
            </Badge>
          ))}

          <Select
            value={selectedSpecialty}
            onValueChange={setSelectedSpecialty}
          >
            <SelectTrigger className="border-dashed h-7 px-3 ml-1 w-auto">
              <SelectValue placeholder="More..." />
            </SelectTrigger>
            <SelectContent>
              <ScrollArea className="h-72">
                <SelectItem value="all">All Specialties</SelectItem>
                {specialties.slice(1).map((specialty) => (
                  <SelectItem key={specialty} value={specialty}>
                    {specialty}
                  </SelectItem>
                ))}
              </ScrollArea>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDoctors.map((doctor) => (
            <DoctorCard key={doctor.$id} doctor={doctor} />
          ))}
        </div>

        {filteredDoctors.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium">No doctors found</h3>
            <p className="text-muted-foreground mt-1">
              Try adjusting your search criteria
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function DoctorCard({ doctor }) {
  const picture = doctor.pictureName[0];
  // Extract name from userId object if available
  const doctorName = doctor
    ? `${doctor.name || ""} ${doctor.lastname || ""}`.trim()
    : "Unknown Doctor";

  // Get doctor image if available
  const imageUrl = `https://cloud.appwrite.io/v1/storage/buckets/67a5286700233cd15f95/files/${picture}/preview?project=6791f8bb0019d5f7763d&width=100&height=100&quality=80`;


  // Get doctor initials for avatar fallback
  const initials = doctorName
    .split(" ")
    .map((n) => n[0])
    .join("");

  // Get education information
  const education =
    doctor.Education && doctor.Education.length > 0
      ? doctor.Education[0]
      : null;

  return (
    <Card className="h-full flex flex-col overflow-hidden hover:shadow-md transition-shadow">
      <CardHeader className="flex flex-row items-center gap-4 pb-2">
          <Image
            className="rounded-full"
            src={imageUrl}
            width={100} // Set fixed width
            height={100} // Set fixed height
            objectFit="cover"
            alt="Profile Picture"
          />

        <div>
          <CardTitle className="text-xl">{doctorName}</CardTitle>
          <CardDescription className="flex items-center mt-1">
            <Badge variant="secondary" className="mr-2">
              {education?.specialization || "General"}
            </Badge>
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent className="flex-grow">
        <div className="space-y-3">
          {/* Using degree and university info from Education */}
          <p className="text-sm text-muted-foreground line-clamp-3">
            {education?.degree} at {education?.university}
          </p>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>
              <p className="font-medium">License</p>
              <p className="text-muted-foreground">
                {education?.licenseNumber}
              </p>
            </div>
            <div>
              <p className="font-medium">Education</p>
              <p className="text-muted-foreground">
                {education?.studiesBegin} - {education?.studiesEnd}
              </p>
            </div>
          </div>
        </div>
      </CardContent>

      {/* Contact information not available in provided data */}
      {doctor.userId?.phoneNumber && (
        <CardFooter className="border-t bg-muted/50 pt-4 pb-4">
          <Button className="w-full">
            Contact: {doctor.userId.phoneNumber}
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
