import Image from "next/image";
import React from "react";
import Copy from "../../../public/copyicon.svg";

type Props = {};

const Banner = (props: Props) => {
  return (
    <div className="w-full bg-[#1a1a1a] h-8 flex justify-center items-center gap-4">
      <p className="text-[#ababab] text-sm font-normal">
      🤑 <span className="text-[#fff] font-semibold">Save 10%</span> of your
        order of any alert package with the code:{" "}
      </p>
      <div className="flex gap-1 bg-[#2d2d2d] px-2 rounded-[4px] cursor-pointer transition transform duration-500 hover:scale-110">
        <h4>ALERT10</h4>
        <Image src={Copy} alt="Copy icon" />
      </div>
    </div>
  );
};

export default Banner;
