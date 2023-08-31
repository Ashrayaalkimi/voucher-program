import Link from "next/link";
import React from "react";

type Props = {};

const PlanCard = (props: Props) => {
  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:gap-12 cursor-pointer">
      <div className="group flex flex-col items-center p-7 lg:px-16 gap-6 bg-[#242424] rounded-3xl shadow-md transform transition duration-500 hover:scale-110">

        <div className="bg-[#313131] rounded-[10px] group group-hover:bg-gradient-to-r group-hover:from-[#FADD62] group-hover:to-[#ff7337]">
          <button className="py-1 px-4 bg-gradient-to-r font-medium from-[#FADD62] to-[#FF7337] text-transparent bg-clip-text group-hover:text-black">
            20 alerts
          </button>
        </div>

        <h1 className="text-4xl font-semibold">£24.99/mo</h1>
        <ul className="my-2 flex flex-col gap-3 text-center text-[#cacaca]">
          <li>1 GB Bandwidth</li>
          <li>Subdomain</li>
          <li>1000 Users</li>
          <li>Marketing Plan</li>
        </ul>
        <Link href="/billing">
          <button className="text-black text-base font-medium py-3 px-16 lg:px-8 bg-white rounded-xl">
            Proceed to payment
          </button>
        </Link>
      </div>

      {/* Second Card */}
      <div className="group flex flex-col items-center p-7 lg:px-16 gap-6 bg-[#242424] rounded-3xl shadow-md transform transition duration-500 hover:scale-110">
        <div className="bg-[#313131] rounded-[10px] group group-hover:bg-gradient-to-r group-hover:from-[#FADD62] group-hover:to-[#ff7337]">
          <button className="py-1 px-4 bg-gradient-to-r font-medium from-[#FADD62] to-[#FF7337] text-transparent bg-clip-text group-hover:text-black">
            100 alerts
          </button>
        </div>

        <h1 className="text-4xl font-semibold">£125.99/mo</h1>
        <ul className="my-2 flex flex-col gap-3 text-center text-[#cacaca]">
          <li>1 GB Bandwidth</li>
          <li>Subdomain</li>
          <li>1000 Users</li>
          <li>Marketing Plan</li>
        </ul>
        <Link href="/billing">
          <button className="text-black text-base font-medium py-3 px-16 lg:px-8 bg-white rounded-xl">
            Proceed to payment
          </button>
        </Link>
      </div>

      {/* Third Card */}
      <div className="group flex flex-col items-center p-7 lg:px-16 gap-6 bg-[#242424] rounded-3xl shadow-md transform transition duration-500 hover:scale-110">
        <div className="bg-[#313131] rounded-[10px] group group-hover:bg-gradient-to-r group-hover:from-[#FADD62] group-hover:to-[#ff7337]">
          <button className="py-1 px-4 bg-gradient-to-r font-medium from-[#FADD62] to-[#FF7337] text-transparent bg-clip-text group-hover:text-black">
            1000 alerts
          </button>
        </div>

        <h1 className="text-4xl font-semibold">£1249.99/mo</h1>
        <ul className="my-2 flex flex-col gap-3 text-center text-[#cacaca]">
          <li>1 GB Bandwidth</li>
          <li>Subdomain</li>
          <li>1000 Users</li>
          <li>Marketing Plan</li>
        </ul>
        <Link href="/billing">
          <button className="text-black text-base font-medium py-3 px-16 lg:px-8 bg-white rounded-xl">
            Proceed to payment
          </button>
        </Link>
      </div>
    </div>
  );
};

export default PlanCard;
