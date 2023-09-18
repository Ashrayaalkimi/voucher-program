import Image from "next/image";
import React, { useState } from "react";
import Copy from "../../../public/copyicon.svg";

type Props = {};

const Banner = (props: Props) => {
  const [copied, setCopied] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const copyToClipboard = () => {
    const textToCopy = "ALERT10";
    navigator.clipboard.writeText(textToCopy).then(() => {
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    });
  };
  const handleCloseBanner = () => {
    setIsVisible(false);
  };
  return (
    <>
      {isVisible && (
        <div className="flex bg-[#1a1a1a] ">
          <div className="lg:w-full py-2 lg:py-0 bg-[#1a1a1a] lg:h-8 flex flex-col lg:flex-row justify-center items-center gap-1 lg:gap-4">
            <p className="text-[#ababab] text-center lg:text-start text-sm px-12 lg:px-0 font-normal">
              🤑 <span className="text-[#fff] font-semibold">Save 10%</span> of
              your order of any alert package with the code:{" "}
            </p>
            <div
              className={`flex items-center gap-1 bg-[#2d2d2d] px-2 rounded-[4px] cursor-pointer transition transform duration-500 hover:scale-110 ${
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
          <button
            className="text-[#fff] cursor-pointer pr-8"
            onClick={handleCloseBanner}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-4 h-4 bg-black rounded-full"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      )}
    </>
  );
};

export default Banner;
