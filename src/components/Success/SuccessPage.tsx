import Image from "next/image";
import React from "react";
import Tick from "../../../public/tick.svg";
import Copy from "../../../public/copyicon.svg";
import QR from "../../../public/qrcode.svg";
import Link from "next/link";
type Props = {};

const SuccessPage = (props: Props) => {
  return (
    <>
      <div className="flex flex-col lg:flex-row gap-4 lg:gap-0 items-center justify-center bg-[#131313] rounded-3xl lg:mt-40 p-6 lg:mx-auto lg:w-[700px] 2xl:w-[700px] ">
        {/* m-12 lg:mt-40 p-6 lg:mx-auto lg:w-[700px] 2xl:w-[700px] */}
        <div className="flex flex-col gap-3 justify-center items-center">
          <Image src={Tick} alt="Success-tick" />
          <h2 className="text-[32px] leading-normal font-semibold">Success</h2>
          <p className="text-[#b8b8b8] font-normal leading-6 text-sm text-center lg:w-[360px]">
            URN: <span className="text-white">1234567890</span>.We have also
            sent the voucher code to your email
            <span className="text-white font-light"> name@gmail.com</span>
          </p>
          <div className="flex gap-2">
            <h4>Code:</h4>
            <div className="flex gap-1 bg-[#2d2d2d] px-2 rounded-[4px] cursor-pointer transition transform duration-500 hover:scale-110">
              <h4>345677654567890</h4>
              <Image src={Copy} alt="Copy icon" />
            </div>
          </div>
        </div>

        <div className="h-0.5 lg:hidden w-full bg-[#434343]"></div>
        <div className="h-72 hidden lg:flex w-0.5 bg-[#434343]"></div>
        <div className="flex flex-col gap-3 items-center">
          <Image src={QR} alt="Success-tick" />
          <p className="text-[#b8b8b8] font-normal leading-6 text-sm text-center lg:w-72">
            Please download app.leopard.ai to complete sign up and use voucher!
          </p>
        </div>
      </div>
      {/* Back to Home Button */}
      <Link href="/">
        <button className="fixed right-4 bottom-4 bg-[#131313] text-white py-2 px-4 rounded-full text-sm hover:bg-white hover:text-black">
          Back to Home
        </button>
      </Link>
    </>
  );
};

export default SuccessPage;
