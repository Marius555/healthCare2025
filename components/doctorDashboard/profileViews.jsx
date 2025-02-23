import React from "react";
import { Euro } from "lucide-react";
import { ProfileViewChart } from "./ProifleViewChart";
import { Eye } from "lucide-react";
const ProfileViews = ({ type, ...props }) => {
  return (
    <div className={props.className}>
      <div className="p-3 flex items-end justify-end gap-3">
        <p className="text-xl font-bold">Profile Views</p>
      </div>
      <div className="flex items-center gap-2 ml-3 mb-3 ">
        <Eye />
        <p className="text-2xl font-bold">34</p>
      </div>
      <div className="overflow-hidden">
        <ProfileViewChart />
      </div>
    </div>
  );
};

export default ProfileViews;
