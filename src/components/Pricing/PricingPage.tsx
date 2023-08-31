import React from "react";
import PlanCard from "./PlanCard";

type Props = {};

const PricingPage = (props: Props) => {
  return (
    <div className="flex flex-col items-center gap-10 lg:gap-20 py-16 xl:justify-center">
      <div className="flex flex-col items-center gap-3 ">
        <h1 className="text-5xl font-bold leading-[52px]">Vouchers</h1>
        <p className="text-[#CACACA] text-sm font-light leading-6 text-center mx-3 lg:px-40 xl:px-72 2xl:px-[490px]">
          Simplify your trading strategy with our intuitive screening tool.
          Whether you&apos;re a seasoned pro or just starting out, our tool
          makes it easy to screen for patterns, technicals, and more.
        </p>
      </div>
      <div>
        <PlanCard />
      </div>
    </div>
  );
};

export default PricingPage;
