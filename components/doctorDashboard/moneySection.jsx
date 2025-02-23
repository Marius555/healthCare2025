import React from "react";
import { Euro } from "lucide-react";
import { Wallet } from "lucide-react";
import { MoneyChart } from "./moneyChart";
import { UserChart } from "./userChart";

const MoneySection = ({ type, ...props }) => {
  return (
    <div className={props.className}>
      <div className="p-3 flex items-end justify-end gap-3">
        <p className="text-xl font-bold">Sales</p>
      </div>
      <div className="flex items-center gap-2 ml-3 mb-3 ">
        <Euro />
        <p className="text-2xl font-bold">10000</p>
      </div>
      <div className="w-full">
        <MoneyChart />
      </div>
    </div>
  );
};

export default MoneySection;
