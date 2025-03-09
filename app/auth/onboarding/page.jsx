import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const page = () => {
  
  return (
    <div className="flex flex-col items-center justify-center gap-4 h-screen ">
      <div className="flex flex-col items-center justify-center max-w-sm gap-3 xs: m-11">
        <h1 className="font-bold text-2xl">Welcome to Your Profile Setup</h1>
        <p>Please select your user type</p>
        <Image
          priority={true}
          src="/onboarding/onboarding.png"
          objectFit="cover"
          alt="image"
          width={400}
          height={400}
        />
        <Button className=" w-full font-bold" asChild>
          <Link href="/auth/onboarding/doctor">Doctor</Link>
        </Button>
        <Button className=" w-full font-bold">Patient</Button>
        <Button className="w-full font-bold">
          Company
        </Button>
      </div>
    </div>
  );
};

export default page;
