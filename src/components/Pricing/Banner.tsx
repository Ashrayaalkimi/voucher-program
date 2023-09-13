import Image from "next/image";
import React, { useState } from "react";
import Copy from "../../../public/copyicon.svg";

type Props = {};

const Banner = (props: Props) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    const textToCopy = "ALERT10";
    navigator.clipboard.writeText(textToCopy).then(() => {
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    });
  };

  return (
    <div className="w-full bg-[#1a1a1a] h-8 flex justify-center items-center gap-4">
      <p className="text-[#ababab] text-sm font-normal">
        🤑 <span className="text-[#fff] font-semibold">Save 10%</span> of your
        order of any alert package with the code:{" "}
      </p>
      <div
        className={`flex gap-1 bg-[#2d2d2d] px-2 rounded-[4px] cursor-pointer transition transform duration-500 hover:scale-110 ${
          copied ? "bg-green-800" : ""
        }`}
        onClick={copyToClipboard}
      >
        <h4 className="text-sm font-medium">
          {copied ? (
            "Copied!"
          ) : (
            <div className="flex gap-1">
              <p>ALERT10</p>
              <Image src={Copy} alt="Copy icon" />
            </div>
          )}
        </h4>
      </div>
    </div>
  );
};

export default Banner;
