import React, { useState } from "react";
import Image from "next/image";
import Tag from "../../../public/tag.svg";
import Logo from "../../../public/Leopard icon.svg";

const AffiliatePopup = () => {
  const [isVisible, setIsVisible] = useState(true);
  const handleCloseButton = () => {
    setIsVisible(false);
    console.log("close button clicked")
  };
  return (
    <>
      {isVisible && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-[#242424] bg-opacity-50 m-4 lg:m-0">
          <div className="bg-[#131313] flex justify-center items-center gap-5 flex-wrap p-4 lg:p-12 flex-col text-center  text-white rounded-3xl lg:w-[516px]">
            <Image src={Logo} alt="Tag" className=" w-18 h-18" />
            <h2 className="text-4xl lg:text-5xl font-bold leading-[52px]">
              Do you have affiliate code?
            </h2>
            <div className="relative flex w-full">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Image src={Tag} alt="Tag" className=" w-4 h-4" />
              </div>
              <input
                type="text"
                placeholder="Enter the discount code"
                // value={couponCode}
                // onChange={(e) => setCouponCode(e.target.value)}
                className="flex w-full p-3 pl-10 border-none bg-[#242424] outline-none text-[#ABABAB] text-sm font-light rounded-lg "
              ></input>
            </div>
            <button className="text-black w-full text-base font-medium py-3 px-16 lg:px-16 bg-white rounded-xl">
              Proceed
            </button>
            <button
              onClick={handleCloseButton}
              className="text-white w-full text-base font-medium py-3 px-16 lg:px-16 bg-[#131313] border rounded-xl"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default AffiliatePopup;
