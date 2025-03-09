// app/doctors/page.tsx
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

export default function DoctorsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("all");

  // Expanded list of specialties
  const specialties = [
    "all",
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
  ];

  // Sample doctor data with more specialties
  const doctors = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      specialty: "Cardiology",
      experience: "15 years",
      rating: 4.9,
      availability: "Mon, Wed, Fri",
      image: "/api/placeholder/150/150",
      bio: "Dr. Johnson is a board-certified cardiologist with expertise in preventive cardiology and heart disease management.",
      education: "Harvard Medical School",
      contact: {
        email: "sarah.johnson@example.com",
        phone: "(555) 123-4567",
      },
    },
    {
      id: 2,
      name: "Dr. Michael Chen",
      specialty: "Neurology",
      experience: "12 years",
      rating: 4.8,
      availability: "Tue, Thu",
      image: "/api/placeholder/150/150",
      bio: "Dr. Chen specializes in neurological disorders and has pioneered several treatment approaches for migraines.",
      education: "Johns Hopkins University",
      contact: {
        email: "michael.chen@example.com",
        phone: "(555) 234-5678",
      },
    },
    {
      id: 3,
      name: "Dr. Olivia Martinez",
      specialty: "Pediatrics",
      experience: "10 years",
      rating: 4.7,
      availability: "Mon-Fri",
      image: "/api/placeholder/150/150",
      bio: "Dr. Martinez is passionate about childrens health and specializes in developmental pediatrics.",
      education: "Stanford University School of Medicine",
      contact: {
        email: "olivia.martinez@example.com",
        phone: "(555) 345-6789",
      },
    },
    {
      id: 4,
      name: "Dr. James Wilson",
      specialty: "Orthopedics",
      experience: "20 years",
      rating: 4.9,
      availability: "Wed, Thu, Fri",
      image: "/api/placeholder/150/150",
      bio: "Dr. Wilson is an orthopedic surgeon specializing in sports medicine and joint replacement procedures.",
      education: "Yale School of Medicine",
      contact: {
        email: "james.wilson@example.com",
        phone: "(555) 456-7890",
      },
    },
    {
      id: 5,
      name: "Dr. Emily Taylor",
      specialty: "Dermatology",
      experience: "8 years",
      rating: 4.6,
      availability: "Mon, Wed, Fri",
      image: "/api/placeholder/150/150",
      bio: "Dr. Taylor focuses on both medical and cosmetic dermatology, with special interest in skin cancer prevention.",
      education: "University of Pennsylvania",
      contact: {
        email: "emily.taylor@example.com",
        phone: "(555) 567-8901",
      },
    },
    {
      id: 6,
      name: "Dr. Robert Kim",
      specialty: "Gastroenterology",
      experience: "14 years",
      rating: 4.8,
      availability: "Tue, Thu, Fri",
      image: "/api/placeholder/150/150",
      bio: "Dr. Kim specializes in digestive health and has extensive experience in treating complex gastrointestinal disorders.",
      education: "Columbia University",
      contact: {
        email: "robert.kim@example.com",
        phone: "(555) 678-9012",
      },
    },
  ];

  // Filter doctors based on both search term and selected specialty
  const filteredDoctors = doctors.filter((doctor) => {
    const matchesSearch =
      doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesSpecialty =
      selectedSpecialty === "all" || doctor.specialty === selectedSpecialty;

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
            "Cardiology",
            "Neurology",
            "Pediatrics",
            "Orthopedics",
            "Dermatology",
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
            <DoctorCard key={doctor.id} doctor={doctor} />
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
  return (
    <Card className="h-full flex flex-col overflow-hidden hover:shadow-md transition-shadow">
      <CardHeader className="flex flex-row items-center gap-4 pb-2">
        <Avatar className="h-16 w-16">
          <AvatarImage src={doctor.image} alt={doctor.name} />
          <AvatarFallback>
            {doctor.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
        <div>
          <CardTitle className="text-xl">{doctor.name}</CardTitle>
          <CardDescription className="flex items-center mt-1">
            <Badge variant="secondary" className="mr-2">
              {doctor.specialty}
            </Badge>
            <span className="flex items-center text-amber-500">
              ★ {doctor.rating}
            </span>
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent className="flex-grow">
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground line-clamp-3">
            {doctor.bio}
          </p>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>
              <p className="font-medium">Experience</p>
              <p className="text-muted-foreground">{doctor.experience}</p>
            </div>
            <div>
              <p className="font-medium">Education</p>
              <p className="text-muted-foreground">{doctor.education}</p>
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="border-t bg-muted/50 pt-4 pb-4">
        <ContactDialog doctor={doctor} />
      </CardFooter>
    </Card>
  );
}

function ContactDialog({ doctor }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full">Contact</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Contact {doctor.name}</DialogTitle>
          <DialogDescription>
            Reach out to schedule an appointment or ask questions.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <h4 className="font-medium">Email</h4>
            <p className="text-sm">{doctor.contact.email}</p>
          </div>
          <div className="space-y-2">
            <h4 className="font-medium">Phone</h4>
            <p className="text-sm">{doctor.contact.phone}</p>
          </div>
          <div className="space-y-2">
            <h4 className="font-medium">Availability</h4>
            <p className="text-sm">{doctor.availability}</p>
          </div>
        </div>
        <DialogFooter>
          <Button type="button" variant="secondary" className="mr-2">
            Send Message
          </Button>
          <Button type="button">Schedule Appointment</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
