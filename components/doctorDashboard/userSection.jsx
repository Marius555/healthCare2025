import React from "react";
import { Euro } from "lucide-react";
import { UserChart } from "./userChart";
import { UserRoundCheck } from "lucide-react";
import { User } from "lucide-react";

const UserSection = ({ ...props }) => {
  return (
    <div className={props.className}>
      <div className="p-3 flex items-end justify-end gap-3">
        <p className="text-xl font-bold">New Patients</p>
       </div>
      <div className="flex items-center gap-2 ml-3 mb-3 ">
        <User />
        <p className="text-2xl font-bold">4</p>
      </div>
      <div className="w-full">
        <UserChart />
      </div>
    </div>
  );
};

export default UserSection;