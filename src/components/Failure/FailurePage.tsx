import Image from "next/image";
import React from "react";
import Cross from "../../../public/cross.svg";
import Link from "next/link";
type Props = {};

const FailurePage = (props: Props) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-[#0c0303] bg-opacity-50 m-4 lg:m-0">
      <div className="bg-[#131313] flex justify-center items-center gap-5 flex-wrap p-4 lg:p-12 flex-col text-center  text-white rounded-3xl lg:w-[516px]">
        <Image src={Cross} alt="Cross" />
        <h2 className="text-[32px] leading-normal font-semibold">
          Please try again
        </h2>
        <p className="text-[#b8b8b8] font-normal leading-6 text-sm text-center lg:w-72">
          Something went wrong! Try again after sometime.
        </p>
        <Link href="/">
          <button className="text-black block self-stretch cursor-pointer text-sm lg:text-base font-medium py-3 px-16 lg:px-32 bg-white rounded-xl">
            Back to Home
          </button>
        </Link>
      </div>
    </div>
  );
};

export default FailurePage;
