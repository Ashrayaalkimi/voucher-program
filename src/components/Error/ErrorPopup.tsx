'use client'
// import Image from "next/image";
import React, { useState } from "react";
// import Tooltip from "../../../public/tooltip.svg";
type Props = {};

const ErrorPopup = (props: Props) => {
  const [isVisible, setIsVisible] = useState(true);
  const handleCloseButton = () => {
    setIsVisible(false);
  };
  return (
    <>
      {isVisible && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-[#242424] bg-opacity-50 m-4 lg:m-0">
          <div className="bg-[#131313] flex justify-center items-center gap-5 flex-wrap p-4 lg:p-12 flex-col text-center  text-white rounded-3xl lg:w-[516px]">
            {/* <Image src={Tooltip} alt="Tag" className=" w-18 h-18" /> */}
            <h2 className="text-4xl lg:text-5xl font-bold leading-[52px]">
              {/* {errorMessage} */}
            </h2>

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

export default ErrorPopup;
