import Image from "next/image";
import React from "react";
import Cross from "../../../public/cross.svg";
import Link from "next/link";
type Props = {};

const FailurePage = (props: Props) => {
  return (
    <>
      <div className="flex flex-col gap-4 items-center justify-center bg-[#131313] rounded-3xl p-4 m-12 py-8 lg:mx-[470px] 2xl:mx-[590px]">
        <Image src={Cross} alt="Cross" />
        <h2 className="text-[32px] leading-normal font-semibold">
          Please try again
        </h2>
        <p className="text-[#b8b8b8] font-normal leading-6 text-sm text-center lg:w-72">
          error message
        </p>
        <Link href="/payment">
          <button className="text-black block self-stretch cursor-pointer text-sm lg:text-base font-medium py-3 px-16 lg:px-32 bg-white rounded-xl">
            Back to payment
          </button>
        </Link>
      </div>
    </>
  );
};

export default FailurePage;
